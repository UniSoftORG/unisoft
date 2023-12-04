import { isGenericApiError } from "@/types/guards/api";
import { clientRequest } from "@/utils/Request/apiRequest";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const createRequest = await clientRequest(req);

      const request = await createRequest.post<any>(
        `auth/session`,
        {
          client: req.headers,
        },
        true
      );

      if (isGenericApiError(request)) {
        res.status(422).json({
          message: request.message,
          errors: request.errors,
        });
      } else {
        const setCookieHeader = `sessionId=${
          request.data.session_id
        }; Path=/; SameSite=Lax; httpOnly; ${
          process.env.NODE_ENV === "production" ? "Secure" : undefined
        }`;

        res.setHeader("Set-Cookie", setCookieHeader);

        res.status(200).json({
          data: request.data,
        });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

export default handler;
