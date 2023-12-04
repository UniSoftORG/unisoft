import {
  authenticate,
  verifyTwoFactorCode,
  verifyTwoFactorURLCode,
} from "@/core/Backend/Auth/login";
import { ILoginResponse, INextAuth } from "@/types";
import { isGenericApiError } from "@/types/guards/api";
import { ApiResponse } from "@/types/request/response";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import type { NextAuthOptions, User } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

type ExtendUserAuth = User & INextAuth;

interface CustomCredentials {
  username: string | null;
  password: string | null;
  twoFactorCode: string | null;
  twoFactorURLCode: string | null;
}

type AuthorizeCredentials =
  | {
      [K in keyof CustomCredentials]?: CustomCredentials[K];
    }
  | undefined;

function isExtendedUser(user: User | typeof NextAuth): user is ExtendUserAuth {
  return (user as ExtendUserAuth).token !== undefined;
}

function handleError(res: ApiResponse<ILoginResponse>) {
  if (isGenericApiError(res)) {
    throw new Error(res.message);
  } else {
    throw new Error("Authentication failed!");
  }
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: { label: "Password", type: "password" },
        twoFactorCode: {
          label: "Two Factor Code",
          type: "text",
          placeholder: "Two Factor Code (Optional)",
        },
        twoFactorURLCode: {
          label: "Two URL Factor Code",
          type: "text",
          placeholder: "Two Factor Code (Optional)",
        },
      },
      async authorize(
        credentials: AuthorizeCredentials,
        req
      ): Promise<ExtendUserAuth> {
        const { username, password, twoFactorCode, twoFactorURLCode } =
          credentials as any;
        const cookies = cookie.parse(req.headers ? req.headers.cookie : "");
        const sessionId = cookies.sessionId;

        if (!twoFactorURLCode) {
          if (!username || !password) {
            throw new Error("Invalid credentials");
          }
        }

        let res;

        if (!twoFactorURLCode && !twoFactorCode) {
          // Authenticate without two-factor code
          res = await authenticate(username, password, sessionId);

          if (res.statusCode === 307) {
            throw new Error("Two-factor authentication required");
          }
        } else if (!twoFactorURLCode && twoFactorCode) {
          // Authenticate with two-factor code
          res = await verifyTwoFactorCode(twoFactorCode, sessionId);

          if (res.statusCode !== 200) {
            handleError(res);
          }
        } else {
          res = await verifyTwoFactorURLCode(twoFactorURLCode, sessionId);

          if (res.statusCode !== 200) {
            handleError(res);
          }
        }

        if (isGenericApiError(res)) {
          throw new Error(res.message ?? "Authentication failed!");
        } else {
          return {
            id: res.data.user.id,
            user: res.data.user,
            token: res.data.token,
            permissions: res.data.permissions,
          };
        }
      },
    }),
  ],
  jwt: {
    maxAge: 60 * 60 * 24 * 30,
  },
  pages: {
    signIn: "/",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, trigger, user, session, account }) {
      if (trigger === "update" && token && token.user) {
        if (session.shouldRefresh) {
          token.accessTokenExpires = Date.now() + 60 * 1000;
        }

        if (session.is_update) {
          token.user.avatar = session.avatar;
          token.user.is_client = session.is_client;
          token.user.title = session.title;
          token.user.color = session.color;
          token.permissions = session.permissions;
          token.user.notifications = session.notifications;
          token.user.friend_requests = session.friend_requests;
        }

        if (session.avatar) {
          token.user.avatar = session.avatar;
        }
      }

      if (user && isExtendedUser(user)) {
        const encryptedToken = jwt.sign(
          user.token,
          process.env.JWT_DOUBLE_SECRET || "secret"
        );

        return {
          ...token,
          user: user.user,
          token: encryptedToken,
          permissions: user.permissions,
          accessTokenExpires: Date.now() + 24 * 60 * 60 * 1000,
        };
      }

      return token;
    },
    async session({ session, token, user }) {
      session.user = token.user;
      session.permissions = token.permissions;
      session.refreshTime = token.accessTokenExpires;

      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return baseUrl;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
};

export default NextAuth(authOptions);
