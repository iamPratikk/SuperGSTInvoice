import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { reduxConstants, appActionTypes, usersAPI } from "./index";
import {
  IApiResult,
  IGlobalStateVariable,
} from "../../middleware/interface/commonInterface";
import { Buffer } from "buffer";

export const dispatchResetApiResult = (
  apiresult: IApiResult
): appActionTypes.IRESET_API_RESULT => ({
  type: reduxConstants.RESET_API_RESULT,
  apiResult: apiresult,
});

export const resetApiResult =
  (): ThunkAction<Promise<any>, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<any> => {
    let apiResult: IApiResult = {
      actionName: "",
      isSuccess: false,
      apiResponse: "",
    };
    dispatch(dispatchResetApiResult(apiResult));
  };

export const dispatchUpdateGlobalStateVariable = (
  globalStateVariable: IGlobalStateVariable
): appActionTypes.IUPDATEGLOBALSTATEVARIABLE => ({
  type: reduxConstants.UPDATEGLOBALSTATEVARIABLE,
  globalStateVariable: globalStateVariable,
});

export const updateGlobalStateVariable =
  (
    globalStateVariable: IGlobalStateVariable
  ): ThunkAction<Promise<any>, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<any> => {
    dispatch(dispatchUpdateGlobalStateVariable(globalStateVariable));
  };

export const GetUserPicture =
  (
    globalStateVariable: IGlobalStateVariable
  ): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    let apiResult: IApiResult = {
      actionName: reduxConstants.GETUSERPICTURE,
      isSuccess: false,
      apiResponse: "",
    };
    globalStateVariable.userPicBinary = null;
    globalStateVariable.userPicString = "";
    usersAPI.GetUserPicture(globalStateVariable.userId).then((res: any) => {
      if (res.isSuccess) {
        if (res.statusCode === 200) {
          if (res.responseData) {
            try {
              const userPicBinaryData = new Blob([res.responseData], {
                type: "application/octet-binary;charset=utf-8",
              });
              if (userPicBinaryData)
                globalStateVariable.userPicBinary = userPicBinaryData;
              const userPicStringData = Buffer.from(
                res.responseData,
                "binary"
              ).toString("base64");
              if (userPicStringData)
                globalStateVariable.userPicString = userPicStringData;
            } catch (error) {
              console.log(error);
            }
          }
          dispatch(dispatchUpdateGlobalStateVariable(globalStateVariable));
        } else {
          apiResult.apiResponse = res.responseData;
          dispatch(dispatchUpdateGlobalStateVariable(globalStateVariable));
        }
      } else {
        dispatch(dispatchUpdateGlobalStateVariable(globalStateVariable));
      }
    });
  };
