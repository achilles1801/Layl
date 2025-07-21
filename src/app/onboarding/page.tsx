"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { BookOpen, ArrowRight, ArrowLeft } from "lucide-react"

type OnboardingData = {
  readingLevel: string
  dailyGoal: string
  preferredTime: string
  timezone: string
  translation: string
  privacy: {
    showStreak: boolean
    showProgress: boolean
    allowMessages: boolean
  }
  interests: string[]
  bio: string
}

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [data, setData] = useState<OnboardingData>({
    readingLevel: "",
    dailyGoal: "",
    preferredTime: "",
    timezone: "",
    translation: "",
    privacy: {
      showStreak: true,
      showProgress: true,
      allowMessages: true,
    },
    interests: [],
    bio: "",
  })
  const router = useRouter()

  const totalSteps = 4
  const progress = (step / totalSteps) * 100

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    } else {
      // Save onboarding data and redirect to dashboard
      localStorage.setItem("onboardingData", JSON.stringify(data))
      router.push("/dashboard")
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleInterestToggle = (interest: string) => {
    setData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }))
  }

  return (
    <div className="container mx-auto px-4 py-12 flex justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <BookOpen className="h-12 w-12 text-layl-700 dark:text-layl-300" />
          </div>
          <CardTitle className="text-2xl text-center">Welcome to Layl</CardTitle>
          <CardDescription className="text-center">Let's set up your Quran reading journey</CardDescription>
          <div className="mt-4">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-muted-foreground mt-2 text-center">
              Step {step} of {totalSteps}
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Reading Experience</h3>

              <div className="space-y-3">
                <Label>How would you describe your Quran reading experience?</Label>
                <RadioGroup
                  value={data.readingLevel}
                  onValueChange={(value) => setData((prev) => ({ ...prev, readingLevel: value }))}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="beginner" id="beginner" />
                    <Label htmlFor="beginner">Beginner - Just starting my journey</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="intermediate" id="intermediate" />
                    <Label htmlFor="intermediate">Intermediate - I read occasionally</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="advanced" id="advanced" />
                    <Label htmlFor="advanced">Advanced - I read regularly</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label>What's your daily reading goal?</Label>
                <RadioGroup
                  value={data.dailyGoal}
                  onValueChange={(value) => setData((prev) => ({ ...prev, dailyGoal: value }))}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1-page" id="1-page" />
                    <Label htmlFor="1-page">1 page per day</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="2-pages" id="2-pages" />
                    <Label htmlFor="2-pages">2 pages per day</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="5-pages" id="5-pages" />
                    <Label htmlFor="5-pages">5 pages per day</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="custom" id="custom" />
                    <Label htmlFor="custom">Custom goal</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Preferences</h3>

              <div className="space-y-3">
                <Label>When do you prefer to read?</Label>
                <Select
                  value={data.preferredTime}
                  onValueChange={(value) => setData((prev) => ({ ...prev, preferredTime: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your preferred time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fajr">After Fajr</SelectItem>
                    <SelectItem value="morning">Morning</SelectItem>
                    <SelectItem value="afternoon">Afternoon</SelectItem>
                    <SelectItem value="maghrib">After Maghrib</SelectItem>
                    <SelectItem value="isha">After Isha</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>Preferred Translation</Label>
                <Select
                  value={data.translation}
                  onValueChange={(value) => setData((prev) => ({ ...prev, translation: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select translation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sahih">Sahih International</SelectItem>
                    <SelectItem value="pickthall">Pickthall</SelectItem>
                    <SelectItem value="yusuf-ali">Yusuf Ali</SelectItem>
                    <SelectItem value="muhsin-khan">Muhsin Khan</SelectItem>
                    <SelectItem value="arabic-only">Arabic Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label htmlFor="timezone">Timezone</Label>
                <Input
                  id="timezone"
                  placeholder="e.g., America/New_York"
                  value={data.timezone}
                  onChange={(e) => setData((prev) => ({ ...prev, timezone: e.target.value }))}
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Privacy Settings</h3>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="showStreak"
                    checked={data.privacy.showStreak}
                    onCheckedChange={(checked) =>
                      setData((prev) => ({
                        ...prev,
                        privacy: { ...prev.privacy, showStreak: checked as boolean },
                      }))
                    }
                  />
                  <Label htmlFor="showStreak">Show my reading streak to others</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="showProgress"
                    checked={data.privacy.showProgress}
                    onCheckedChange={(checked) =>
                      setData((prev) => ({
                        ...prev,
                        privacy: { ...prev.privacy, showProgress: checked as boolean },
                      }))
                    }
                  />
                  <Label htmlFor="showProgress">Show my reading progress to others</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="allowMessages"
                    checked={data.privacy.allowMessages}
                    onCheckedChange={(checked) =>
                      setData((prev) => ({
                        ...prev,
                        privacy: { ...prev.privacy, allowMessages: checked as boolean },
                      }))
                    }
                  />
                  <Label htmlFor="allowMessages">Allow others to send me messages</Label>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Tell us about yourself</h3>

              <div className="space-y-3">
                <Label>What are you interested in? (Select all that apply)</Label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "Tajweed",
                    "Tafsir",
                    "Memorization",
                    "Arabic Learning",
                    "Islamic History",
                    "Hadith Studies",
                    "Community Service",
                    "Youth Programs",
                  ].map((interest) => (
                    <div key={interest} className="flex items-center space-x-2">
                      <Checkbox
                        id={interest}
                        checked={data.interests.includes(interest)}
                        onCheckedChange={() => handleInterestToggle(interest)}
                      />
                      <Label htmlFor={interest}>{interest}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="bio">Bio (Optional)</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell others a bit about yourself..."
                  value={data.bio}
                  onChange={(e) => setData((prev) => ({ ...prev, bio: e.target.value }))}
                  rows={3}
                />
              </div>
            </div>
          )}

          <div className="flex justify-between pt-6">
            <Button variant="outline" onClick={handleBack} disabled={step === 1} className="bg-transparent">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button onClick={handleNext}>
              {step === totalSteps ? "Complete Setup" : "Next"}
              {step < totalSteps && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
