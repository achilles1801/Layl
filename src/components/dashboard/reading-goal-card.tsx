"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2 } from "lucide-react"

export default function ReadingGoalCard() {
  const [isCompleted, setIsCompleted] = useState(false)
  const [progress, setProgress] = useState(60)

  const handleMarkComplete = () => {
    setProgress(100)
    setIsCompleted(true)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Reading Goal</CardTitle>
        <CardDescription>Track your daily progress</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Surah Al-Baqarah (Pages 8-12)</span>
          <span className="text-sm text-muted-foreground">{isCompleted ? "5/5" : "3/5"} pages</span>
        </div>
        <Progress value={progress} className="h-2" />

        <div className="pt-4 space-y-2">
          <div className="flex items-center">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 mr-2" />
            <span className="text-sm">Page 8</span>
          </div>
          <div className="flex items-center">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 mr-2" />
            <span className="text-sm">Page 9</span>
          </div>
          <div className="flex items-center">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 mr-2" />
            <span className="text-sm">Page 10</span>
          </div>
          <div className="flex items-center">
            <CheckCircle2
              className={`h-4 w-4 mr-2 ${isCompleted ? "text-emerald-600 dark:text-emerald-400" : "text-gray-300 dark:text-gray-600"}`}
            />
            <span className="text-sm">Page 11</span>
          </div>
          <div className="flex items-center">
            <CheckCircle2
              className={`h-4 w-4 mr-2 ${isCompleted ? "text-emerald-600 dark:text-emerald-400" : "text-gray-300 dark:text-gray-600"}`}
            />
            <span className="text-sm">Page 12</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleMarkComplete} disabled={isCompleted}>
          {isCompleted ? "Completed" : "Mark as Complete"}
        </Button>
      </CardFooter>
    </Card>
  )
}
