"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

type Member = {
  id: string
  name: string
  image?: string
  role: "admin" | "moderator" | "member"
  streak: number
  lastActive: string
}

export default function GroupMembers({ groupId }: { groupId: string }) {
  const [searchQuery, setSearchQuery] = useState("")

  const members: Member[] = [
    {
      id: "1",
      name: "Ahmed",
      role: "admin",
      streak: 30,
      lastActive: "Today",
    },
    {
      id: "2",
      name: "Fatima",
      role: "moderator",
      streak: 28,
      lastActive: "Today",
    },
    {
      id: "3",
      name: "Omar",
      role: "member",
      streak: 25,
      lastActive: "Today",
    },
    {
      id: "4",
      name: "Aisha",
      role: "member",
      streak: 15,
      lastActive: "Yesterday",
    },
    {
      id: "5",
      name: "Yusuf",
      role: "member",
      streak: 10,
      lastActive: "3 days ago",
    },
  ]

  const filteredMembers = members.filter((member) => member.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "admin":
        return "default"
      case "moderator":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search members..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button className="ml-2">Invite</Button>
        </div>

        <div className="space-y-4">
          {filteredMembers.map((member) => (
            <div key={member.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={member.image || "/placeholder.svg"} alt={member.name} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center">
                    <p className="font-medium mr-2">{member.name}</p>
                    <Badge variant={getRoleBadgeVariant(member.role)}>
                      {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                    </Badge>
                  </div>
                  <div className="flex text-sm text-muted-foreground">
                    <p className="mr-4">{member.streak} day streak</p>
                    <p>Last active: {member.lastActive}</p>
                  </div>
                </div>
              </div>

              <Button variant="ghost" size="sm">
                Message
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
