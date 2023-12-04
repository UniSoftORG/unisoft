import { IUserData } from "@/types";
import { Session } from "next-auth";

export interface IMeData {
  permissions?: Array<string>;
  user: IUserData;
}

export interface ILoginResponse {
  id: string;
  token: string;
  user: IUserData;
  permissions?: Array<string>;
}

export interface IRegisterRequest {
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface INextAuth extends Session {
  user: IUserData;
  token: string;
  permissions?: Array<string>;
}
