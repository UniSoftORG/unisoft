// organize-imports-ignore
import "./globals.scss";
import { VerticalNavigation } from "@/predefined/JSON/Navigations";
import type { Metadata } from "next";

// Element must be imported before initialization
import Element from "@/core/Renderer/strategies/Element";

import { initComponent } from "@/core/Renderer/helpers/init";
import { PrepareRenderer } from "@/core/Renderer/PrepareRenderer";
import { InitiateModals } from "@/core/Modals/InitiateModals";
import ToasterProvider from "@/providers/ToastProvider";
import { NextAuthProvider } from "@/providers/AuthProvider";
import { getSession } from "@/utils/Auth/NextAuth";
import { SessionProvider } from "@/providers/SessionProvider";

export const metadata: Metadata = {
  title: "UniSoft",
  description: "Generated by create next app",
};

const onSubmitSignUp = async (data: unknown) => {
  "use server";
  console.log(data);
};

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <html lang='en'>
      <body>
        <ToasterProvider />
        <InitiateModals requestHandler={onSubmitSignUp} session={session} />

        <NextAuthProvider session={session}>
          <SessionProvider />
          <PrepareRenderer
            component={await initComponent({
              ...VerticalNavigation,
              session: session?.user,
            })}
          />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
