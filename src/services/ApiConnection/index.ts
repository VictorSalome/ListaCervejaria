import axios, { AxiosResponse } from "axios";
import { IBreweries } from "../../interface/breweriesInterface";

export const ApiConnection = async () => {
  const response = await axios
    .get("https://api.openbrewerydb.org/v1/breweries")
    .then((response: AxiosResponse<IBreweries[]>) => {
      const data = response.data;
      console.log("data", data);
      return data;
    })
    .catch((error) => {
      console.log(error)
      return error
    });

  return response;
};
