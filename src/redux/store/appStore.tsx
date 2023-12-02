import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootState, { IAppState } from "../reducers/appReducer";
export interface IAppRootState {
  rootState: IAppState;
}

export default createStore(
  combineReducers<IAppRootState>({
    rootState,
  }),
  applyMiddleware(thunk)
);
