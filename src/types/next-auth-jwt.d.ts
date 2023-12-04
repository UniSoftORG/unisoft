import { IUserData } from "@/interfaces/authentication";
import { User } from "next-auth";
import "next-auth/jwt";

type MergeUserTypes = User & IUserData;

declare module "next-auth/jwt" {
  interface JWT {
    /** OpenID ID Token */
    user: MergeUserTypes;
    token?: string;
    permissions?: Array<string>;
    accessTokenExpires?: number;
  }
}
