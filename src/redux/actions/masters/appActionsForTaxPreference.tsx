import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { taxpreferenceAPI, reduxConstants, appActionTypes } from "../index";
import { IApiResult } from "../../../middleware/interface/commonInterface";
import {
  GetTaxPreferenceDetailListFromJSON,
  ITaxPreferenceDetails,
} from "../../../middleware/interface/masters/taxpreferenceInterface";
import { getAPIResponseWithMessage } from "../../../utils/CommonFuntions";

export const dispatchGetTaxPreferences = (
  apiresult: IApiResult,
  taxPreferenceList: ITaxPreferenceDetails[]
): appActionTypes.IGETTAXPREFERENCES => ({
  type: reduxConstants.GETTAXPREFERENCES,
  apiResult: apiresult,
  taxPreferenceList: taxPreferenceList,
});

export const GetAllTaxPreferences =
  (): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    let apiResult: IApiResult = {
      actionName: reduxConstants.GETTAXPREFERENCES,
      isSuccess: false,
      apiResponse: "",
    };
    taxpreferenceAPI.GetAllTaxPreference().then((res: any) => {
      if (res.isSuccess) {
        if (res.statusCode === 200) {
          apiResult.isSuccess = true;
          let taxpreferenceList: ITaxPreferenceDetails[] =
            GetTaxPreferenceDetailListFromJSON(res.responseData);
          taxpreferenceList = taxpreferenceList.sort((a, b) =>
            a.taxprefid > b.taxprefid ? -1 : 1
          );
          dispatch(dispatchGetTaxPreferences(apiResult, taxpreferenceList));
        } else {
          dispatch(
            dispatchGetTaxPreferences(
              getAPIResponseWithMessage(res, apiResult),
              []
            )
          );
        }
      } else {
        apiResult.apiResponse = res.responseData;
        dispatch(dispatchGetTaxPreferences(apiResult, []));
      }
    });
  };

export const dispatchSaveTaxPreference = (
  apiresult: IApiResult
): appActionTypes.ISAVETAXPREFERENCE => ({
  type: reduxConstants.SAVETAXPREFERENCE,
  apiResult: apiresult,
});

export const SaveTaxPreference =
  (
    taxpreferenceDetails: ITaxPreferenceDetails
  ): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    let apiResult: IApiResult = {
      actionName: reduxConstants.SAVETAXPREFERENCE,
      isSuccess: false,
      apiResponse: "",
    };
    taxpreferenceAPI
      .SaveTaxPreference(taxpreferenceDetails)
      .then((res: any) => {
        if (res.isSuccess) {
          dispatch(
            dispatchSaveTaxPreference(
              getAPIResponseWithMessage(
                res,
                apiResult,
                [200, 201],
                "Successfully save TaxPreference."
              )
            )
          );
        } else {
          apiResult.apiResponse = res.responseData;
          dispatch(dispatchSaveTaxPreference(apiResult));
        }
      });
  };

export const dispatchDeleteTaxPreference = (
  apiresult: IApiResult
): appActionTypes.IDELETETAXPREFERENCE => ({
  type: reduxConstants.DELETETAXPREFERENCE,
  apiResult: apiresult,
});

export const DeleteTaxPreference =
  (taxpreferenceid: number): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    let apiResult: IApiResult = {
      actionName: reduxConstants.DELETETAXPREFERENCE,
      isSuccess: false,
      apiResponse: "",
    };
    taxpreferenceAPI.DeleteTaxPreference(taxpreferenceid).then((res: any) => {
      if (res.isSuccess) {
        dispatch(
          dispatchDeleteTaxPreference(
            getAPIResponseWithMessage(
              res,
              apiResult,
              [204],
              "TaxPreference deleted successfully."
            )
          )
        );
      } else {
        apiResult.apiResponse = res.responseData;
        dispatch(dispatchDeleteTaxPreference(apiResult));
      }
    });
  };