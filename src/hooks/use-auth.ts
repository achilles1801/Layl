"use client"

// This is just a type definition file that re-exports from auth-provider
// to avoid circular dependencies
export function useAuth() {
  // The actual implementation is in the AuthProvider component
  // This is just a placeholder to make TypeScript happy
  return {
    user: null,
    loading: false,
    signIn: async () => {},
    signUp: async () => {},
    signOut: () => {},
  }
}
