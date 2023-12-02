import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { stateAPI, reduxConstants, appActionTypes } from "../index";
import { IApiResult } from "../../../middleware/interface/commonInterface";
import {
  GetStateDetailListFromJSON,
  IStateDetails,
} from "../../../middleware/interface/others/stateInterface";
import { getAPIResponseWithMessage } from "../../../utils/CommonFuntions";

export const dispatchGetStates = (
  apiresult: IApiResult,
  stateList: IStateDetails[]
): appActionTypes.IGETSTATES => ({
  type: reduxConstants.GETSTATES,
  apiResult: apiresult,
  stateList: stateList,
});

export const GetAllStates =
  (): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    let apiResult: IApiResult = {
      actionName: reduxConstants.GETSTATES,
      isSuccess: false,
      apiResponse: "",
    };
    stateAPI.GetAllStates().then((res: any) => {
      if (res.isSuccess) {
        if (res.statusCode === 200) {
          apiResult.isSuccess = true;
          let stateList: IStateDetails[] = GetStateDetailListFromJSON(
            res.responseData
          );
          stateList = stateList.sort((a, b) =>
            a.stateid > b.stateid ? -1 : 1
          );
          dispatch(dispatchGetStates(apiResult, stateList));
        } else {
          dispatch(
            dispatchGetStates(getAPIResponseWithMessage(res, apiResult), [])
          );
        }
      } else {
        apiResult.apiResponse = res.responseData;
        dispatch(dispatchGetStates(apiResult, []));
      }
    });
  };

export const GetStates =
  (countryid: number): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    let apiResult: IApiResult = {
      actionName: reduxConstants.GETSTATES,
      isSuccess: false,
      apiResponse: "",
    };
    stateAPI.GetStates(countryid).then((res: any) => {
      if (res.isSuccess) {
        if (res.statusCode === 200) {
          apiResult.isSuccess = true;
          let stateList: IStateDetails[] = GetStateDetailListFromJSON(
            res.responseData
          );
          stateList = stateList.sort((a, b) =>
            a.stateid > b.stateid ? -1 : 1
          );
          dispatch(dispatchGetStates(apiResult, stateList));
        } else {
          dispatch(
            dispatchGetStates(getAPIResponseWithMessage(res, apiResult), [])
          );
        }
      } else {
        apiResult.apiResponse = res.responseData;
        dispatch(dispatchGetStates(apiResult, []));
      }
    });
  };

export const dispatchSaveState = (
  apiresult: IApiResult
): appActionTypes.ISAVESTATE => ({
  type: reduxConstants.SAVESTATE,
  apiResult: apiresult,
});

export const SaveState =
  (
    stateDetails: IStateDetails
  ): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    let apiResult: IApiResult = {
      actionName: reduxConstants.SAVESTATE,
      isSuccess: false,
      apiResponse: "",
    };
    stateAPI.SaveState(stateDetails).then((res: any) => {
      if (res.isSuccess) {
        dispatch(
          dispatchSaveState(
            getAPIResponseWithMessage(
              res,
              apiResult,
              [200, 201],
              "Successfully save State."
            )
          )
        );
      } else {
        apiResult.apiResponse = res.responseData;
        dispatch(dispatchSaveState(apiResult));
      }
    });
  };

export const dispatchDeleteState = (
  apiresult: IApiResult
): appActionTypes.IDELETESTATE => ({
  type: reduxConstants.DELETESTATE,
  apiResult: apiresult,
});

export const DeleteState =
  (stateid: number): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    let apiResult: IApiResult = {
      actionName: reduxConstants.DELETESTATE,
      isSuccess: false,
      apiResponse: "",
    };
    stateAPI.DeleteState(stateid).then((res: any) => {
      if (res.isSuccess) {
        dispatch(
          dispatchDeleteState(
            getAPIResponseWithMessage(
              res,
              apiResult,
              [204],
              "State deleted successfully"
            )
          )
        );
      } else {
        apiResult.apiResponse = res.responseData;
        dispatch(dispatchDeleteState(apiResult));
      }
    });
  };
export const dispatchSaveBulkStates = (
  apiresult: IApiResult
): appActionTypes.ISAVEBULKSTATES => ({
  type: reduxConstants.SAVEBULKSTATES,
  apiResult: apiresult,
});

export const SaveBulkStates =
  (csvFile: any): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    let apiResult: IApiResult = {
      actionName: reduxConstants.SAVEBULKSTATES,
      isSuccess: false,
      apiResponse: "",
    };
    stateAPI.SaveBulkStates(csvFile).then((res: any) => {
      if (res.isSuccess) {
        dispatch(
          dispatchSaveBulkStates(
            getAPIResponseWithMessage(
              res,
              apiResult,
              [200],
              "States saved or updated successfully."
            )
          )
        );
      } else {
        apiResult.apiResponse = res.responseData;
        dispatch(dispatchSaveBulkStates(apiResult));
      }
    });
  };
