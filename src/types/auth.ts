import { User } from 'next-auth';
import { INextAuth } from '@/types/responses';

export type ExtendUserAuth = User & INextAuth;

export type AuthorizeCredentials =
  | {
  [K in keyof CustomCredentials]?: CustomCredentials[K];
}
  | undefined;

export interface CustomCredentials {
  username: string | null;
  password: string | null;
  twoFactorCode: string | null;
  twoFactorURLCode: string | null;
}