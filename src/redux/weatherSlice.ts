import { api } from "../api/api";
import { AppDispatch, AppState } from "./store";

//types
type WeatherForecast = {
  date: string;
  icon: string;
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
    date: string;
    windSpeed: number;
    windDeg: number;
    humidity: number;
    visibility: number;
    pressure: number;
    icon: string;
  };
  forecast: WeatherForecast[];
  timezone: number;
  location: string;
};

type RequestStatus = "idle" | "loading" | "succeeded" | "failed";

type RequestType = {
  status: RequestStatus;
  error: string | null;
};

export type WeatherState = {
  weather: WeatherType | null;
  tempUnit: "°C" | "°F";
  request: RequestType;
};

//initial state
const initState: WeatherState = {
  weather: null,
  tempUnit: "°C",
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
        ...state,
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
        ...state,
        weather: action.payload,
        request: {
          error: null,
          status: "succeeded",
        },
      };
    case "weather/setTempUnit":
      return {
        ...state,
        tempUnit: action.payload,
      };
    default:
      return state;
  }
};

//utils
const dateToString = (date: number) => {
  const dateOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    weekday: "short",
    timeZone: "UTC",
  };
  const stringDate = new Date(date).toLocaleString("en-GB", dateOptions);
  return stringDate;
};

//thunks
export const fetchWeather = (locationId: string) => {
  return async (dispatch: AppDispatch, getState: () => AppState) => {
    dispatch(setRequestStatus("loading"));
    try {
      const { data } = await api.fetchWeather(locationId);
      const weather: WeatherType = {
        current: {
          date: dateToString(data.current.dt * 1000 + data.timezone_offset),
          desc: data.current.weather[0].description,
          icon: data.current.weather[0].icon,
          humidity: data.current.humidity,
          visibility: data.current.visibility / 1000,
          pressure: data.current.pressure,
          windDeg: data.current.wind_deg,
          windSpeed: data.current.wind_speed,
          tempC: Math.round(Number(data.current.temp)),
          tempF: Math.round(Number(data.current.temp) * 1.8 + 32),
        },
        forecast: data.daily
          .map((el: any) => ({
            date: dateToString(el.dt * 1000 + data.timezone_offset),
            icon: el.weather[0].icon,
            tempMinC: Math.round(Number(el.temp.min)),
            tempMaxC: Math.round(Number(el.temp.max)),
            tempMinF: Math.round(Number(el.temp.min) * 1.8 + 32),
            tempMaxF: Math.round(Number(el.temp.max) * 1.8 + 32),
          }))
          .slice(1, 6),
        timezone: data.timezone_offset,
        location: data.location_name,
      };
      dispatch(setWeather(weather));
    } catch (error) {
      if (error.response.data.message) {
        dispatch(setErrorMessage(error.response.data.message));
      } else {
        dispatch(setErrorMessage(error.message));
      }
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

export const setTempUnit = (unit: "°C" | "°F") =>
  ({ type: "weather/setTempUnit", payload: unit } as const);

export type WeatherActions =
  | ReturnType<typeof setRequestStatus>
  | ReturnType<typeof setErrorMessage>
  | ReturnType<typeof setWeather>
  | ReturnType<typeof setTempUnit>;

//selectors
export const getRequestStatus = (state: AppState) => state.weather.request.status;
export const getRequestError = (state: AppState) => state.weather.request.error;
export const getCurrentWeather = (state: AppState) => state.weather.weather?.current;
export const getForecastWeather = (state: AppState) => state.weather.weather?.forecast;
export const getTimezone = (state: AppState) => state.weather.weather?.timezone;
export const getLocationName = (state: AppState) => state.weather.weather?.location;
export const getTempUnit = (state: AppState) => state.weather.tempUnit;
