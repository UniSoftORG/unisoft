"use client";
import { isGenericApiError } from "@/types/guards/api";
import { getCookie, setCookie } from "@/utils/Request/new/cookies";
import { Endpoints } from "@/utils/Request/new/endpoints";
import { post } from "@/utils/Request/new/request";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

type Props = {
  currentUser?: any;
};

export const SessionProvider = ({ currentUser }: Props) => {
  const { update, data: session } = useSession();

  useEffect(() => {
    (async function check() {
      const request = await post<
        {
          session_id: string;
          user?: any;
        },
        { client: { "user-agent": string; referer: string } }
      >(Endpoints.session, {
        client: {
          "user-agent": navigator.userAgent,
          referer: document.referrer,
        },
      });

      if (!isGenericApiError(request)) {
        const sessionId = await getCookie("sessionId");
        if (sessionId !== request.data.session_id) {
          toast.error("Session expired... Logging out");
          // await logOut()
          await signOut();
          await setCookie("sessionId", request.data.session_id);
        } else {
          await setCookie("sessionId", request.data.session_id);
        }
      }
    })();
  }, []);

  return null;
};
