import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { countryAPI, reduxConstants, appActionTypes } from "../index";
import { IApiResult } from "../../../middleware/interface/commonInterface";
import {
  GetCountryDetailListFromJSON,
  ICountryDetails,
} from "../../../middleware/interface/others/countryInterface";
import { getAPIResponseWithMessage } from "../../../utils/CommonFuntions";

export const dispatchGetCountries = (
  apiresult: IApiResult,
  countryList: ICountryDetails[]
): appActionTypes.IGETCOUNTRIES => ({
  type: reduxConstants.GETCOUNTRIES,
  apiResult: apiresult,
  countryList: countryList,
});

export const GetCountries =
  (): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    let apiResult: IApiResult = {
      actionName: reduxConstants.GETCOUNTRIES,
      isSuccess: false,
      apiResponse: "",
    };
    countryAPI.GetCountries().then((res: any) => {
      if (res.isSuccess) {
        if (res.statusCode === 200) {
          apiResult.isSuccess = true;
          let countryList: ICountryDetails[] = GetCountryDetailListFromJSON(
            res.responseData
          );
          countryList = countryList.sort((a, b) =>
            a.countryid > b.countryid ? -1 : 1
          );
          dispatch(dispatchGetCountries(apiResult, countryList));
        } else {
          dispatch(
            dispatchGetCountries(getAPIResponseWithMessage(res, apiResult), [])
          );
        }
      } else {
        apiResult.apiResponse = res.responseData;
        dispatch(dispatchGetCountries(apiResult, []));
      }
    });
  };

export const dispatchSaveCountry = (
  apiresult: IApiResult
): appActionTypes.ISAVECOUNTRY => ({
  type: reduxConstants.SAVECOUNTRY,
  apiResult: apiresult,
});

export const SaveCountry =
  (
    countryDetails: ICountryDetails
  ): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    let apiResult: IApiResult = {
      actionName: reduxConstants.SAVECOUNTRY,
      isSuccess: false,
      apiResponse: "",
    };
    countryAPI.SaveCountry(countryDetails).then((res: any) => {
      if (res.isSuccess) {
        dispatch(
          dispatchSaveCountry(
            getAPIResponseWithMessage(
              res,
              apiResult,
              [200, 201],
              "Successfully save Country."
            )
          )
        );
      } else {
        apiResult.apiResponse = res.responseData;
        dispatch(dispatchSaveCountry(apiResult));
      }
    });
  };

export const dispatchDeleteCountry = (
  apiresult: IApiResult
): appActionTypes.IDELETECOUNTRY => ({
  type: reduxConstants.DELETECOUNTRY,
  apiResult: apiresult,
});

export const DeleteCountry =
  (countryid: number): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    let apiResult: IApiResult = {
      actionName: reduxConstants.DELETECOUNTRY,
      isSuccess: false,
      apiResponse: "",
    };
    countryAPI.DeleteCountry(countryid).then((res: any) => {
      if (res.isSuccess) {
        dispatch(
          dispatchDeleteCountry(
            getAPIResponseWithMessage(
              res,
              apiResult,
              [204],
              "Country deleted successfully."
            )
          )
        );
      } else {
        apiResult.apiResponse = res.responseData;
        dispatch(dispatchDeleteCountry(apiResult));
      }
    });
  };

export const dispatchSaveBulkCountry = (
  apiresult: IApiResult
): appActionTypes.ISAVEBULKCOUNTRY => ({
  type: reduxConstants.SAVEBULKCOUNTRY,
  apiResult: apiresult,
});

export const SaveBulkCountry =
  (csvFile: any): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    let apiResult: IApiResult = {
      actionName: reduxConstants.SAVEBULKCOUNTRY,
      isSuccess: false,
      apiResponse: "",
    };
    countryAPI.SaveBulkCountry(csvFile).then((res: any) => {
      if (res.isSuccess) {
        dispatch(
          dispatchSaveBulkCountry(
            getAPIResponseWithMessage(
              res,
              apiResult,
              [200],
              "Countries saved or updated successfully."
            )
          )
        );
      } else {
        apiResult.apiResponse = res.responseData;
        dispatch(dispatchSaveBulkCountry(apiResult));
      }
    });
  };
