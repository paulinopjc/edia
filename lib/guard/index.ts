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

function isUrlExcluded(method: string): boolean {
  const excluded = ["/api/auth/callback/credentials"];
  return excluded.includes(method);
}

export function withAuth(handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const { method, url, query, body } = req;
    const queryStringIndex = url?.indexOf("?")!;
    const newUrl = (queryStringIndex === -1 ? url : url?.substring(0, queryStringIndex + 1))?.replaceAll("?", "");
    console.log("newUrl: ", newUrl);
    if (!isUrlExcluded(newUrl!)) {
      if (getToken(req)) JWTServerValidator(req, res);
      let payload = "";
      if ((typeof query === "object" && query?.hasOwnProperty("password")) || (typeof body === "object" && body?.hasOwnProperty("password"))) {
        let newQuery = { ...query };
        let newBody = { ...body };
        if (newQuery.password) {
          delete newQuery.password;
        }
        if (newBody.password) {
          delete newBody.password;
        }
        payload = JSON.stringify(newQuery || newBody);
      }

      const { username, role } = JWTParse(getToken(req)!);
      const log = {
        username: username ? username : "N/A",
        role: role ? role : "N/A",
        IP: ip as string,
        method: method!,
        action: getAction(method!, newUrl!),
        payload,
      };

      await LogAction(log);
    }
    await handler(req, res);
  };
}
