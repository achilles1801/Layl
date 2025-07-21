import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Plus, Users } from "lucide-react"
import Link from "next/link"

export default function GroupsPage() {
  const groups = [
    {
      id: 1,
      name: "Madinah Circle",
      description: "A group focused on consistent daily reading",
      members: 5,
      progress: 85,
      isPrivate: false,
    },
    {
      id: 2,
      name: "Ramadan Khatm",
      description: "Complete the Quran during Ramadan",
      members: 12,
      progress: 42,
      isPrivate: false,
    },
    {
      id: 3,
      name: "Tajweed Practice",
      description: "Improve Quran recitation with proper tajweed",
      members: 8,
      progress: 60,
      isPrivate: true,
    },
  ]

  const recommendedGroups = [
    {
      id: 4,
      name: "Beginners Welcome",
      description: "A supportive group for those new to regular Quran reading",
      members: 15,
      isPrivate: false,
    },
    {
      id: 5,
      name: "Juz Amma Focus",
      description: "Focused on memorizing and understanding Juz Amma",
      members: 20,
      isPrivate: false,
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Groups</h1>
        <Button asChild>
          <Link href="/groups/create">
            <Plus className="mr-2 h-4 w-4" /> Create Group
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {groups.map((group) => (
          <Card key={group.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{group.name}</CardTitle>
                  <CardDescription>{group.description}</CardDescription>
                </div>
                {group.isPrivate && <Badge variant="outline">Private</Badge>}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{group.members} members</span>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Group Progress</span>
                  <span className="text-sm text-muted-foreground">{group.progress}%</span>
                </div>
                <Progress value={group.progress} className="h-2" />
              </div>

              <div className="flex -space-x-2">
                {Array.from({ length: Math.min(5, group.members) }).map((_, i) => (
                  <Avatar key={i} className="border-2 border-background h-8 w-8">
                    <AvatarFallback>{String.fromCharCode(65 + i)}</AvatarFallback>
                  </Avatar>
                ))}
                {group.members > 5 && (
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-muted text-xs font-medium">
                    +{group.members - 5}
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full bg-transparent" asChild>
                <Link href={`/groups/${group.id}`}>View Group</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-6">Recommended Groups</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendedGroups.map((group) => (
          <Card key={group.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{group.name}</CardTitle>
                  <CardDescription>{group.description}</CardDescription>
                </div>
                {group.isPrivate && <Badge variant="outline">Private</Badge>}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{group.members} members</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Join Group</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
