import { api } from "../api/api";
import { AppDispatch, AppState } from "./store";

//types
type LocationType = {
  name: string;
  country: string;
  geoname_id: number;
  longitude: number;
  latitude: number;
};

type RequestStatus = "idle" | "loading" | "succeeded" | "failed";

type RequestType = {
  status: RequestStatus;
  error: string | null;
};

export type LocationsState = {
  entities: LocationType[];
  request: RequestType;
};

//initial state
const initState: LocationsState = {
  entities: [],
  request: {
    status: "idle",
    error: null,
  },
};

// reducer
export const locationsReducer = (
  state: LocationsState = initState,
  action: LocationsActions
): LocationsState => {
  switch (action.type) {
    case "locations/setErrorMessage":
      return {
        entities: [],
        request: {
          error: action.payload,
          status: "failed",
        },
      };
    case "locations/setRequestStatus":
      return {
        ...state,
        request: {
          ...state.request,
          status: action.payload,
        },
      };
    case "locations/setLocations":
      return {
        entities: action.payload,
        request: {
          status: "succeeded",
          error: null,
        },
      };
    default:
      return state;
  }
};

//thunks
export const searchLocations = (locationName: string) => {
  return async (dispatch: AppDispatch, getState: () => AppState) => {
    dispatch(setRequestStatus("loading"));
    try {
      const response = await api.fetchLocations(locationName);
      dispatch(setLocations(response.data));
    } catch (error) {
      dispatch(setErrorMessage(error.message));
    }
  };
};

//actions
const setRequestStatus = (status: RequestStatus) =>
  ({ type: "locations/setRequestStatus", payload: status } as const);

const setErrorMessage = (message: string) =>
  ({ type: "locations/setErrorMessage", payload: message } as const);

const setLocations = (locations: LocationType[]) =>
  ({ type: "locations/setLocations", payload: locations } as const);

export type LocationsActions =
  | ReturnType<typeof setRequestStatus>
  | ReturnType<typeof setErrorMessage>
  | ReturnType<typeof setLocations>;

//selectors
export const getLocations = (state: AppState) => state.locations.entities;
export const getRequestStatus = (state: AppState) => state.locations.request.status;
export const getRequestError = (state: AppState) => state.locations.request.error;
