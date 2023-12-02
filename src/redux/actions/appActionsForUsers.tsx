import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { usersAPI, reduxConstants, appActionTypes } from "./index";
import { IApiResult } from "../../middleware/interface/commonInterface";
import {
  DefaultUserDetails,
  GetUserDetailListFromJSON,
  GetUserDetailsFromJSON,
  IUserDetails,
} from "../../middleware/interface/userInterface";
import { getAPIResponseWithMessage } from "../../utils/CommonFuntions";
export const dispatchCheckCred = (
  apiresult: IApiResult,
  userid: number,
  isweb: boolean
): appActionTypes.ICHECKCRED => ({
  type: reduxConstants.CHECKCRED,
  apiResult: apiresult,
  userId: userid,
  isweb: isweb,
});

export const CheckCred =
  (
    userind: string,
    password: string,
    isweb: boolean
  ): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    let apiResult: IApiResult = {
      actionName: reduxConstants.CHECKCRED,
      isSuccess: true,
      apiResponse: "",
    };
    usersAPI.CheckCred(userind, password).then((res: any) => {
      if (res.isSuccess) {
        if (res.statusCode === 200) {
          let userid: number = res.responseData.userid;
          if (userid === 0) {
            apiResult.apiResponse = "Invalid user credencital";
            dispatch(dispatchCheckCred(apiResult, 0, isweb));
          } else {
            apiResult.isSuccess = true;
            dispatch(dispatchCheckCred(apiResult, userid, isweb));
          }
        } else if (res.statusCode === 400) {
          apiResult.apiResponse = "Invalid request or missing parameters";
          dispatch(dispatchCheckCred(apiResult, 0, isweb));
        } else if (res.statusCode === 500) {
          apiResult.apiResponse = "Internal server error";
          dispatch(dispatchCheckCred(apiResult, 0, isweb));
        } else {
          apiResult.apiResponse = "Invalid user credencital";
          dispatch(dispatchCheckCred(apiResult, 0, isweb));
        }
      } else {
        apiResult.apiResponse = res.responseData;
        dispatch(dispatchCheckCred(apiResult, 0, isweb));
      }
    });
  };

export const dispatchGetUserDet = (
  apiresult: IApiResult,
  userDetails: IUserDetails
): appActionTypes.IGETUSERDET => ({
  type: reduxConstants.GETUSERDET,
  apiResult: apiresult,
  userDetails: userDetails,
});

export const GetUserDet =
  (userid: number): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    let apiResult: IApiResult = {
      actionName: reduxConstants.GETUSERDET,
      isSuccess: false,
      apiResponse: "",
    };
    usersAPI.GetUserDet(userid).then((res: any) => {
      if (res.isSuccess) {
        if (res.statusCode === 200) {
          apiResult.isSuccess = true;
          let userDetaillist: IUserDetails[] = GetUserDetailListFromJSON(
            res.responseData
          );
          const userDetails = GetUserDetailsFromJSON(userDetaillist[0]);
          dispatch(dispatchGetUserDet(apiResult, userDetails));
        } else {
          dispatch(
            dispatchGetUserDet(
              getAPIResponseWithMessage(res, apiResult),
              DefaultUserDetails
            )
          );
        }
      } else {
        apiResult.apiResponse = res.responseData;
        dispatch(dispatchGetUserDet(apiResult, DefaultUserDetails));
      }
    });
  };

export const dispatchUpdateUserDet = (
  apiresult: IApiResult
): appActionTypes.IUPDATEUSERDET => ({
  type: reduxConstants.UPDATEUSERDET,
  apiResult: apiresult,
});

export const UpdateUserDet =
  (
    userDetails: IUserDetails,
    picfile: any
  ): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    let apiResult: IApiResult = {
      actionName: reduxConstants.UPDATEUSERDET,
      isSuccess: false,
      apiResponse: "",
    };
    usersAPI.UpdateUserDet(userDetails, picfile).then((res: any) => {
      if (res.isSuccess) {
        dispatch(
          dispatchUpdateUserDet(getAPIResponseWithMessage(res, apiResult))
        );
      } else {
        apiResult.apiResponse = res.responseData;
        dispatch(dispatchUpdateUserDet(apiResult));
      }
    });
  };

export const dispatchUpdatePassword = (
  apiresult: IApiResult
): appActionTypes.IUPDATEPASSWORD => ({
  type: reduxConstants.UPDATEPASSWORD,
  apiResult: apiresult,
});

export const UpdatePassword =
  (password: string): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    let apiResult: IApiResult = {
      actionName: reduxConstants.UPDATEPASSWORD,
      isSuccess: false,
      apiResponse: "",
    };
    usersAPI.UpdatePassword(password).then((res: any) => {
      if (res.isSuccess) {
        dispatch(
          dispatchUpdatePassword(getAPIResponseWithMessage(res, apiResult))
        );
      } else {
        apiResult.apiResponse = res.responseData;
        dispatch(dispatchUpdatePassword(apiResult));
      }
    });
  };

export const dispatchLogOut = (
  apiresult: IApiResult
): appActionTypes.ILOGOUT => ({
  type: reduxConstants.LOGOUT,
  apiResult: apiresult,
});

export const Logout =
  (): ThunkAction<Promise<any>, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<any> => {
    let apiResult: IApiResult = {
      actionName: reduxConstants.LOGOUT,
      isSuccess: true,
      apiResponse: "",
    };
    dispatch(dispatchLogOut(apiResult));
  };

export const UpdateUseridANDisweb =
  (
    userid: number,
    isweb: boolean
  ): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    let apiResult: IApiResult = {
      actionName: reduxConstants.UPDATEUSERIDANDISWEB,
      isSuccess: true,
      apiResponse: "",
    };
    dispatch(dispatchCheckCred(apiResult, userid, isweb));
  };

export const dispatchVerifyOldPassword = (
  apiresult: IApiResult
): appActionTypes.IVERIFYOLDPASSWORD => ({
  type: reduxConstants.VERIFYOLDPASSWORD,
  apiResult: apiresult,
});

export const VerifyOldPassword =
  (
    userind: string,
    password: string
  ): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    let apiResult: IApiResult = {
      actionName: reduxConstants.VERIFYOLDPASSWORD,
      isSuccess: false,
      apiResponse: "",
    };
    usersAPI.CheckCred(userind, password).then((res: any) => {
      if (res.isSuccess) {
        if (res.statusCode === 200) {
          let userid: number = res.responseData.userid;
          if (userid > 0) {
            apiResult.isSuccess = true;
          }
        }
      }
      dispatch(dispatchVerifyOldPassword(apiResult));
    });
  };

export const dispatchSendEmailOTP = (
  apiresult: IApiResult
): appActionTypes.ISENDEMAILOTP => ({
  type: reduxConstants.SENDEMAILOTP,
  apiResult: apiresult,
});

export const SendEmailOTP =
  (emailid: string): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    let apiResult: IApiResult = {
      actionName: reduxConstants.SENDEMAILOTP,
      isSuccess: false,
      apiResponse: "",
    };
    usersAPI.SendEmailOTP(emailid).then((res: any) => {
      if (res.isSuccess) {
        dispatch(
          dispatchUpdatePassword(getAPIResponseWithMessage(res, apiResult))
        );
      } else {
        dispatch(dispatchSendEmailOTP(apiResult));
      }
    });
  };

export const dispatchSendMobileOTP = (
  apiresult: IApiResult
): appActionTypes.ISENDMOBILEOTP => ({
  type: reduxConstants.SENDMOBILEOTP,
  apiResult: apiresult,
});

export const SendMobileOTP =
  (mobileno: string): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    let apiResult: IApiResult = {
      actionName: reduxConstants.SENDMOBILEOTP,
      isSuccess: false,
      apiResponse: "",
    };
    usersAPI.SendMobileOTP(mobileno).then((res: any) => {
      if (res.isSuccess) {
        dispatch(
          dispatchSendMobileOTP(getAPIResponseWithMessage(res, apiResult))
        );
      } else {
        dispatch(dispatchSendMobileOTP(apiResult));
      }
    });
  };
