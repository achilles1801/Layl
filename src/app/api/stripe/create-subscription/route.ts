import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { adminAuth, adminDb } from "@/lib/firebase-admin"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-06-30.basil",
})

export async function POST(request: NextRequest) {
  try {
    const { channelId, planType, paymentMethodId } = await request.json()

    // Verify authentication
    const token = request.headers.get("Authorization")?.replace("Bearer ", "")
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decodedToken = await adminAuth.verifyIdToken(token)
    const userId = decodedToken.uid

    // Get user data
    const userDoc = await adminDb.collection("users").doc(userId).get()
    const userData = userDoc.data()

    if (!userData) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Create or get Stripe customer
    let customerId = userData.stripeCustomerId
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: userData.email,
        name: userData.name,
        metadata: {
          userId: userId,
        },
      })
      customerId = customer.id

      // Update user with Stripe customer ID
      await adminDb.collection("users").doc(userId).update({
        stripeCustomerId: customerId,
      })
    }

    // Attach payment method to customer
    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: customerId,
    })

    // Set as default payment method
    await stripe.customers.update(customerId, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    })

    // Get price based on plan type
    const priceMap = {
      basic: process.env.STRIPE_BASIC_PRICE_ID!,
      premium: process.env.STRIPE_PREMIUM_PRICE_ID!,
      unlimited: process.env.STRIPE_UNLIMITED_PRICE_ID!,
    }

    // Create subscription
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceMap[planType as keyof typeof priceMap] }],
      default_payment_method: paymentMethodId,
      metadata: {
        channelId: channelId,
        userId: userId,
      },
    })

    // Update channel to paid status
    await adminDb.collection("channels").doc(channelId).update({
      isPaid: true,
      planType: planType,
      subscriptionId: subscription.id,
    })

    // Create group document
    await adminDb
      .collection("groups")
      .doc(channelId)
      .set({
        channelId: channelId,
        planType: planType,
        monthlyFee: subscription.items.data[0].price.unit_amount! / 100,
        subscriptionId: subscription.id,
        createdAt: new Date(),
      })

    return NextResponse.json({
      subscriptionId: subscription.id,
      status: subscription.status,
    })
  } catch (error) {
    console.error("Subscription creation error:", error)
    return NextResponse.json({ error: "Failed to create subscription" }, { status: 500 })
  }
}
