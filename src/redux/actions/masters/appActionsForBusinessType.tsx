import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { businesstypeAPI, reduxConstants, appActionTypes } from "../index";
import { IApiResult } from "../../../middleware/interface/commonInterface";
import {
  GetBusinessTypeDetailListFromJSON,
  IBusinessTypeDetails,
} from "../../../middleware/interface/masters/businessTypeInterface";
import { getAPIResponseWithMessage } from "../../../utils/CommonFuntions";

export const dispatchGetBusinessTypes = (
  apiresult: IApiResult,
  businessTypeList: IBusinessTypeDetails[]
): appActionTypes.IGETBUSINESSTYPES => ({
  type: reduxConstants.GETBUSINESSTYPES,
  apiResult: apiresult,
  businessTypeList: businessTypeList,
});

export const GetAllBusinessTypes =
  (): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    let apiResult: IApiResult = {
      actionName: reduxConstants.GETBUSINESSTYPES,
      isSuccess: false,
      apiResponse: "",
    };
    businesstypeAPI.GetAllBusinessTypes().then((res: any) => {
      if (res.isSuccess) {
        if (res.statusCode === 200) {
          apiResult.isSuccess = true;
          let businesstypeList: IBusinessTypeDetails[] =
            GetBusinessTypeDetailListFromJSON(res.responseData);
          businesstypeList = businesstypeList.sort((a, b) =>
            a.bustypeid > b.bustypeid ? -1 : 1
          );
          dispatch(dispatchGetBusinessTypes(apiResult, businesstypeList));
        } else {
          dispatch(
            dispatchGetBusinessTypes(
              getAPIResponseWithMessage(res, apiResult),
              []
            )
          );
        }
      } else {
        apiResult.apiResponse = res.responseData;
        dispatch(dispatchGetBusinessTypes(apiResult, []));
      }
    });
  };

export const dispatchSaveBusinessType = (
  apiresult: IApiResult
): appActionTypes.ISAVEBUSINESSTYPE => ({
  type: reduxConstants.SAVEBUSINESSTYPE,
  apiResult: apiresult,
});

export const SaveBusinessType =
  (
    businesstypeDetails: IBusinessTypeDetails
  ): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    let apiResult: IApiResult = {
      actionName: reduxConstants.SAVEBUSINESSTYPE,
      isSuccess: false,
      apiResponse: "",
    };
    businesstypeAPI.SaveBusinessType(businesstypeDetails).then((res: any) => {
      if (res.isSuccess) {
        dispatch(
          dispatchSaveBusinessType(
            getAPIResponseWithMessage(
              res,
              apiResult,
              [200, 201],
              "Successfully save BusinessType."
            )
          )
        );
      } else {
        apiResult.apiResponse = res.responseData;
        dispatch(dispatchSaveBusinessType(apiResult));
      }
    });
  };

export const dispatchDeleteBusinessType = (
  apiresult: IApiResult
): appActionTypes.IDELETEBUSINESSTYPE => ({
  type: reduxConstants.DELETEBUSINESSTYPE,
  apiResult: apiresult,
});

export const DeleteBusinessType =
  (businesstypeid: number): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    let apiResult: IApiResult = {
      actionName: reduxConstants.DELETEBUSINESSTYPE,
      isSuccess: false,
      apiResponse: "",
    };
    businesstypeAPI.DeleteBusinessType(businesstypeid).then((res: any) => {
      if (res.isSuccess) {
        dispatch(
          dispatchDeleteBusinessType(
            getAPIResponseWithMessage(
              res,
              apiResult,
              [200],
              "BusinessType deleted successfully"
            )
          )
        );
      } else {
        apiResult.apiResponse = res.responseData;
        dispatch(dispatchDeleteBusinessType(apiResult));
      }
    });
  };

export const dispatchSaveBulkBusType = (
  apiresult: IApiResult
): appActionTypes.ISAVEBULKBUSTYPE => ({
  type: reduxConstants.SAVEBULKBUSTYPE,
  apiResult: apiresult,
});

export const SaveBulkBusType =
  (csvFile: any): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    let apiResult: IApiResult = {
      actionName: reduxConstants.SAVEBULKBUSTYPE,
      isSuccess: false,
      apiResponse: "",
    };
    businesstypeAPI.SaveBulkBusType(csvFile).then((res: any) => {
      if (res.isSuccess) {
        dispatch(
          dispatchSaveBulkBusType(
            getAPIResponseWithMessage(
              res,
              apiResult,
              [200],
              "Business Types saved or updated successfully."
            )
          )
        );
      } else {
        apiResult.apiResponse = res.responseData;
        dispatch(dispatchSaveBulkBusType(apiResult));
      }
    });
  };
