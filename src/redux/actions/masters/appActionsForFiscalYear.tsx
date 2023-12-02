import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { fiscalyearAPI, reduxConstants, appActionTypes } from "../index";
import { IApiResult } from "../../../middleware/interface/commonInterface";
import {
  GetFiscalYearDetailListFromJSON,
  IFiscalYearDetails,
} from "../../../middleware/interface/masters/fiscalYearInterface";
import { getAPIResponseWithMessage } from "../../../utils/CommonFuntions";

export const dispatchGetFiscalYears = (
  apiresult: IApiResult,
  fiscalYearList: IFiscalYearDetails[]
): appActionTypes.IGETFISCALYEARS => ({
  type: reduxConstants.GETFISCALYEARS,
  apiResult: apiresult,
  fiscalYearList: fiscalYearList,
});

export const GetAllFiscalYears =
  (): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    let apiResult: IApiResult = {
      actionName: reduxConstants.GETFISCALYEARS,
      isSuccess: false,
      apiResponse: "",
    };
    fiscalyearAPI.GetAllFiscalYears().then((res: any) => {
      if (res.isSuccess) {
        if (res.statusCode === 200) {
          apiResult.isSuccess = true;
          let fiscalYearList: IFiscalYearDetails[] =
            GetFiscalYearDetailListFromJSON(res.responseData);
          fiscalYearList = fiscalYearList.sort((a, b) =>
            a.fiscalid > b.fiscalid ? -1 : 1
          );
          dispatch(dispatchGetFiscalYears(apiResult, fiscalYearList));
        } else {
          dispatch(
            dispatchGetFiscalYears(
              getAPIResponseWithMessage(res, apiResult),
              []
            )
          );
        }
      } else {
        apiResult.apiResponse = res.responseData;
        dispatch(dispatchGetFiscalYears(apiResult, []));
      }
    });
  };

export const dispatchSaveFiscalYear = (
  apiresult: IApiResult
): appActionTypes.ISAVEFISCALYEAR => ({
  type: reduxConstants.SAVEFISCALYEAR,
  apiResult: apiresult,
});

export const SaveFiscalYear =
  (
    fiscalyearDetails: IFiscalYearDetails
  ): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    let apiResult: IApiResult = {
      actionName: reduxConstants.SAVEFISCALYEAR,
      isSuccess: false,
      apiResponse: "",
    };
    fiscalyearAPI.SaveFiscalYear(fiscalyearDetails).then((res: any) => {
      if (res.isSuccess) {
        dispatch(
          dispatchSaveFiscalYear(
            getAPIResponseWithMessage(
              res,
              apiResult,
              [200, 201],
              "Successfully save Fiscal Year."
            )
          )
        );
      } else {
        apiResult.apiResponse = res.responseData;
        dispatch(dispatchSaveFiscalYear(apiResult));
      }
    });
  };

export const dispatchDeleteFiscalYear = (
  apiresult: IApiResult
): appActionTypes.IDELETEFISCALYEAR => ({
  type: reduxConstants.DELETEFISCALYEAR,
  apiResult: apiresult,
});

export const DeleteFiscalYear =
  (fiscalyearid: number): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    let apiResult: IApiResult = {
      actionName: reduxConstants.DELETEFISCALYEAR,
      isSuccess: false,
      apiResponse: "",
    };
    fiscalyearAPI.DeleteFiscalYear(fiscalyearid).then((res: any) => {
      if (res.isSuccess) {
        dispatch(
          dispatchDeleteFiscalYear(
            getAPIResponseWithMessage(
              res,
              apiResult,
              [204],
              "Fiscal Year deleted successfully."
            )
          )
        );
      } else {
        apiResult.apiResponse = res.responseData;
        dispatch(dispatchDeleteFiscalYear(apiResult));
      }
    });
  };
