import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { dateformatAPI, reduxConstants, appActionTypes } from "../index";
import { IApiResult } from "../../../middleware/interface/commonInterface";
import {
  GetDateFormatDetailListFromJSON,
  IDateFormatDetails,
} from "../../../middleware/interface/masters/dateFormatInterface";
import { getAPIResponseWithMessage } from "../../../utils/CommonFuntions";

export const dispatchGetDateFormats = (
  apiresult: IApiResult,
  dateFormatList: IDateFormatDetails[]
): appActionTypes.IGETDATEFORMATS => ({
  type: reduxConstants.GETDATEFORMATS,
  apiResult: apiresult,
  dateFormatList: dateFormatList,
});

export const GetAllDateFormats =
  (): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    let apiResult: IApiResult = {
      actionName: reduxConstants.GETDATEFORMATS,
      isSuccess: false,
      apiResponse: "",
    };
    dateformatAPI.GetAllDateFormats().then((res: any) => {
      if (res.isSuccess) {
        if (res.statusCode === 200) {
          apiResult.isSuccess = true;
          let dateFormatList: IDateFormatDetails[] =
            GetDateFormatDetailListFromJSON(res.responseData);
          dateFormatList = dateFormatList.sort((a, b) =>
            a.dateformatid > b.dateformatid ? -1 : 1
          );
          dispatch(dispatchGetDateFormats(apiResult, dateFormatList));
        } else {
          dispatch(
            dispatchGetDateFormats(
              getAPIResponseWithMessage(res, apiResult),
              []
            )
          );
        }
      } else {
        apiResult.apiResponse = res.responseData;
        dispatch(dispatchGetDateFormats(apiResult, []));
      }
    });
  };

export const dispatchSaveDateFormat = (
  apiresult: IApiResult
): appActionTypes.ISAVEDATEFORMAT => ({
  type: reduxConstants.SAVEDATEFORMAT,
  apiResult: apiresult,
});

export const SaveDateFormat =
  (
    dateformatDetails: IDateFormatDetails
  ): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    let apiResult: IApiResult = {
      actionName: reduxConstants.SAVEDATEFORMAT,
      isSuccess: false,
      apiResponse: "",
    };
    dateformatAPI.SaveDateFormat(dateformatDetails).then((res: any) => {
      if (res.isSuccess) {
        dispatch(
          dispatchSaveDateFormat(
            getAPIResponseWithMessage(
              res,
              apiResult,
              [201],
              "Date Format created or updated successfully"
            )
          )
        );
      } else {
        apiResult.apiResponse = res.responseData;
        dispatch(dispatchSaveDateFormat(apiResult));
      }
    });
  };

export const dispatchDeleteDateFormat = (
  apiresult: IApiResult
): appActionTypes.IDELETEDATEFORMAT => ({
  type: reduxConstants.DELETEDATEFORMAT,
  apiResult: apiresult,
});

export const DeleteDateFormat =
  (dateformatid: number): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    let apiResult: IApiResult = {
      actionName: reduxConstants.DELETEDATEFORMAT,
      isSuccess: false,
      apiResponse: "",
    };
    dateformatAPI.DeleteDateFormat(dateformatid).then((res: any) => {
      if (res.isSuccess) {
        dispatch(
          dispatchDeleteDateFormat(
            getAPIResponseWithMessage(
              res,
              apiResult,
              [204],
              "DateFormat deleted successfully."
            )
          )
        );
      } else {
        apiResult.apiResponse = res.responseData;
        dispatch(dispatchDeleteDateFormat(apiResult));
      }
    });
  };
