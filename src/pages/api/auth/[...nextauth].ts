import Credentials from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import { JWTParse } from "@libs/jwt";
import { NextApiRequest, NextApiResponse } from "next";
import { URLList } from "@constants/urls";
import { LogAction } from "@libs/logging";
import connectMongo from "@libs/database";
const options = {
  pages: {
    signIn: "/",
    signOut: "/",
  },
  callbacks: {
    async session({ session, token }: any) {
      //@ts-ignore
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }: any) {
      if (user) token.user = user;
      return token;
    },
  },
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await fetch(`${process.env.NEXT_API_URL}/api/login?username=${credentials?.username}&password=${credentials?.password}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        let user = await res.json();
        // If no error and we have user data, return it
        if (res.ok && user.token) {
          const newUser = JWTParse(user.token);
          user = { ...newUser, accessToken: user.token };
          return user;
        }
        // Return null if user data could not be retrieved
        throw new Error("Unauthorized");
        // return null;
      },
    }),
  ],
};

async function signIn(req: NextApiRequest, res: NextApiResponse) {
  // if (req.query.nextauth?.includes("callback") && req.method === "POST") {
  //   const { url, body, method } = req;
  //   const { username } = Object.assign({}, body);
  //   const ip = req.headers["x-forwarded-for"]! || req.socket.remoteAddress;
  //   const log = {
  //     username,
  //     IP: ip as string,
  //     method,
  //     action: URLList[`${url}`],
  //   };
  //   await LogAction(log);
  // }

  // const data = form.parse(req, (err, fields, files) => {
  //   console.log('err', err)
  //   console.log("fields", fields);
  //   if (err) return;
  // });
  // console.log("data", data);
  // console.log("query 50", query);
  await NextAuth(req, res, options);
}

export default connectMongo(signIn);
