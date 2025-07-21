import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Users, MessageSquare, Settings, Calendar, BookOpen } from "lucide-react"
import Link from "next/link"
import GroupChat from "@/components/groups/group-chat"
import GroupMembers from "@/components/groups/group-members"

export default function GroupPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the group data based on the ID
  const group = {
    id: params.id,
    name: "Madinah Circle",
    description: "A group focused on consistent daily reading",
    members: 5,
    progress: 85,
    isPrivate: false,
    createdAt: "2 months ago",
    nextMeeting: "Tomorrow, 8:00 PM",
    currentReading: "Surah Al-Baqarah (Pages 8-20)",
    donationPledge: "$1 per missed day",
    charity: "Islamic Relief",
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl font-bold">{group.name}</h1>
            {group.isPrivate && <Badge variant="outline">Private</Badge>}
          </div>
          <p className="text-muted-foreground">{group.description}</p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/groups/${group.id}/settings`}>
              <Settings className="mr-2 h-4 w-4" /> Settings
            </Link>
          </Button>
          <Button>
            <MessageSquare className="mr-2 h-4 w-4" /> Chat
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="members">Members</TabsTrigger>
              <TabsTrigger value="chat">Group Chat</TabsTrigger>
              <TabsTrigger value="donations">Donations</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Group Progress</CardTitle>
                  <CardDescription>Track your group's reading progress</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Overall Progress</span>
                      <span className="text-sm text-muted-foreground">{group.progress}%</span>
                    </div>
                    <Progress value={group.progress} className="h-2" />
                  </div>

                  <div className="pt-4">
                    <h3 className="font-medium mb-2">Current Reading</h3>
                    <div className="flex items-center">
                      <BookOpen className="h-5 w-5 mr-2 text-emerald-600 dark:text-emerald-400" />
                      <span>{group.currentReading}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Meeting</CardTitle>
                  <CardDescription>Stay connected with your group</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-emerald-600 dark:text-emerald-400" />
                    <span>{group.nextMeeting}</span>
                  </div>

                  <Button variant="outline" className="w-full bg-transparent">
                    Join Meeting
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Donation Pledge</CardTitle>
                  <CardDescription>Your commitment to accountability</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Pledge amount:</span>
                    <span className="font-medium">{group.donationPledge}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Selected charity:</span>
                    <span className="font-medium">{group.charity}</span>
                  </div>

                  <Button variant="outline" className="w-full bg-transparent">
                    Update Pledge
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="members">
              <GroupMembers groupId={group.id} />
            </TabsContent>

            <TabsContent value="chat">
              <GroupChat groupId={group.id} />
            </TabsContent>

            <TabsContent value="donations">
              <Card>
                <CardHeader>
                  <CardTitle>Donation History</CardTitle>
                  <CardDescription>Track your group's charitable impact</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b">
                    <div>
                      <p className="font-medium">Islamic Relief</p>
                      <p className="text-sm text-muted-foreground">July 15, 2025</p>
                    </div>
                    <p className="font-medium">$25.00</p>
                  </div>

                  <div className="flex justify-between items-center pb-4 border-b">
                    <div>
                      <p className="font-medium">Islamic Relief</p>
                      <p className="text-sm text-muted-foreground">June 30, 2025</p>
                    </div>
                    <p className="font-medium">$18.00</p>
                  </div>

                  <div className="flex justify-between items-center pb-4 border-b">
                    <div>
                      <p className="font-medium">Islamic Relief</p>
                      <p className="text-sm text-muted-foreground">May 31, 2025</p>
                    </div>
                    <p className="font-medium">$22.00</p>
                  </div>

                  <div className="flex justify-between items-center">
                    <p className="font-medium">Total Donations</p>
                    <p className="font-bold">$65.00</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Group Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">{group.members} members</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">Created {group.createdAt}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Contributors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {["Ahmed", "Fatima", "Omar"].map((name, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{name}</p>
                    <p className="text-xs text-muted-foreground">
                      {i === 0 ? "30 day streak" : i === 1 ? "28 day streak" : "25 day streak"}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Invite Members</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">Share this link with friends to invite them to your group</p>
              <div className="flex">
                <input
                  type="text"
                  readOnly
                  value={`https://layl.app/invite/${group.id}`}
                  className="flex-1 px-3 py-2 text-sm border rounded-l-md bg-muted"
                />
                <Button className="rounded-l-none">Copy</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
