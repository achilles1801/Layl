"use client"

import type React from "react"

import { createContext, useContext } from "react"
import { useFirebaseAuth } from "@/hooks/use-firebase-auth"
import type { User } from "@/types/firebase"
import type { User as FirebaseUser } from "firebase/auth"

interface AuthContextType {
  user: User | null
  firebaseUser: FirebaseUser | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (name: string, email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function FirebaseAuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useFirebaseAuth()

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within a FirebaseAuthProvider")
  }
  return context
}
