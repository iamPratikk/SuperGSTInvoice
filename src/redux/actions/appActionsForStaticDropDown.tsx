import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { reduxConstants, appActionTypes } from "./index";
import {
  IApiResult,
  DropDown,
} from "../../middleware/interface/commonInterface";

export const dispatchStartMonthList = (
  apiresult: IApiResult,
  startMonthList: DropDown[]
): appActionTypes.IGETSTARTMONTHLIST => ({
  type: reduxConstants.GETSTARTMONTHLIST,
  apiResult: apiresult,
  startMonthList: startMonthList,
});

export const GetStartMonthList =
  (): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    let apiResult: IApiResult = {
      actionName: reduxConstants.GETSTARTMONTHLIST,
      isSuccess: true,
      apiResponse: "",
    };
    const startMonthList: DropDown[] = [
      { Name: "January", Value: "1" },
      { Name: "Febrarary", Value: "2" },
      { Name: "March", Value: "3" },
      { Name: "April", Value: "4" },
      { Name: "May", Value: "5" },
      { Name: "June", Value: "6" },
      { Name: "July", Value: "7" },
      { Name: "August", Value: "8" },
      { Name: "September", Value: "9" },
      { Name: "October", Value: "10" },
      { Name: "November", Value: "11" },
      { Name: "December", Value: "12" },
    ];
    dispatch(dispatchStartMonthList(apiResult, startMonthList));
  };

export const dispatchGenderList = (
  apiresult: IApiResult,
  genderList: DropDown[]
): appActionTypes.IGETGENDERLIST => ({
  type: reduxConstants.GETGENDERLIST,
  apiResult: apiresult,
  genderList: genderList,
});

export const GetGenderList =
  (): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    let apiResult: IApiResult = {
      actionName: reduxConstants.GETGENDERLIST,
      isSuccess: true,
      apiResponse: "",
    };
    const startMonthList: DropDown[] = [
      { Name: "Male", Value: "M" },
      { Name: "Female", Value: "F" },
      { Name: "Either", Value: "E" },
    ];
    dispatch(dispatchGenderList(apiResult, startMonthList));
  };

export const dispatchDecimalList = (
  apiresult: IApiResult,
  decimalList: DropDown[]
): appActionTypes.IGETDECIMALLIST => ({
  type: reduxConstants.GETDECIMALLIST,
  apiResult: apiresult,
  decimalList: decimalList,
});

export const GetDecimalList =
  (): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    let apiResult: IApiResult = {
      actionName: reduxConstants.GETDECIMALLIST,
      isSuccess: true,
      apiResponse: "",
    };
    const decimalList: DropDown[] = [
      { Name: "2", Value: "2" },
      { Name: "4", Value: "4" },
      { Name: "6", Value: "6" },
    ];
    dispatch(dispatchDecimalList(apiResult, decimalList));
  };

export const dispatchFormatList = (
  apiresult: IApiResult,
  formatList: DropDown[]
): appActionTypes.IGETFORMATLIST => ({
  type: reduxConstants.GETFORMATLIST,
  apiResult: apiresult,
  formatList: formatList,
});

export const GetFormatList =
  (): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    let apiResult: IApiResult = {
      actionName: reduxConstants.GETFORMATLIST,
      isSuccess: true,
      apiResponse: "",
    };
    const decimalList: DropDown[] = [
      { Name: "98,76,543.21", Value: "1" },
      { Name: "9,876,543.21", Value: "2" },
      { Name: "98.76.543,21", Value: "3" },
      { Name: "9.876.543,21", Value: "4" },
    ];
    dispatch(dispatchFormatList(apiResult, decimalList));
  };

export const dispatchUploadMasterTypeList = (
  apiresult: IApiResult,
  uploadMasterlistList: DropDown[]
): appActionTypes.IUPLOADMASTERTYPELIST => ({
  type: reduxConstants.UPLOADMASTERTYPELIST,
  apiResult: apiresult,
  uploadMasterlistList: uploadMasterlistList,
});

export const GetUploadMasterTypeList =
  (): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    let apiResult: IApiResult = {
      actionName: reduxConstants.UPLOADMASTERTYPELIST,
      isSuccess: true,
      apiResponse: "",
    };
    const uploadMasterlistList: DropDown[] = [
      { Name: "Country", Value: "1" },
      { Name: "State", Value: "2" },
      { Name: "Currency", Value: "3" },
      { Name: "HSN/SAC", Value: "4" },
      { Name: "Industry Type", Value: "5" },
      { Name: "Business Type", Value: "6" },
      { Name: "Language", Value: "7" },
      { Name: "GST Treatment", Value: "8" },
    ];
    dispatch(dispatchUploadMasterTypeList(apiResult, uploadMasterlistList));
  };
