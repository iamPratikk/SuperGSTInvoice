import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { hsnCodeAPI, reduxConstants, appActionTypes } from "../index";
import { IApiResult } from "../../../middleware/interface/commonInterface";
import { GetHsnCodeDetailListFromJSON } from "../../../middleware/interface/others/hsnCodeInterface";
import { IHsnCodeDetails } from "../../../middleware/interface/others/hsnCodeInterface";
import { getAPIResponseWithMessage } from "../../../utils/CommonFuntions";

export const dispatchGetHsnCodes = (
  apiresult: IApiResult,
  hsnCodeList: IHsnCodeDetails[]
): appActionTypes.IGETHSNCODES => ({
  type: reduxConstants.GETHSNCODES,
  apiResult: apiresult,
  hsnCodeList: hsnCodeList,
});

export const GetAllHsnCodes =
  (): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    let apiResult: IApiResult = {
      actionName: reduxConstants.GETHSNCODES,
      isSuccess: false,
      apiResponse: "",
    };
    hsnCodeAPI.GetAllHsnCodes().then((res: any) => {
      if (res.isSuccess) {
        if (res.statusCode === 200) {
          apiResult.isSuccess = true;
          let stateList: IHsnCodeDetails[] = GetHsnCodeDetailListFromJSON(
            res.responseData
          );
          stateList = stateList.sort((a, b) =>
            a.hsncode > b.hsncode ? -1 : 1
          );
          dispatch(dispatchGetHsnCodes(apiResult, stateList));
        } else {
          dispatch(
            dispatchGetHsnCodes(getAPIResponseWithMessage(res, apiResult), [])
          );
        }
      } else {
        apiResult.apiResponse = res.responseData;
        dispatch(dispatchGetHsnCodes(apiResult, []));
      }
    });
  };

export const dispatchSaveHsnCode = (
  apiresult: IApiResult
): appActionTypes.ISAVEHSNCODE => ({
  type: reduxConstants.SAVEHSNCODE,
  apiResult: apiresult,
});

export const SaveHsnCode =
  (
    stateDetails: IHsnCodeDetails
  ): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    let apiResult: IApiResult = {
      actionName: reduxConstants.SAVEHSNCODE,
      isSuccess: false,
      apiResponse: "",
    };
    hsnCodeAPI.SaveHsnCode(stateDetails).then((res: any) => {
      if (res.isSuccess) {
        dispatch(
          dispatchSaveHsnCode(
            getAPIResponseWithMessage(
              res,
              apiResult,
              [200, 201],
              "Successfully save HsnCode."
            )
          )
        );
      } else {
        apiResult.apiResponse = res.responseData;
        dispatch(dispatchSaveHsnCode(apiResult));
      }
    });
  };

export const dispatchDeleteHsnCode = (
  apiresult: IApiResult
): appActionTypes.IDELETEHSNCODE => ({
  type: reduxConstants.DELETEHSNCODE,
  apiResult: apiresult,
});

export const DeleteHsnCode =
  (hsncode: number): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    let apiResult: IApiResult = {
      actionName: reduxConstants.DELETEHSNCODE,
      isSuccess: false,
      apiResponse: "",
    };
    hsnCodeAPI.DeleteHsnCode(hsncode).then((res: any) => {
      if (res.isSuccess) {
        dispatch(
          dispatchDeleteHsnCode(
            getAPIResponseWithMessage(
              res,
              apiResult,
              [204],
              "HsnCode deleted successfully."
            )
          )
        );
      } else {
        apiResult.apiResponse = res.responseData;
        dispatch(dispatchDeleteHsnCode(apiResult));
      }
    });
  };

export const dispatchSaveBulkHSNCode = (
  apiresult: IApiResult
): appActionTypes.ISAVEBULKHSNCODE => ({
  type: reduxConstants.SAVEBULKHSNCODE,
  apiResult: apiresult,
});

export const SaveBulkHSNCode =
  (csvFile: any): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    let apiResult: IApiResult = {
      actionName: reduxConstants.SAVEBULKHSNCODE,
      isSuccess: false,
      apiResponse: "",
    };
    hsnCodeAPI.SaveBulkHSNCode(csvFile).then((res: any) => {
      if (res.isSuccess) {
        dispatch(
          dispatchSaveBulkHSNCode(
            getAPIResponseWithMessage(
              res,
              apiResult,
              [200],
              "HSN/SAC Codes saved or updated successfully."
            )
          )
        );
      } else {
        apiResult.apiResponse = res.responseData;
        dispatch(dispatchSaveBulkHSNCode(apiResult));
      }
    });
  };
