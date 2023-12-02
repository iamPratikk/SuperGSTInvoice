import Axios from "axios";
import {
  GetErrorDiscription,
  getAPIHeader,
  getStoreValues,
  getAPIHeaderWithFormData,
} from "../../../utils/CommonFuntions";
import { BUSINESSTYPEAPI } from "../../apiConstants";
import { IBusinessTypeDetails } from "../../interface/masters/businessTypeInterface";

const APIurl = process.env.REACT_APP_API_ENDPOINT;

///Api call for Get all BusinessTypes
export const GetAllBusinessTypes = async (): Promise<any> => {
  try {
    const response = await Axios.get(APIurl + BUSINESSTYPEAPI.GETBUSINESSTYPE, {
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

///Api call for Create or update a BusinessType
export const SaveBusinessType = async (
  Details: IBusinessTypeDetails
): Promise<any> => {
  try {
    const appCommonState = getStoreValues();
    const response = await Axios.post(
      APIurl + BUSINESSTYPEAPI.SAVEBUSINESSTYPE,
      {
        bustypeid: Details.bustypeid,
        bustype: Details.bustype,
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

///Api call for Delete a BusinessType by stateid
export const DeleteBusinessType = async (bustypeid: number): Promise<any> => {
  try {
    const response = await Axios.delete(
      APIurl + BUSINESSTYPEAPI.DELETEBUSINESSTYPE + "/" + bustypeid,
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

///Save or update base Business Types from a CSV file
export const SaveBulkBusType = async (csvFile: any): Promise<any> => {
  try {
    const fd = new FormData();
    fd.append("csvFile", csvFile);
    const response = await Axios.put(
      APIurl + BUSINESSTYPEAPI.SAVEBULKBUSTYPE,
      fd,
      {
        headers: { ...getAPIHeaderWithFormData() },
      }
    );
    return {
      responseData: response.data,
      isSuccess: true,
      statusCode: response.status,
    };
  } catch (error) {
    console.log(error);
    return {
      responseData: GetErrorDiscription(error),
      isSuccess: false,
      statusCode: 0,
    };
  }
};
