"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { useAuth } from "@/hooks/use-auth"
import { Menu, X, BookOpen } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, signOut } = useAuth()

  return (
    <nav className="border-b bg-background sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-layl-700 dark:text-layl-300" />
            <span className="text-xl font-bold">Layl</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/dashboard"
              className="text-sm font-medium hover:text-layl-700 dark:hover:text-layl-300 transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/feed"
              className="text-sm font-medium hover:text-layl-700 dark:hover:text-layl-300 transition-colors"
            >
              Feed
            </Link>
            <Link
              href="/channels"
              className="text-sm font-medium hover:text-layl-700 dark:hover:text-layl-300 transition-colors"
            >
              Channels
            </Link>
            <Link
              href="/groups"
              className="text-sm font-medium hover:text-layl-700 dark:hover:text-layl-300 transition-colors"
            >
              Groups
            </Link>
            <Link
              href="/charities"
              className="text-sm font-medium hover:text-layl-700 dark:hover:text-layl-300 transition-colors"
            >
              Charities
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <ModeToggle />

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={user.image || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()}>Sign Out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <ModeToggle />
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link
              href="/dashboard"
              className="block py-2 text-sm font-medium hover:text-layl-700 dark:hover:text-layl-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/feed"
              className="block py-2 text-sm font-medium hover:text-layl-700 dark:hover:text-layl-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Feed
            </Link>
            <Link
              href="/channels"
              className="block py-2 text-sm font-medium hover:text-layl-700 dark:hover:text-layl-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Channels
            </Link>
            <Link
              href="/groups"
              className="block py-2 text-sm font-medium hover:text-layl-700 dark:hover:text-layl-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Groups
            </Link>
            <Link
              href="/charities"
              className="block py-2 text-sm font-medium hover:text-layl-700 dark:hover:text-layl-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Charities
            </Link>

            {user ? (
              <>
                <Link
                  href="/profile"
                  className="block py-2 text-sm font-medium hover:text-layl-700 dark:hover:text-layl-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  href="/settings"
                  className="block py-2 text-sm font-medium hover:text-layl-700 dark:hover:text-layl-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Settings
                </Link>
                <Button
                  variant="ghost"
                  className="w-full justify-start px-0"
                  onClick={() => {
                    signOut()
                    setIsMenuOpen(false)
                  }}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <div className="flex flex-col space-y-2">
                <Button variant="outline" asChild className="w-full bg-transparent">
                  <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                    Sign In
                  </Link>
                </Button>
                <Button asChild className="w-full">
                  <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                    Sign Up
                  </Link>
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
