import { api } from "../api/api";
import { AppDispatch, AppState } from "./store";

//types
type WeatherForecast = {
  date: number;
  desc: string;
  tempMinC: number;
  tempMaxC: number;
  tempMinF: number;
  tempMaxF: number;
};
type WeatherType = {
  current: {
    tempC: number;
    tempF: number;
    desc: string;
    date: number;
    windSpeed: number;
    windDeg: number;
    humidity: number;
    visibility: number;
    pressure: number;
  };
  forecast: WeatherForecast[];
};

type RequestStatus = "idle" | "loading" | "succeeded" | "failed";

type RequestType = {
  status: RequestStatus;
  error: string | null;
};

export type WeatherState = {
  weather: WeatherType | null;
  request: RequestType;
};

//initial state
const initState: WeatherState = {
  weather: null,
  request: {
    status: "idle",
    error: null,
  },
};

// reducer
export const weatherReducer = (
  state: WeatherState = initState,
  action: WeatherActions
): WeatherState => {
  switch (action.type) {
    case "weather/setErrorMessage":
      return {
        weather: null,
        request: {
          error: action.payload,
          status: "failed",
        },
      };
    case "weather/setRequestStatus":
      return {
        ...state,
        request: {
          ...state.request,
          status: action.payload,
        },
      };
    case "weather/setWeather":
      return {
        weather: action.payload,
        request: {
          error: null,
          status: "succeeded",
        },
      };
    default:
      return state;
  }
};

//thunks
export const fetchWeather = (lat: string, lon: string) => {
  return async (dispatch: AppDispatch, getState: () => AppState) => {
    dispatch(setRequestStatus("loading"));
    try {
      const { data } = await api.fetchWeather(lat, lon);
      console.log(data);
      const weather: WeatherType = {
        current: {
          date: data.current.dt,
          desc: data.current.weather[0].description,
          humidity: data.current.humidity,
          visibility: data.current.visibility,
          pressure: data.current.pressure,
          windDeg: data.current.wind_deg,
          windSpeed: data.current.wind_speed,
          tempC: Math.round(Number(data.current.temp)),
          tempF: Math.round(Number(data.current.temp) * 1.8 + 32),
        },
        forecast: data.daily.map((el: any) => ({
          date: el.dt,
          desc: el.weather[0].description,
          tempMinC: Math.round(Number(el.temp.min)),
          tempMaxC: Math.round(Number(el.temp.max)),
          tempMinF: Math.round(Number(el.temp.min) * 1.8 + 32),
          tempMaxF: Math.round(Number(el.temp.max) * 1.8 + 32),
        })),
      };
      dispatch(setWeather(weather));
    } catch (error) {
      console.error(error.response.data.message);
      dispatch(setErrorMessage(error.response.data.message));
    }
  };
};

//actions
const setRequestStatus = (status: RequestStatus) =>
  ({ type: "weather/setRequestStatus", payload: status } as const);

const setErrorMessage = (message: string) =>
  ({ type: "weather/setErrorMessage", payload: message } as const);

const setWeather = (weather: WeatherType) =>
  ({ type: "weather/setWeather", payload: weather } as const);

export type WeatherActions =
  | ReturnType<typeof setRequestStatus>
  | ReturnType<typeof setErrorMessage>
  | ReturnType<typeof setWeather>;

//selectors
export const getLocations = (state: AppState) => state.locations.entities;
export const getCurrentLocation = (state: AppState) => state.locations.currentLocation;
export const getRequestStatus = (state: AppState) => state.locations.request.status;
export const getRequestError = (state: AppState) => state.locations.request.error;
