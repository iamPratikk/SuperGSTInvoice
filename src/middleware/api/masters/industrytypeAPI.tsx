import Axios from "axios";
import {
  GetErrorDiscription,
  getAPIHeader,
  getStoreValues,
  getAPIHeaderWithFormData,
} from "../../../utils/CommonFuntions";
import { INDUSTRYTYPEAPI } from "../../apiConstants";
import { IIndustryTypeDetails } from "../../interface/masters/industryTypeInterface";

const APIurl = process.env.REACT_APP_API_ENDPOINT;

///Api call for Get all IndustryTypes
export const GetAllIndustryTypes = async (): Promise<any> => {
  try {
    const response = await Axios.get(APIurl + INDUSTRYTYPEAPI.GETINDUSTRYTYPE, {
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

///Api call for Create or update a IndustryType
export const SaveIndustryType = async (
  Details: IIndustryTypeDetails
): Promise<any> => {
  try {
    const appCommonState = getStoreValues();
    const response = await Axios.post(
      APIurl + INDUSTRYTYPEAPI.SAVEINDUSTRYTYPE,
      {
        indtypeid: Details.indtypeid,
        indtype: Details.indtype,
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

///Api call for Delete a IndustryType by stateid
export const DeleteIndustryType = async (indtypeid: number): Promise<any> => {
  try {
    const response = await Axios.delete(
      APIurl + INDUSTRYTYPEAPI.DELETEINDUSTRYTYPE + "/" + indtypeid,
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

///Save Industry Type from a CSV file or update if already present
export const SaveBulkIndustryType = async (csvFile: any): Promise<any> => {
  try {
    const fd = new FormData();
    fd.append("csvFile", csvFile);
    const response = await Axios.put(
      APIurl + INDUSTRYTYPEAPI.SAVEBULKINDUSTRYTYPE,
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
