// pages/api/rasaEndpoint.ts

import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const rasaApiUrl: string | undefined = process.env.RASA_NLU_SERVER;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { userInput } = req.body;

  if (!userInput) {
    return res.status(400).json({ error: "userInput is required in the request body." });
  }

  if (!rasaApiUrl) {
    return res.status(500).json({ error: "RASA_NLU_SERVER is not configured." });
  }

  try {
    const response = await axios.post(rasaApiUrl, {
      sender: "user", // required by Rasa
      message: userInput,
    });

    res.status(200).json({ data: response.data });
  } catch (error: any) {
    console.error("Rasa API error:", error?.response?.data || error.message);
    res.status(500).json({
      error: "Error fetching data from Rasa NLU server",
      details: error?.response?.data || error.message,
    });
  }
}
