import type { NextApiRequest, NextApiResponse } from "next";
import { deletePolicy, getPolicies, savePolicy, updatePolicy } from "@helper/insurance";
import { User } from "@typedefs/user";
import { Query } from "@typedefs/query";
import connectMongo from "@libs/database";
import { withAuth } from "@libs/guard";
import { JWTParse } from "@libs/jwt";
import { InsurancePolicy } from "@typedefs/policy";

async function handler(req: NextApiRequest & { [key: string]: any }, res: NextApiResponse<any>) {
  switch (req.method) {
    case "POST": {
      try {
        const policy: InsurancePolicy = req.body;
        const authHeader: string = req.headers.authorization?.split(" ")[1]!;
        const userData: unknown = JWTParse(authHeader);
        const resInsurance = await savePolicy(policy, userData as User);
        if (!resInsurance) return res.status(400).json({ error: true, message: "Error parsing inputs" });
        return res.status(200).json({ message: "Success", reference: resInsurance });
      } catch (error) {
        return res.status(400).json({ success: false, error: (error as Error)?.message });
      }
    }
    case "GET": {
      const query: unknown = req.query;
      const data = await getPolicies(query as Query);
      return res.status(200).json({ data });
    }
    case "PATCH": {
      const policy: InsurancePolicy = req.body;
      const authHeader: string = req.headers.authorization?.split(" ")[1]!;
      const userData: unknown = JWTParse(authHeader);
      const resInsurance = await updatePolicy(policy, userData as User);
      if (!resInsurance) return res.status(400).json({ error: true, message: "Error parsing inputs" });
      return res.status(200).json({ message: "Success", reference: resInsurance });
    }
    case "DELETE": {
      const { query } = req;
      const { _id } = query!;
      const data = await deletePolicy(_id as string);
      if (!data) return res.status(400).json({ error: true, message: "Error parsing inputs" });
      return res.status(200).json({ message: "Success", reference: data });
    }
    default:
      return res.status(405).json({ error: "Method not allowed" });
  }
}

export default withAuth(connectMongo(handler));
