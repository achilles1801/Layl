"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Send } from "lucide-react"

type Message = {
  id: string
  sender: {
    id: string
    name: string
    image?: string
  }
  content: string
  timestamp: Date
}

export default function GroupChat({ groupId }: { groupId: string }) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: { id: "101", name: "Ahmed", image: undefined },
      content: "Assalamu alaikum everyone! How is your reading going today?",
      timestamp: new Date(Date.now() - 3600000 * 2), // 2 hours ago
    },
    {
      id: "2",
      sender: { id: "102", name: "Fatima", image: undefined },
      content: "Walaikum assalam! Alhamdulillah, I completed my daily goal.",
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    },
    {
      id: "3",
      sender: { id: "103", name: "Omar", image: undefined },
      content: "I'm a bit behind but planning to catch up after Maghrib prayer insha'Allah.",
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
    },
    {
      id: "4",
      sender: { id: "101", name: "Ahmed", image: undefined },
      content: "That's great! Remember our group meeting tomorrow at 8 PM.",
      timestamp: new Date(Date.now() - 900000), // 15 minutes ago
    },
  ])

  const handleSendMessage = () => {
    if (!message.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: { id: "current-user", name: "You", image: undefined },
      content: message,
      timestamp: new Date(),
    }

    setMessages([...messages, newMessage])
    setMessage("")
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <Card className="flex flex-col h-[600px]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender.id === "current-user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`flex ${msg.sender.id === "current-user" ? "flex-row-reverse" : "flex-row"} items-start gap-2 max-w-[80%]`}
            >
              {msg.sender.id !== "current-user" && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={msg.sender.image || "/placeholder.svg"} alt={msg.sender.name} />
                  <AvatarFallback>{msg.sender.name.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
              <div>
                <div
                  className={`flex items-center ${msg.sender.id === "current-user" ? "justify-end" : "justify-start"} mb-1`}
                >
                  <span className="text-xs text-muted-foreground mr-2">{formatTime(msg.timestamp)}</span>
                  <span className="text-sm font-medium">{msg.sender.name}</span>
                </div>
                <div
                  className={`rounded-lg py-2 px-3 ${
                    msg.sender.id === "current-user" ? "bg-emerald-600 text-white" : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSendMessage()
          }}
          className="flex gap-2"
        >
          <Input
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </Card>
  )
}
