import { NextApiRequest, NextApiResponse } from "next";
import { JWTParse, JWTServerValidator } from "@libs/jwt";
import { getAction } from "@constants/urls";
import { LogAction } from "@libs/logging";

/*
Future support will include userAgent please see: https://nextjs.org/docs/api-reference/next/server#useragent
*/

function getToken(req: NextApiRequest): string | null {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return null;
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return null;
  }

  return token;
}

function isUrlExcluded(url: string): boolean {
  const excluded = ["/api/login", "/api/auth/callback/credentials"];
  return excluded.includes(url);
}

export function withAuth(handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const { method, url = "", query, body } = req;
    const newUrl = url.split("?")[0];

    if (!isUrlExcluded(newUrl)) {
      const token = getToken(req);
      if (token) JWTServerValidator(req, res);

      let payload = "";
      if ((typeof query === "object" && query?.hasOwnProperty("password")) || (typeof body === "object" && body?.hasOwnProperty("password"))) {
        let newQuery = { ...query };
        let newBody = { ...body };
        if (newQuery.password) delete newQuery.password;
        if (newBody.password) delete newBody.password;
        payload = JSON.stringify(newQuery || newBody);
      }

      const { username, role } = JWTParse(token!);
      const log = {
        username: username || "N/A",
        role: role || "N/A",
        IP: ip as string,
        method,
        action: getAction(method, newUrl),
        payload,
      };

      await LogAction(log);
    }

    await handler(req, res);
  };
}
