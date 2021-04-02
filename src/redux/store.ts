import { applyMiddleware, combineReducers, createStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk, { ThunkDispatch } from "redux-thunk";
import { LocationsActions, locationsReducer, LocationsState } from "./locationsSlice";
import { WeatherActions, weatherReducer, WeatherState } from "./weatherSlice";

const composedEnhancer = composeWithDevTools(applyMiddleware(thunk));

const rootReducer = combineReducers({
  locations: locationsReducer,
  weather: weatherReducer,
});

export const store: Store<AppState, AppActions> & {
  dispatch: AppDispatch;
} = createStore(rootReducer, composedEnhancer);

export type AppState = {
  locations: LocationsState;
  weather: WeatherState;
};

export type AppActions = LocationsActions | WeatherActions;

export type AppDispatch = ThunkDispatch<AppState, unknown, AppActions>;
