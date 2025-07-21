"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Plus, Hash, Users, Lock, MessageSquare, Crown } from "lucide-react"
import Link from "next/link"

type Channel = {
  id: string
  name: string
  description: string
  memberCount: number
  isPrivate: boolean
  lastActivity: string
  unreadCount?: number
  canUpgrade?: boolean
  owner: {
    name: string
    id: string
  }
}

export default function ChannelsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newChannel, setNewChannel] = useState({
    name: "",
    description: "",
    isPrivate: false,
  })

  const channels: Channel[] = [
    {
      id: "1",
      name: "study-buddies",
      description: "Daily Quran study and discussion",
      memberCount: 12,
      isPrivate: false,
      lastActivity: "2 minutes ago",
      unreadCount: 3,
      canUpgrade: true,
      owner: { name: "Ahmed", id: "1" },
    },
    {
      id: "2",
      name: "tajweed-practice",
      description: "Improving our Quran recitation together",
      memberCount: 8,
      isPrivate: true,
      lastActivity: "1 hour ago",
      unreadCount: 1,
      canUpgrade: false,
      owner: { name: "Fatima", id: "2" },
    },
    {
      id: "3",
      name: "youth-circle",
      description: "Muslim youth connecting and supporting each other",
      memberCount: 25,
      isPrivate: false,
      lastActivity: "30 minutes ago",
      canUpgrade: true,
      owner: { name: "Omar", id: "3" },
    },
  ]

  const filteredChannels = channels.filter(
    (channel) =>
      channel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      channel.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleCreateChannel = () => {
    // In a real app, this would make an API call
    console.log("Creating channel:", newChannel)
    setIsCreateDialogOpen(false)
    setNewChannel({ name: "", description: "", isPrivate: false })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Channels</h1>
          <p className="text-muted-foreground">Connect with friends and create communities</p>
        </div>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Channel
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Channel</DialogTitle>
              <DialogDescription>
                Start a new channel to connect with friends and discuss topics you care about.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="channel-name">Channel Name</Label>
                <Input
                  id="channel-name"
                  placeholder="e.g., study-group"
                  value={newChannel.name}
                  onChange={(e) => setNewChannel((prev) => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="channel-description">Description</Label>
                <Textarea
                  id="channel-description"
                  placeholder="What's this channel about?"
                  value={newChannel.description}
                  onChange={(e) => setNewChannel((prev) => ({ ...prev, description: e.target.value }))}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="private-channel"
                  checked={newChannel.isPrivate}
                  onCheckedChange={(checked) => setNewChannel((prev) => ({ ...prev, isPrivate: checked }))}
                />
                <Label htmlFor="private-channel">Private Channel</Label>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateChannel}>Create Channel</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-6">
        <Input
          placeholder="Search channels..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChannels.map((channel) => (
          <Card key={channel.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  {channel.isPrivate ? (
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <Hash className="h-5 w-5 text-muted-foreground" />
                  )}
                  <CardTitle className="text-lg">{channel.name}</CardTitle>
                </div>
                {channel.unreadCount && (
                  <Badge variant="destructive" className="text-xs">
                    {channel.unreadCount}
                  </Badge>
                )}
              </div>
              <CardDescription>{channel.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  {channel.memberCount} members
                </div>
                <span>{channel.lastActivity}</span>
              </div>

              <div className="flex items-center space-x-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-xs">{channel.owner.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-sm text-muted-foreground">Created by {channel.owner.name}</span>
                <Crown className="h-3 w-3 text-yellow-500" />
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent" asChild>
                  <Link href={`/channels/${channel.id}`}>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Join Chat
                  </Link>
                </Button>
                {channel.canUpgrade && (
                  <Button size="sm" variant="outline" className="bg-transparent" asChild>
                    <Link href={`/channels/${channel.id}/upgrade`}>Upgrade</Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredChannels.length === 0 && (
        <div className="text-center py-12">
          <Hash className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No channels found</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery ? "Try adjusting your search terms" : "Create your first channel to get started"}
          </p>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create Channel
          </Button>
        </div>
      )}
    </div>
  )
}
