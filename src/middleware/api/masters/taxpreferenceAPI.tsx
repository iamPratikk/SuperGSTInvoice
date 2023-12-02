import Axios from "axios";
import {
  GetErrorDiscription,
  getAPIHeader,
  getStoreValues,
} from "../../../utils/CommonFuntions";
import { TAXPREFERENCEAPI } from "../../apiConstants";
import { ITaxPreferenceDetails } from "../../interface/masters/taxpreferenceInterface";

const APIurl = process.env.REACT_APP_API_ENDPOINT;

///Api call for Get all TaxPreference
export const GetAllTaxPreference = async (): Promise<any> => {
  try {
    const response = await Axios.get(
      APIurl + TAXPREFERENCEAPI.GETTAXPREFERENCE,
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

///Api call for Create or update a TaxPreference
export const SaveTaxPreference = async (
  Details: ITaxPreferenceDetails
): Promise<any> => {
  try {
    const appCommonState = getStoreValues();
    const response = await Axios.post(
      APIurl + TAXPREFERENCEAPI.SAVETAXPREFERENCE,
      {
        taxprefid: Details.taxprefid,
        taxprefname: Details.taxprefname,
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

///Api call for Delete a TaxPreference by stateid
export const DeleteTaxPreference = async (taxprefid: number): Promise<any> => {
  try {
    const response = await Axios.delete(
      APIurl + TAXPREFERENCEAPI.DELETETAXPREFERENCE + "/" + taxprefid,
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
