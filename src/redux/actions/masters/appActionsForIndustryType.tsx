import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { industrytypeAPI, reduxConstants, appActionTypes } from "../index";
import { IApiResult } from "../../../middleware/interface/commonInterface";
import {
  GetIndustryTypeDetailListFromJSON,
  IIndustryTypeDetails,
} from "../../../middleware/interface/masters/industryTypeInterface";
import { getAPIResponseWithMessage } from "../../../utils/CommonFuntions";

export const dispatchGetIndustryTypes = (
  apiresult: IApiResult,
  industryTypeList: IIndustryTypeDetails[]
): appActionTypes.IGETINDUSTRYTYPES => ({
  type: reduxConstants.GETINDUSTRYTYPES,
  apiResult: apiresult,
  industryTypeList: industryTypeList,
});

export const GetAllIndustryTypes =
  (): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    let apiResult: IApiResult = {
      actionName: reduxConstants.GETINDUSTRYTYPES,
      isSuccess: false,
      apiResponse: "",
    };
    industrytypeAPI.GetAllIndustryTypes().then((res: any) => {
      if (res.isSuccess) {
        if (res.statusCode === 200) {
          apiResult.isSuccess = true;
          let industrytypeList: IIndustryTypeDetails[] =
            GetIndustryTypeDetailListFromJSON(res.responseData);
          industrytypeList = industrytypeList.sort((a, b) =>
            a.indtypeid > b.indtypeid ? -1 : 1
          );
          dispatch(dispatchGetIndustryTypes(apiResult, industrytypeList));
        } else {
          dispatch(
            dispatchGetIndustryTypes(
              getAPIResponseWithMessage(res, apiResult),
              []
            )
          );
        }
      } else {
        apiResult.apiResponse = res.responseData;
        dispatch(dispatchGetIndustryTypes(apiResult, []));
      }
    });
  };

export const dispatchSaveIndustryType = (
  apiresult: IApiResult
): appActionTypes.ISAVEINDUSTRYTYPE => ({
  type: reduxConstants.SAVEINDUSTRYTYPE,
  apiResult: apiresult,
});

export const SaveIndustryType =
  (
    industrytypeDetails: IIndustryTypeDetails
  ): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    let apiResult: IApiResult = {
      actionName: reduxConstants.SAVEINDUSTRYTYPE,
      isSuccess: false,
      apiResponse: "",
    };
    industrytypeAPI.SaveIndustryType(industrytypeDetails).then((res: any) => {
      if (res.isSuccess) {
        dispatch(
          dispatchSaveIndustryType(
            getAPIResponseWithMessage(
              res,
              apiResult,
              [200, 201],
              "Successfully save IndustryType."
            )
          )
        );
      } else {
        apiResult.apiResponse = res.responseData;
        dispatch(dispatchSaveIndustryType(apiResult));
      }
    });
  };

export const dispatchDeleteIndustryType = (
  apiresult: IApiResult
): appActionTypes.IDELETEINDUSTRYTYPE => ({
  type: reduxConstants.DELETEINDUSTRYTYPE,
  apiResult: apiresult,
});

export const DeleteIndustryType =
  (industrytypeid: number): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    let apiResult: IApiResult = {
      actionName: reduxConstants.DELETEINDUSTRYTYPE,
      isSuccess: false,
      apiResponse: "",
    };
    industrytypeAPI.DeleteIndustryType(industrytypeid).then((res: any) => {
      if (res.isSuccess) {
        dispatch(
          dispatchDeleteIndustryType(
            getAPIResponseWithMessage(
              res,
              apiResult,
              [204],
              "IndustryType deleted successfully."
            )
          )
        );
      } else {
        apiResult.apiResponse = res.responseData;
        dispatch(dispatchDeleteIndustryType(apiResult));
      }
    });
  };

export const dispatchSaveBulkIndustryType = (
  apiresult: IApiResult
): appActionTypes.ISAVEBULKINDUSTRYTYPE => ({
  type: reduxConstants.SAVEBULKINDUSTRYTYPE,
  apiResult: apiresult,
});

export const SaveBulkIndustryType =
  (csvFile: any): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    let apiResult: IApiResult = {
      actionName: reduxConstants.SAVEBULKINDUSTRYTYPE,
      isSuccess: false,
      apiResponse: "",
    };
    industrytypeAPI.SaveBulkIndustryType(csvFile).then((res: any) => {
      if (res.isSuccess) {
        dispatch(
          dispatchSaveBulkIndustryType(
            getAPIResponseWithMessage(
              res,
              apiResult,
              [200],
              "Industry Type saved or updated successfully."
            )
          )
        );
      } else {
        apiResult.apiResponse = res.responseData;
        dispatch(dispatchSaveBulkIndustryType(apiResult));
      }
    });
  };
