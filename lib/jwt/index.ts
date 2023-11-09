import jwt from "jsonwebtoken";

import { NextApiRequest, NextApiResponse } from "next/types";
import { ERROR_TYPES } from "@typedefs/errors";
import { getCookie } from "@libs/cookies";
const pkey = Buffer.from(`${process.env.NEXTAUTH_SECRET}`, "base64").toString();

interface JWTResponse {
  _id: string;
  username: string;
  role: string;
  iat: number;
  exp: number;
}

export const JWTSign = (payload: any) => {
  return jwt.sign(payload, pkey, {
    expiresIn: "1d",
    algorithm: "HS256",
  });
};

export const JWTVerify = (token: string) => {
  try {
    if (token) {
      const isVerified = jwt.verify(token, pkey);
      if (isVerified) {
        const { exp } = JWTParse(token);
        if (exp) {
          return new Date(exp * 1000) > new Date();
        }
      }
      return false;
    }
    return false;
  } catch (e) {
    return false;
  }
};

export const JWTParse = (token: string): JWTResponse => {
  try {
    return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
  } catch (e) {
    console.log("error", e);
    return {} as JWTResponse;
  }
};

export const getAuth = () => {
  const token = getCookie("auth");
  return `Bearer ${token}`;
};

export const getAuthTokenOnly = () => {
  const token = getCookie("auth");
  return token;
};

export const JWTServerValidator = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: ERROR_TYPES.UNAUTHORIZED });
  const isValid = JWTVerify(token);
  if (!isValid) return res.status(401).json({ error: ERROR_TYPES.UNAUTHORIZED });
};
