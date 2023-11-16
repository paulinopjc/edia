import { Query } from "@typedefs/query";

export const getClinics = async (query: Query) => {
  const API_KEY = "";
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`https://www.googleapis.com/maps/api/place/nearbysearch/json?key=${API_KEY}`);
      console.log("Getting google maps ***** ", response);
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
