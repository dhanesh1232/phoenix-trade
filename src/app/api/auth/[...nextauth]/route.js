import dbConnect from "@/lib/connection";
import { verifyPassword } from "@/lib/validator";
import { User } from "@/models/user";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const isProd = process.env.NODE_ENV === "production";

const getCookiesSettings = () => ({
  sessionToken: {
    name: isProd
      ? "__Secure-next-auth.session-token"
      : "next-auth.session-token",
    options: {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: isProd,
    },
  },
});

export const authOptions = {
  providers: [
    Credentials({
      name: "Admin Login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        await dbConnect();
        const { email, password } = credentials;
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        const adminUser = await User.findOne({
          email: email.trim().toLowerCase(),
        });

        if (!adminUser) {
          throw new Error("Invalid user credentials");
        }

        const isValid = await verifyPassword(password, adminUser.password);
        if (!isValid) {
          throw new Error("Invalid password");
        }

        return {
          id: adminUser._id,
          email: adminUser.email,
          name: adminUser.name,
        };
      },
    }),
  ],

  useSecureCookies: isProd,
  cookies: getCookiesSettings(),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
      }
      return session;
    },
  },

  pages: {
    signIn: "/phenix-admin-panel-9753/auth/signin",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
