import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios"; // Ensure you've installed axios as a dependency
import { useState } from "react";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    console.log("GET FUNCTION CALL");
    const MAPBOX_ACCESS_TOKEN = "pk.eyJ1IjoiYXJiYXRhbSIsImEiOiJjbHBiZWdra24wZnZuMmpxbzQzNXBwajF2In0.ebOoMEM2aeEP7k0acFbXNA";
    const searchQuery = "mental%20health%20clinics";
    const latitude = 14.5644361;
    const longitude = 120.9879857;
    const mapBoxURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery}.json?proximity=${longitude},${latitude}&access_token=${MAPBOX_ACCESS_TOKEN}`; // Replace with your Rasa NLU server's URL/
    console.log("URL: ", `${latitude} ${longitude}`);
    try {
      const response = await axios.get(mapBoxURL);
      console.log("From Map Box", response.data);
      const responseData = response.data;
      res.status(200).json({ data: responseData });
    } catch (error: any) {
      res.status(500).json({ error: `Error fetching data from Rasa NLU server, ${mapBoxURL}` });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
