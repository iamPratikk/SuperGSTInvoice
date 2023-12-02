import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { gsttreatmentAPI, reduxConstants, appActionTypes } from "../index";
import { IApiResult } from "../../../middleware/interface/commonInterface";
import {
  GetGSTTreatmentDetailListFromJSON,
  IGSTTreatmentDetails,
} from "../../../middleware/interface/others/gstTreatmentInterface";
import { getAPIResponseWithMessage } from "../../../utils/CommonFuntions";

export const dispatchGetGSTTreatments = (
  apiresult: IApiResult,
  gsttreatmentList: IGSTTreatmentDetails[]
): appActionTypes.IGETGSTTREATMENTS => ({
  type: reduxConstants.GETGSTTREATMENTS,
  apiResult: apiresult,
  gsttreatmentList: gsttreatmentList,
});

export const GetGSTTreatments =
  (): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    let apiResult: IApiResult = {
      actionName: reduxConstants.GETGSTTREATMENTS,
      isSuccess: false,
      apiResponse: "",
    };
    gsttreatmentAPI.GetGSTTreatments().then((res: any) => {
      if (res.isSuccess) {
        if (res.statusCode === 200) {
          apiResult.isSuccess = true;
          let gsttreatmentList: IGSTTreatmentDetails[] =
            GetGSTTreatmentDetailListFromJSON(res.responseData);
          gsttreatmentList = gsttreatmentList.sort((a, b) =>
            a.gsttreatmentid > b.gsttreatmentid ? -1 : 1
          );
          dispatch(dispatchGetGSTTreatments(apiResult, gsttreatmentList));
        } else {
          dispatch(
            dispatchGetGSTTreatments(
              getAPIResponseWithMessage(res, apiResult),
              []
            )
          );
        }
      } else {
        apiResult.apiResponse = res.responseData;
        dispatch(dispatchGetGSTTreatments(apiResult, []));
      }
    });
  };

export const dispatchSaveGSTTreatment = (
  apiresult: IApiResult
): appActionTypes.ISAVEGSTTREATMENT => ({
  type: reduxConstants.SAVEGSTTREATMENT,
  apiResult: apiresult,
});

export const SaveGSTTreatment =
  (
    gsttreatmentDetails: IGSTTreatmentDetails
  ): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    let apiResult: IApiResult = {
      actionName: reduxConstants.SAVEGSTTREATMENT,
      isSuccess: false,
      apiResponse: "",
    };
    gsttreatmentAPI.SaveGSTTreatment(gsttreatmentDetails).then((res: any) => {
      if (res.isSuccess) {
        dispatch(
          dispatchSaveGSTTreatment(
            getAPIResponseWithMessage(
              res,
              apiResult,
              [200, 201],
              "Successfully save GST Treatment."
            )
          )
        );
      } else {
        apiResult.apiResponse = res.responseData;
        dispatch(dispatchSaveGSTTreatment(apiResult));
      }
    });
  };

export const dispatchDeleteGSTTreatment = (
  apiresult: IApiResult
): appActionTypes.IDELETEGSTTREATMENT => ({
  type: reduxConstants.DELETEGSTTREATMENT,
  apiResult: apiresult,
});

export const DeleteGSTTreatment =
  (gsttreatmentid: number): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    let apiResult: IApiResult = {
      actionName: reduxConstants.DELETEGSTTREATMENT,
      isSuccess: false,
      apiResponse: "",
    };
    gsttreatmentAPI.DeleteGSTTreatment(gsttreatmentid).then((res: any) => {
      if (res.isSuccess) {
        dispatch(
          dispatchDeleteGSTTreatment(
            getAPIResponseWithMessage(
              res,
              apiResult,
              [204],
              "GSTTreatment deleted successfully"
            )
          )
        );
      } else {
        apiResult.apiResponse = res.responseData;
        dispatch(dispatchDeleteGSTTreatment(apiResult));
      }
    });
  };

export const dispatchSaveBulkGSTTreatment = (
  apiresult: IApiResult
): appActionTypes.ISAVEBULKGSTTREATMENT => ({
  type: reduxConstants.SAVEBULKGSTTREATMENT,
  apiResult: apiresult,
});

export const SaveBulkGSTTreatment =
  (csvFile: any): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    let apiResult: IApiResult = {
      actionName: reduxConstants.SAVEBULKGSTTREATMENT,
      isSuccess: false,
      apiResponse: "",
    };
    gsttreatmentAPI.SaveBulkGSTTreatment(csvFile).then((res: any) => {
      if (res.isSuccess) {
        dispatch(
          dispatchSaveBulkGSTTreatment(
            getAPIResponseWithMessage(
              res,
              apiResult,
              [200],
              "GST Treatment saved or updated successfully."
            )
          )
        );
      } else {
        apiResult.apiResponse = res.responseData;
        dispatch(dispatchSaveBulkGSTTreatment(apiResult));
      }
    });
  };
