import NextAuth, { DefaultSession, AdapterUser } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      user_id: string,
      jwtToken: string,
    } & DefaultSession["user"]
  }

  interface User extends AdapterUser {
    name: string,
    email: string,
    image: string,
    user_id: string
    token : string
  }

  interface token extends JWT {
    uid: string,
    jwtToken: string
  }
}