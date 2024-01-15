"use server";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { INextAuth } from "@/types";
import { getServerSession } from "next-auth/next";

export async function getSession(): Promise<INextAuth | null | undefined> {
  try {
    return await getServerSession(authOptions);
  } catch (error: any) {
    return undefined;
  }
}
