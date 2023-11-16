import type { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "@libs/database";
import { withAuth } from "@libs/guard";
import { getPolicy } from "@helper/printing";
const { Readable } = require("stream");
const fs = require("fs");
import Jimp from "jimp";

async function handler(req: NextApiRequest & { [key: string]: any }, res: NextApiResponse<any>) {
  switch (req.method) {
    case "GET": {
      const query: any = req.query;
      try {
        const url = await getPolicy(query._id);
        res.status(200).json({ url: url });
      } catch (err) {
        console.log("error:", err);
        res.status(400).json({ error: true, message: err });
      }
      break; // Break out of the switch
    }
    default:
      res.status(405).json({ error: "Method not allowed" });
      break; // Break out of the switch
  }
}

export default withAuth(connectMongo(handler));
