import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL || "";

const fetchLocations = async (searchQuery: string) => {
  const url = `${apiUrl}/places`;
  const queryParams = {
    name: searchQuery,
  };
  return await axios.get(url, { params: queryParams });
};

const fetchWeather = async (locationId: string) => {
  const url = `${apiUrl}/weather`;
  const queryParams = {
    id: locationId,
  };
  return await axios.get(url, { params: queryParams });
};

export const api = { fetchLocations, fetchWeather };
