import { getServerSession } from "next-auth";
import type { Session } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function getSessionServer(): Promise<Session | null> {
  return getServerSession(authOptions as any);
}
