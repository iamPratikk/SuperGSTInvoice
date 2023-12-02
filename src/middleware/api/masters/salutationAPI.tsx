import Axios from "axios";
import {
  GetErrorDiscription,
  getAPIHeader,
  getStoreValues,
} from "../../../utils/CommonFuntions";
import { SALUTATIONAPI } from "../../apiConstants";
import { ISalutationDetails } from "../../interface/masters/salutationInterface";

const APIurl = process.env.REACT_APP_API_ENDPOINT;

///Api call for Get all Salutations
export const GetAllSalutations = async (): Promise<any> => {
  try {
    const response = await Axios.get(APIurl + SALUTATIONAPI.GETSALUTATION, {
      headers: { ...getAPIHeader() },
    });
    return {
      responseData: response.data,
      isSuccess: true,
      statusCode: response.status,
    };
  } catch (error) {
    return {
      responseData: GetErrorDiscription(error),
      isSuccess: false,
      statusCode: 0,
    };
  }
};

///Api call for Create or update a Salutation
export const SaveSalutation = async (
  Details: ISalutationDetails
): Promise<any> => {
  try {
    const appCommonState = getStoreValues();
    const response = await Axios.post(
      APIurl + SALUTATIONAPI.SAVESALUTATION,
      {
        salid: Details.salid,
        salutation: Details.salutation,
        gender: Details.gender,
        userid: appCommonState.globalStateVariable.userId,
        isweb: appCommonState.globalStateVariable.isweb,
      },
      {
        headers: { ...getAPIHeader() },
      }
    );
    return {
      responseData: response.data,
      isSuccess: true,
      statusCode: response.status,
    };
  } catch (error) {
    return {
      responseData: GetErrorDiscription(error),
      isSuccess: false,
      statusCode: 0,
    };
  }
};

///Api call for Delete a Salutation by stateid
export const DeleteSalutation = async (salid: number): Promise<any> => {
  try {
    const response = await Axios.delete(
      APIurl + SALUTATIONAPI.DELETESALUTATION + "/" + salid,
      {
        headers: { ...getAPIHeader() },
      }
    );
    return {
      responseData: response.data,
      isSuccess: true,
      statusCode: response.status,
    };
  } catch (error) {
    return {
      responseData: GetErrorDiscription(error),
      isSuccess: false,
      statusCode: 0,
    };
  }
};
