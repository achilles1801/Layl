import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { adminDb } from "@/lib/firebase-admin"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-06-30.basil",
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get("stripe-signature")!

    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret)

    switch (event.type) {
      case "customer.subscription.deleted":
        const deletedSubscription = event.data.object as Stripe.Subscription

        // Update channel to free status
        const channelQuery = await adminDb
          .collection("channels")
          .where("subscriptionId", "==", deletedSubscription.id)
          .get()

        if (!channelQuery.empty) {
          const channelDoc = channelQuery.docs[0]
          await channelDoc.ref.update({
            isPaid: false,
            planType: null,
            subscriptionId: null,
          })

          // Delete group document
          await adminDb.collection("groups").doc(channelDoc.id).delete()
        }
        break

      case "invoice.payment_failed":
        const failedInvoice = event.data.object as Stripe.Invoice
        // Handle failed payment - maybe send notification to user
        console.log("Payment failed for subscription:", (failedInvoice as any).subscription)
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 400 })
  }
}
