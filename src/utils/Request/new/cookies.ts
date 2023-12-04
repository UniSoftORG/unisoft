"use server";
import jwt from "jsonwebtoken";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getCookies() {
  let token = undefined;
  const getCookies = cookies();
  const sessionId = getCookies.get("sessionId")?.value;
  const tokenCookie = getCookies.get(
    `${
      process.env.NODE_ENV === "production" ? "__Secure-" : ""
    }next-auth.session-token`
  );

  if (tokenCookie?.value) {
    const decoded = await decode({
      token: tokenCookie?.value,
      secret: process.env.NEXTAUTH_SECRET ?? "",
    });

    if (decoded) {
      token = decoded.token as string;
    } else {
      throw new Error("JWT decode failed");
    }
  }

  return {
    sessionId,
    ...(token && {
      Authorization: `Bearer ${jwt.verify(
        token as string,
        process.env.JWT_DOUBLE_SECRET ?? ""
      )}`,
    }),
  };
}

export const setCookie = async (name: string, value: string) => {
  cookies().set(name, value);
};

export const getCookie = async (name: string) => {
  return cookies().get(name)?.value;
};
