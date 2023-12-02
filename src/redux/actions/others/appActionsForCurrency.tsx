import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { currencyAPI, reduxConstants, appActionTypes } from "../index";
import { IApiResult } from "../../../middleware/interface/commonInterface";
import {
  GetCurrencyDetailListFromJSON,
  ICurrencyDetails,
} from "../../../middleware/interface/others/currencyInterface";
import { getAPIResponseWithMessage } from "../../../utils/CommonFuntions";

export const dispatchGetCountries = (
  apiresult: IApiResult,
  currencyList: ICurrencyDetails[]
): appActionTypes.IGETBASECURRENCIES => ({
  type: reduxConstants.GETBASECURRENCIES,
  apiResult: apiresult,
  currencyList: currencyList,
});

export const GetCurrencies =
  (): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    let apiResult: IApiResult = {
      actionName: reduxConstants.GETBASECURRENCIES,
      isSuccess: false,
      apiResponse: "",
    };
    currencyAPI.GetCurrencies().then((res: any) => {
      if (res.isSuccess) {
        if (res.statusCode === 200) {
          apiResult.isSuccess = true;
          let currencyList: ICurrencyDetails[] = GetCurrencyDetailListFromJSON(
            res.responseData
          );
          currencyList = currencyList.sort((a, b) =>
            a.currencycode > b.currencycode ? -1 : 1
          );
          dispatch(dispatchGetCountries(apiResult, currencyList));
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

export const dispatchGetCountrieByCode = (
  apiresult: IApiResult,
  currencyDetails: ICurrencyDetails
): appActionTypes.IGETBASECURRENCIEBYCODE => ({
  type: reduxConstants.GETBASECURRENCIEBYCODE,
  apiResult: apiresult,
  currencyDetails: currencyDetails,
});

export const GetCountrieByCode =
  (currencycode: string): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    let apiResult: IApiResult = {
      actionName: reduxConstants.GETBASECURRENCIEBYCODE,
      isSuccess: false,
      apiResponse: "",
    };
    currencyAPI.GetCurrenciesByCode(currencycode).then((res: any) => {
      if (res.isSuccess) {
        if (res.statusCode === 200) {
          apiResult.isSuccess = true;
          dispatch(dispatchGetCountrieByCode(apiResult, res.responseData));
        } else {
          dispatch(
            dispatchGetCountrieByCode(
              getAPIResponseWithMessage(res, apiResult),
              null
            )
          );
        }
      } else {
        apiResult.apiResponse = res.responseData;
        dispatch(dispatchGetCountrieByCode(apiResult, null));
      }
    });
  };

export const dispatchSaveBaseCurrency = (
  apiresult: IApiResult
): appActionTypes.ISAVEBASECURRENCY => ({
  type: reduxConstants.SAVEBASECURRENCY,
  apiResult: apiresult,
});

export const SaveBaseCurrency =
  (
    currencyDetails: ICurrencyDetails
  ): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    let apiResult: IApiResult = {
      actionName: reduxConstants.SAVEBASECURRENCY,
      isSuccess: false,
      apiResponse: "",
    };
    currencyAPI.SaveBaseCurrency(currencyDetails).then((res: any) => {
      if (res.isSuccess) {
        dispatch(
          dispatchSaveBaseCurrency(
            getAPIResponseWithMessage(
              res,
              apiResult,
              [200, 201],
              "Successfully save Currency."
            )
          )
        );
      } else {
        apiResult.apiResponse = res.responseData;
        dispatch(dispatchSaveBaseCurrency(apiResult));
      }
    });
  };

export const dispatchDeleteCurrency = (
  apiresult: IApiResult
): appActionTypes.IDELETEBASECURRENCY => ({
  type: reduxConstants.DELETEBASECURRENCY,
  apiResult: apiresult,
});

export const DeleteCurrency =
  (currencycode: string): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    let apiResult: IApiResult = {
      actionName: reduxConstants.DELETEBASECURRENCY,
      isSuccess: false,
      apiResponse: "",
    };
    currencyAPI.DeleteCurrency(currencycode).then((res: any) => {
      if (res.isSuccess) {
        dispatch(
          dispatchDeleteCurrency(
            getAPIResponseWithMessage(
              res,
              apiResult,
              [204],
              "Currency deleted successfully"
            )
          )
        );
      } else {
        apiResult.apiResponse = res.responseData;
        dispatch(dispatchDeleteCurrency(apiResult));
      }
    });
  };

export const dispatchSaveBulkCurrency = (
  apiresult: IApiResult
): appActionTypes.ISAVEBULKCURRENCIES => ({
  type: reduxConstants.SAVEBULKCURRENCIES,
  apiResult: apiresult,
});

export const SaveBulkCurrency =
  (csvFile: any): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    let apiResult: IApiResult = {
      actionName: reduxConstants.SAVEBULKCURRENCIES,
      isSuccess: false,
      apiResponse: "",
    };
    currencyAPI.SaveBulkCurrency(csvFile).then((res: any) => {
      if (res.isSuccess) {
        dispatch(
          dispatchSaveBulkCurrency(
            getAPIResponseWithMessage(
              res,
              apiResult,
              [200],
              "Currencies saved or updated successfully."
            )
          )
        );
      } else {
        apiResult.apiResponse = res.responseData;
        dispatch(dispatchSaveBulkCurrency(apiResult));
      }
    });
  };
