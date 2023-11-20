// pages/api/rasaEndpoint.ts

import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios"; // Ensure you've installed axios as a dependency
const rasaApiUrl: string | undefined = process.env.RASA_NLU_SERVER;
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { userInput } = req.body; // Assuming userInput is sent in the request body

    // Configure your Rasa NLU server URL
    // const rasaNLUUrl = "http://localhost:5005/webhooks/rest/webhook"; // Replace with your Rasa NLU server's URL
    const rasaNLUUrl = rasaApiUrl; // Replace with your Rasa NLU server's URL/

    try {
      // Make a POST request to your Rasa NLU server
      const response = await axios.post(rasaNLUUrl ?? "", { message: userInput });

      // Assuming Rasa NLU server responds with the parsed data
      const responseData = response.data;

      res.status(200).json({ data: responseData });
    } catch (error) {
      res.status(500).json({ error: "Error fetching data from Rasa NLU server" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
