"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

export default function GroupActivityCard() {
  const members = [
    { id: 1, name: "Ahmed", progress: 100, image: null },
    { id: 2, name: "Fatima", progress: 80, image: null },
    { id: 3, name: "Omar", progress: 60, image: null },
    { id: 4, name: "Aisha", progress: 40, image: null },
    { id: 5, name: "Yusuf", progress: 20, image: null },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Group Activity</CardTitle>
        <CardDescription>Madinah Circle • Today's Progress</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {members.map((member) => (
          <div key={member.id} className="flex items-center space-x-4">
            <Avatar className="h-8 w-8">
              <AvatarImage src={member.image || undefined} alt={member.name} />
              <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <div className="flex justify-between">
                <p className="text-sm font-medium">{member.name}</p>
                <p className="text-sm text-muted-foreground">{member.progress}%</p>
              </div>
              <Progress value={member.progress} className="h-1" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
