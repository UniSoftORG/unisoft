import NextAuth, {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthorizeCredentials, ExtendUserAuth } from "@/types";
import cookie from "cookie";
import { Authenticate } from '@/utils/Auth/Authenticate';
import { AuthCallbacks } from '@/utils/Auth/AuthCallbacks';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: { ...CredentialsProvider },
      async authorize(
        credentials: AuthorizeCredentials,
        req
      ): Promise<ExtendUserAuth> {
        const cookies = cookie.parse(req.headers ? req.headers.cookie : "");
        const sessionId = cookies.sessionId;

        return await Authenticate(credentials, sessionId);
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
  callbacks: AuthCallbacks,
};

export default NextAuth(authOptions);
