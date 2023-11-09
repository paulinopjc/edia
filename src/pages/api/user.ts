import type { NextApiRequest, NextApiResponse } from "next";
import { deleteUser, getUsers } from "@helper/user";
import connectMongo from "@libs/database";
import { ERROR_TYPES } from "@typedefs/errors";
import { Query } from "@typedefs/query";
import { withAuth } from "@libs/guard";

async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  switch (req.method) {
    case "POST":
      return res.status(405).json({ error: ERROR_TYPES.METHOD_NOT_ALLOWED });
    case "GET": {
      const query: unknown = req.query;
      const data = await getUsers(query as Query);
      return res.status(200).json({ data });
    }
    case "PATCH":
      return res.status(405).json({ error: ERROR_TYPES.METHOD_NOT_ALLOWED });
    case "DELETE": {
      const query: any = req.query;
      const { _id } = query;
      const result = await deleteUser(_id);
      if (result) return res.status(200).json({ deleted: true, _id });
      return res.status(404).json({ error: ERROR_TYPES.USER_NOT_FOUND });
    }
    default:
      return res.status(405).json({ error: ERROR_TYPES.METHOD_NOT_ALLOWED });
  }
}

export default withAuth(connectMongo(handler));
