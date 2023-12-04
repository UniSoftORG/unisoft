import { INextUser, IUserData } from "@/interfaces/authentication";
import "next-auth";

declare module "next-auth" {
  type MergeUserTypes = User & IUserData;

  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User extends INextUser {}

  interface Session {
    user: MergeUserTypes;
    permissions?: Array<string>;
    token?: string;
    refreshTime?: number;
    expires?: any;
  }
}
