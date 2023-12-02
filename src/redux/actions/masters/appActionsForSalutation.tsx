import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { salutationAPI, reduxConstants, appActionTypes } from "../index";
import { IApiResult } from "../../../middleware/interface/commonInterface";
import {
  GetSalutationDetailListFromJSON,
  ISalutationDetails,
} from "../../../middleware/interface/masters/salutationInterface";
import { getAPIResponseWithMessage } from "../../../utils/CommonFuntions";

export const dispatchGetSalutations = (
  apiresult: IApiResult,
  salutationList: ISalutationDetails[]
): appActionTypes.IGETSALUTATIONS => ({
  type: reduxConstants.GETSALUTATIONS,
  apiResult: apiresult,
  salutationList: salutationList,
});

export const GetAllSalutations =
  (): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    let apiResult: IApiResult = {
      actionName: reduxConstants.GETSALUTATIONS,
      isSuccess: false,
      apiResponse: "",
    };
    salutationAPI.GetAllSalutations().then((res: any) => {
      if (res.isSuccess) {
        if (res.statusCode === 200) {
          apiResult.isSuccess = true;
          let salutationList: ISalutationDetails[] =
            GetSalutationDetailListFromJSON(res.responseData);
          salutationList = salutationList.sort((a, b) =>
            a.salid > b.salid ? -1 : 1
          );
          dispatch(dispatchGetSalutations(apiResult, salutationList));
        } else {
          dispatch(
            dispatchGetSalutations(
              getAPIResponseWithMessage(res, apiResult),
              []
            )
          );
        }
      } else {
        apiResult.apiResponse = res.responseData;
        dispatch(dispatchGetSalutations(apiResult, []));
      }
    });
  };

export const dispatchSaveSalutation = (
  apiresult: IApiResult
): appActionTypes.ISAVESALUTATION => ({
  type: reduxConstants.SAVESALUTATION,
  apiResult: apiresult,
});

export const SaveSalutation =
  (
    salutationDetails: ISalutationDetails
  ): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    let apiResult: IApiResult = {
      actionName: reduxConstants.SAVESALUTATION,
      isSuccess: false,
      apiResponse: "",
    };
    salutationAPI.SaveSalutation(salutationDetails).then((res: any) => {
      if (res.isSuccess) {
        dispatch(
          dispatchSaveSalutation(
            getAPIResponseWithMessage(
              res,
              apiResult,
              [200, 201],
              "Salutation created or updated successfully."
            )
          )
        );
      } else {
        apiResult.apiResponse = res.responseData;
        dispatch(dispatchSaveSalutation(apiResult));
      }
    });
  };

export const dispatchDeleteSalutation = (
  apiresult: IApiResult
): appActionTypes.IDELETESALUTATION => ({
  type: reduxConstants.DELETESALUTATION,
  apiResult: apiresult,
});

export const DeleteSalutation =
  (salutationid: number): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    let apiResult: IApiResult = {
      actionName: reduxConstants.DELETESALUTATION,
      isSuccess: false,
      apiResponse: "",
    };
    salutationAPI.DeleteSalutation(salutationid).then((res: any) => {
      if (res.isSuccess) {
        dispatch(
          dispatchDeleteSalutation(
            getAPIResponseWithMessage(
              res,
              apiResult,
              [204],
              "Salutation deleted successfully."
            )
          )
        );
      } else {
        apiResult.apiResponse = res.responseData;
        dispatch(dispatchDeleteSalutation(apiResult));
      }
    });
  };
