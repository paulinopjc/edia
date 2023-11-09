import type { NextApiRequest, NextApiResponse } from "next/types";
import multer from "multer";
import path from "path";

export const upload = multer({
  storage: multer.diskStorage({
    destination: path.join(process.cwd(), "public", "uploads"),
    filename: function (req, file, cb) {
      cb(null, `${file.originalname}`);
    },
  }),
  fileFilter: function (req, file, cb) {
    const filetypes = /csv|xlsx|excel/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (extname) {
      return cb(null, true);
    }
    cb(new Error("Only CSV and Excel files are allowed"));
  },
});

export const middleware = (req: NextApiRequest & { [key: string]: any }, res: NextApiResponse, fn: (...args: any[]) => void) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};
