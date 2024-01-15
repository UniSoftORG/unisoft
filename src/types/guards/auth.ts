import NextAuth, { User } from 'next-auth';
import { ExtendUserAuth } from '@/types/auth';

export function isExtendedUser(user: User | typeof NextAuth): user is ExtendUserAuth {
  return (user as ExtendUserAuth).token !== undefined;
}