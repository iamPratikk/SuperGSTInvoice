import { combineReducers } from "redux";
import { IAppCommonState, appCommonState } from "./appCommonState";

export interface IAppState {
  appCommonState: IAppCommonState;
}

export default combineReducers<IAppState>({
  appCommonState,
});
