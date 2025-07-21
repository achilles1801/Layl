"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Shield, Users, Heart, ArrowLeft, Check } from "lucide-react"
import Link from "next/link"

export default function UpgradeChannelPage({ params }: { params: { id: string } }) {
  const [paymentMethod, setPaymentMethod] = useState("")
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
  })
  const [selectedPlan, setSelectedPlan] = useState("basic")
  const router = useRouter()

  const plans = [
    {
      id: "basic",
      name: "Basic Group",
      price: 5,
      features: ["Up to 15 members", "Donation tracking", "Basic analytics", "Group challenges"],
    },
    {
      id: "premium",
      name: "Premium Group",
      price: 10,
      features: ["Up to 50 members", "Advanced analytics", "Custom challenges", "Priority support", "Video calls"],
    },
    {
      id: "unlimited",
      name: "Unlimited Group",
      price: 20,
      features: ["Unlimited members", "All premium features", "Custom branding", "API access", "Dedicated support"],
    },
  ]

  const selectedPlanDetails = plans.find((plan) => plan.id === selectedPlan)

  const handleUpgrade = () => {
    // In a real app, this would process the payment
    console.log("Processing payment for plan:", selectedPlan)
    console.log("Card details:", cardDetails)

    // Simulate successful payment
    router.push(`/channels/${params.id}?upgraded=true`)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link href={`/channels/${params.id}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Channel
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Upgrade to Paid Group</h1>
        <p className="text-muted-foreground">
          Transform your channel into a paid accountability group with enhanced features
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Plan Selection */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Choose Your Plan</CardTitle>
              <CardDescription>Select the plan that best fits your group's needs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedPlan === plan.id
                      ? "border-layl-600 bg-layl-50 dark:bg-layl-950/30"
                      : "border-border hover:border-layl-300"
                  }`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{plan.name}</h3>
                    <div className="flex items-center">
                      <span className="text-2xl font-bold">${plan.price}</span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                  </div>
                  <ul className="space-y-1">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <Check className="h-4 w-4 text-layl-600 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Benefits */}
          <Card>
            <CardHeader>
              <CardTitle>Why Upgrade?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <Users className="h-5 w-5 text-layl-600 mt-0.5" />
                <div>
                  <h4 className="font-medium">Enhanced Accountability</h4>
                  <p className="text-sm text-muted-foreground">
                    Paid groups create stronger commitment and better results
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Heart className="h-5 w-5 text-layl-600 mt-0.5" />
                <div>
                  <h4 className="font-medium">Charity Impact</h4>
                  <p className="text-sm text-muted-foreground">
                    Missed days contribute to meaningful charitable causes
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-layl-600 mt-0.5" />
                <div>
                  <h4 className="font-medium">Premium Features</h4>
                  <p className="text-sm text-muted-foreground">Access advanced analytics, challenges, and more</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment Details */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
              <CardDescription>Secure payment processing with Stripe</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="card-name">Cardholder Name</Label>
                <Input
                  id="card-name"
                  placeholder="John Doe"
                  value={cardDetails.name}
                  onChange={(e) => setCardDetails((prev) => ({ ...prev, name: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="card-number">Card Number</Label>
                <Input
                  id="card-number"
                  placeholder="1234 5678 9012 3456"
                  value={cardDetails.number}
                  onChange={(e) => setCardDetails((prev) => ({ ...prev, number: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="card-expiry">Expiry Date</Label>
                  <Input
                    id="card-expiry"
                    placeholder="MM/YY"
                    value={cardDetails.expiry}
                    onChange={(e) => setCardDetails((prev) => ({ ...prev, expiry: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="card-cvc">CVC</Label>
                  <Input
                    id="card-cvc"
                    placeholder="123"
                    value={cardDetails.cvc}
                    onChange={(e) => setCardDetails((prev) => ({ ...prev, cvc: e.target.value }))}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Plan: {selectedPlanDetails?.name}</span>
                  <span>${selectedPlanDetails?.price}/month</span>
                </div>
                <div className="flex justify-between">
                  <span>Processing Fee</span>
                  <span>$0.30</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${(selectedPlanDetails?.price || 0) + 0.3}/month</span>
                </div>
              </div>

              <Button onClick={handleUpgrade} className="w-full">
                <CreditCard className="mr-2 h-4 w-4" />
                Upgrade Channel
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                By upgrading, you agree to our Terms of Service and Privacy Policy. You can cancel anytime.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Security & Trust</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-green-600" />
                <span className="text-sm">SSL Encrypted</span>
              </div>
              <div className="flex items-center space-x-2">
                <CreditCard className="h-4 w-4 text-blue-600" />
                <span className="text-sm">Stripe Secure Processing</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="h-4 w-4 text-layl-600" />
                <span className="text-sm">Islamic Finance Compliant</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
