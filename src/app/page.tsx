import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, BookOpen, Users, Heart } from "lucide-react"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between py-12 gap-8">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Stay consistent with your <span className="text-layl-700 dark:text-layl-300">Quran</span> reading
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Join a community of believers committed to regular Quran reading through group accountability, charitable
            giving, and mutual support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild>
              <Link href="/signup">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
        <div className="md:w-1/2">
          <Image
            src="/placeholder.svg?height=400&width=500"
            alt="Quran reading illustration"
            width={500}
            height={400}
            className="rounded-lg shadow-lg"
            priority
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center mb-12">How Layl Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <BookOpen className="h-12 w-12 text-layl-700 dark:text-layl-300 mb-4" />
              <CardTitle>Track Your Reading</CardTitle>
              <CardDescription>Set personal goals and track your daily Quran reading progress</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Create personalized reading plans based on pages, surahs, or time spent. Monitor your streaks and
                celebrate milestones.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-12 w-12 text-layl-700 dark:text-layl-300 mb-4" />
              <CardTitle>Group Accountability</CardTitle>
              <CardDescription>Join reading circles to stay motivated and accountable</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Create or join reading groups, communicate with fellow members, and support each other on your Quran
                reading journey.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Heart className="h-12 w-12 text-layl-700 dark:text-layl-300 mb-4" />
              <CardTitle>Charitable Giving</CardTitle>
              <CardDescription>Turn missed days into charitable donations</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Opt into donation pledges for missed reading days, with proceeds going to vetted Islamic charities of
                your group's choice.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-layl-50 dark:bg-layl-950/30 rounded-xl p-8 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to strengthen your connection with the Quran?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Join thousands of Muslims worldwide who are using Layl to build a consistent Quran reading habit.
        </p>
        <Button size="lg" asChild>
          <Link href="/signup">Join Layl Today</Link>
        </Button>
      </section>
    </div>
  )
}
