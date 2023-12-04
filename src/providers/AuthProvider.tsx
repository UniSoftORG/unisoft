"use client";
import { INextAuth } from "@/types";
import { SessionProvider } from "next-auth/react";

type Props = {
  children?: React.ReactNode;
  session?: INextAuth | null;
};

export const NextAuthProvider = ({ children, session }: Props) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};
