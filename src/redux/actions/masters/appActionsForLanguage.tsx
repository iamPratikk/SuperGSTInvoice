import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { languageAPI, reduxConstants, appActionTypes } from "../index";
import { IApiResult } from "../../../middleware/interface/commonInterface";
import {
  GetLanguageDetailListFromJSON,
  ILanguageDetails,
} from "../../../middleware/interface/masters/languageInterface";
import { getAPIResponseWithMessage } from "../../../utils/CommonFuntions";

export const dispatchGetLanguages = (
  apiresult: IApiResult,
  languageList: ILanguageDetails[]
): appActionTypes.IGETLANGUAGES => ({
  type: reduxConstants.GETLANGUAGES,
  apiResult: apiresult,
  languageList: languageList,
});

export const GetAllLanguages =
  (): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
    async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      let apiResult: IApiResult = {
        actionName: reduxConstants.GETLANGUAGES,
        isSuccess: false,
        apiResponse: "",
      };
      languageAPI.GetAllLanguages().then((res: any) => {
        if (res.isSuccess) {
          if (res.statusCode === 200) {
            apiResult.isSuccess = true;
            let languageList: ILanguageDetails[] = GetLanguageDetailListFromJSON(
              res.responseData
            );
            languageList = languageList.sort((a, b) =>
              a.langcode > b.langcode ? -1 : 1
            );
            dispatch(dispatchGetLanguages(apiResult, languageList));
          } else {
            dispatch(dispatchGetLanguages(getAPIResponseWithMessage(res, apiResult), []));
          }
        } else {
          apiResult.apiResponse = res.responseData;
          dispatch(dispatchGetLanguages(apiResult, []));
        }
      });
    };

export const dispatchSaveLanguage = (
  apiresult: IApiResult
): appActionTypes.ISAVELANGUAGE => ({
  type: reduxConstants.SAVELANGUAGE,
  apiResult: apiresult,
});

export const SaveLanguage =
  (
    languageDetails: ILanguageDetails
  ): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
    async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      let apiResult: IApiResult = {
        actionName: reduxConstants.SAVELANGUAGE,
        isSuccess: false,
        apiResponse: "",
      };
      languageAPI.SaveLanguage(languageDetails).then((res: any) => {
        if (res.isSuccess) {
          dispatch(
            dispatchSaveLanguage(
              getAPIResponseWithMessage(
                res,
                apiResult,
                [200, 201],
                "Successfully save Language."
              )
            )
          );
        } else {
          apiResult.apiResponse = res.responseData;
          dispatch(dispatchSaveLanguage(apiResult));
        }
      });
    };

export const dispatchDeleteLanguage = (
  apiresult: IApiResult
): appActionTypes.IDELETELANGUAGE => ({
  type: reduxConstants.DELETELANGUAGE,
  apiResult: apiresult,
});

export const DeleteLanguage =
  (langcode: string): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
    async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      let apiResult: IApiResult = {
        actionName: reduxConstants.DELETELANGUAGE,
        isSuccess: false,
        apiResponse: "",
      };
      languageAPI.DeleteLanguage(langcode).then((res: any) => {
        if (res.isSuccess) {
          dispatch(
            dispatchDeleteLanguage(
              getAPIResponseWithMessage(
                res,
                apiResult,
                [204],
                "Language deleted successfully."
              )
            )
          );
        } else {
          apiResult.apiResponse = res.responseData;
          dispatch(dispatchDeleteLanguage(apiResult));
        }
      });
    };

export const dispatchSaveBulkLanguage = (
  apiresult: IApiResult
): appActionTypes.ISAVEBULKLANGUAGE => ({
  type: reduxConstants.SAVEBULKLANGUAGE,
  apiResult: apiresult,
});

export const SaveBulkLanguage =
  (csvFile: any): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
    async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      let apiResult: IApiResult = {
        actionName: reduxConstants.SAVEBULKLANGUAGE,
        isSuccess: false,
        apiResponse: "",
      };
      languageAPI.SaveBulkLanguage(csvFile).then((res: any) => {
        if (res.isSuccess) {
          dispatch(
            dispatchSaveBulkLanguage(
              getAPIResponseWithMessage(
                res,
                apiResult,
                [200],
                "Language saved or updated successfully."
              )
            )
          );
        } else {
          apiResult.apiResponse = res.responseData;
          dispatch(dispatchSaveBulkLanguage(apiResult));
        }
      });
    };
