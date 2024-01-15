import { isExtendedUser } from '@/types/guards/auth';
import jwt from 'jsonwebtoken';
import { CallbacksOptions } from 'next-auth';

export const AuthCallbacks = ({
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
}) as Partial<CallbacksOptions>