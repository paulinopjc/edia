import { Query } from "@typedefs/query";
import axios from "axios";
import { API } from "@libs/api";
export const getBotmessage = async (query: any) => {
  const API_KEY = "";
  return new Promise(async (resolve, reject) => {
    try {
      console.log("Sending to chatbot ***** ", query);
      const url = "http://localhost:5005/webhooks/rest/webhook";
      //const url = 'https://9bdc-112-198-104-241.ngrok-free.app/webhooks/rest/webhook'
      const payload = { userInput: query?.message };

      const response = await axios.post(url, payload);
      console.log("Getting chatbot ***** ", response);
      return response;
      //   .get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
      //     params: queryParams,
      //   })
      //   .toPromise();
    } catch (error) {
      console.log("error parsing: ", error);
      reject(null);
    }
  });
};
