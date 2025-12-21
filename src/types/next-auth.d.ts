// next-auth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  // Extend User (DB / JWT user)
  interface User extends DefaultUser {
    id: string;
  }

  // Extend Session returned by getServerSession / useSession
  interface Session {
    user?: {
      id: string;
    } & DefaultSession["user"];
  }
}
