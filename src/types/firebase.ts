import type { Timestamp } from "firebase/firestore"

export interface User {
  id: string
  email: string
  name: string
  username?: string
  bio?: string
  profileImage?: string
  streak: number
  lastReadingDate?: Timestamp
  createdAt: Timestamp
  privacySettings: {
    showStreak: boolean
    showProgress: boolean
    allowMessages: boolean
  }
  interests: string[]
  readingGoal: {
    type: "pages" | "time" | "surahs"
    amount: number
  }
}

export interface Post {
  id: string
  userId: string
  content: string
  type: "text" | "streak" | "achievement"
  likes: string[] // Array of user IDs who liked
  comments: number
  shares: number
  createdAt: Timestamp
  achievement?: {
    title: string
    description: string
    icon: string
  }
}

export interface Channel {
  id: string
  name: string
  description: string
  ownerId: string
  isPrivate: boolean
  isPaid: boolean
  memberIds: string[]
  createdAt: Timestamp
  lastActivity: Timestamp
}

export interface Group {
  id: string
  channelId: string
  planType: "basic" | "premium" | "unlimited"
  monthlyFee: number
  donationAmount: number
  selectedCharity: string
  createdAt: Timestamp
  subscriptionId?: string // Stripe subscription ID
}

export interface Message {
  id: string
  channelId: string
  userId: string
  content: string
  createdAt: Timestamp
  type: "text" | "image" | "system"
}

export interface ReadingLog {
  id: string
  userId: string
  date: Timestamp
  pagesRead: number
  timeSpent: number // in minutes
  surahsCompleted: string[]
  notes?: string
}
