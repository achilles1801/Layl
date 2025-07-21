"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Share, MoreHorizontal, Flame } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

type Post = {
  id: string
  author: {
    id: string
    name: string
    username: string
    image?: string
    streak: number
    isVerified?: boolean
  }
  content: string
  timestamp: Date
  likes: number
  comments: number
  shares: number
  isLiked: boolean
  type: "text" | "streak" | "achievement"
  achievement?: {
    title: string
    description: string
    icon: string
  }
}

export default function FeedPage() {
  const [newPost, setNewPost] = useState("")
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      author: {
        id: "1",
        name: "Ahmed Hassan",
        username: "@ahmed_h",
        image: undefined,
        streak: 45,
        isVerified: true,
      },
      content:
        "Alhamdulillah, just completed Surah Al-Baqarah! The verses about patience really spoke to me today. May Allah grant us all consistency in our reading. 📖✨",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      likes: 24,
      comments: 8,
      shares: 3,
      isLiked: false,
      type: "text",
    },
    {
      id: "2",
      author: {
        id: "2",
        name: "Fatima Al-Zahra",
        username: "@fatima_z",
        image: undefined,
        streak: 30,
      },
      content: "30 day streak milestone! 🔥 Starting to feel the barakah in my daily routine. Who else is on a streak?",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      likes: 67,
      comments: 15,
      shares: 8,
      isLiked: true,
      type: "streak",
    },
    {
      id: "3",
      author: {
        id: "3",
        name: "Omar Abdullah",
        username: "@omar_a",
        image: undefined,
        streak: 12,
      },
      content:
        "Our Madinah Circle group raised $150 for Islamic Relief this month through our missed day donations! Small actions, big impact. 💚",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      likes: 89,
      comments: 22,
      shares: 12,
      isLiked: false,
      type: "achievement",
      achievement: {
        title: "Charity Champion",
        description: "Raised over $100 for charity",
        icon: "💚",
      },
    },
  ])

  const handlePost = () => {
    if (!newPost.trim()) return

    const post: Post = {
      id: Date.now().toString(),
      author: {
        id: "current-user",
        name: "You",
        username: "@you",
        streak: 7,
      },
      content: newPost,
      timestamp: new Date(),
      likes: 0,
      comments: 0,
      shares: 0,
      isLiked: false,
      type: "text",
    }

    setPosts([post, ...posts])
    setNewPost("")
  }

  const handleLike = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post,
      ),
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      {/* Create Post */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex space-x-4">
            <Avatar>
              <AvatarFallback>Y</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-4">
              <Textarea
                placeholder="Share your Quran reading journey..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                rows={3}
              />
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <Badge variant="outline" className="text-xs">
                    <Flame className="w-3 h-3 mr-1" />7 day streak
                  </Badge>
                </div>
                <Button onClick={handlePost} disabled={!newPost.trim()}>
                  Post
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feed */}
      <div className="space-y-6">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={post.author.image || "/placeholder.svg"} alt={post.author.name} />
                    <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold">{post.author.name}</h4>
                      {post.author.isVerified && (
                        <div className="w-4 h-4 bg-layl-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <span>{post.author.username}</span>
                      <span>•</span>
                      <span>{formatDistanceToNow(post.timestamp, { addSuffix: true })}</span>
                      <Badge variant="outline" className="text-xs">
                        <Flame className="w-3 h-3 mr-1 text-orange-500" />
                        {post.author.streak}
                      </Badge>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              {post.type === "achievement" && post.achievement && (
                <div className="mb-4 p-3 bg-layl-50 dark:bg-layl-950/30 rounded-lg border border-layl-200 dark:border-layl-800">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{post.achievement.icon}</span>
                    <div>
                      <h5 className="font-semibold text-layl-700 dark:text-layl-300">{post.achievement.title}</h5>
                      <p className="text-sm text-layl-600 dark:text-layl-400">{post.achievement.description}</p>
                    </div>
                  </div>
                </div>
              )}

              <p className="text-sm leading-relaxed mb-4">{post.content}</p>

              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center space-x-6">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike(post.id)}
                    className={`hover:bg-rose-50 dark:hover:bg-rose-950/30 ${
                      post.isLiked ? "text-rose-600" : "text-muted-foreground"
                    }`}
                  >
                    <Heart className={`h-4 w-4 mr-2 ${post.isLiked ? "fill-current" : ""}`} />
                    {post.likes}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:bg-blue-50 dark:hover:bg-blue-950/30"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    {post.comments}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:bg-green-50 dark:hover:bg-green-950/30"
                  >
                    <Share className="h-4 w-4 mr-2" />
                    {post.shares}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
