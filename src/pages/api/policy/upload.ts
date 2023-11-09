import type { NextApiRequest, NextApiResponse } from "next";
import { middleware, upload } from "@helper/file/middleware";
import { ERROR_TYPES } from "@typedefs/errors";
import { parseExcelFile } from "@helper/upload";
import { savePolicy } from "@helper/insurance";
import { JWTParse } from "@libs/jwt";
import { User } from "@typedefs/user";

export const config = {
  api: {
    bodyParser: false,
  },
};

async function handler(req: NextApiRequest & { [key: string]: any }, res: NextApiResponse<any>) {
  switch (req.method) {
    case "POST": {
      try {
        await middleware(req, res, upload.array("file"));
        const files = req?.files; // stricly one file only
        const authHeader: string = req.headers.authorization?.split(" ")[1]!;
        const userData: unknown = JWTParse(authHeader);
        if (files.length <= 0) return res.status(400).json({ error: ERROR_TYPES.FILE_DOESNT_EXIST });
        const parsedFile = await parseExcelFile(files);
        const resInsurance = await savePolicy(parsedFile, userData as User);
        if (!resInsurance) return res.status(400).json({ error: true, message: "Error processing file" });
        return res.status(200).json({ message: "Success Uploading File", reference: resInsurance });
      } catch (error) {
        return res.status(400).json({ success: false, error: (error as Error)?.message });
      }
    }
    default:
      return res.status(405).json({ error: "Method not allowed" });
  }
}

export default handler;
