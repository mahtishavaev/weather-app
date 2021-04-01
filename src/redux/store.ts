import { applyMiddleware, combineReducers, createStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk, { ThunkDispatch } from "redux-thunk";
import { LocationsActions, locationsReducer, LocationsState } from "./locationsSlice";

const composedEnhancer = composeWithDevTools(applyMiddleware(thunk));

const rootReducer = combineReducers({
  locations: locationsReducer,
});

export const store: Store<AppState, AppActions> & {
  dispatch: AppDispatch;
} = createStore(rootReducer, composedEnhancer);

export type AppState = {
  locations: LocationsState;
};

export type AppActions = LocationsActions;

export type AppDispatch = ThunkDispatch<AppState, unknown, AppActions>;
