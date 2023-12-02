import Axios from "axios";
import {
  GetErrorDiscription,
  getAPIHeader,
  getStoreValues,
  getAPIHeaderWithFormData,
} from "../../../utils/CommonFuntions";
import { LANGUAGEAPI } from "../../apiConstants";
import { ILanguageDetails } from "../../interface/masters/languageInterface";

const APIurl = process.env.REACT_APP_API_ENDPOINT;

///Api call for Get all Languages
export const GetAllLanguages = async (): Promise<any> => {
  try {
    const response = await Axios.get(APIurl + LANGUAGEAPI.GETLANGUAGE, {
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

///Api call for Create or update a Language
export const SaveLanguage = async (Details: ILanguageDetails): Promise<any> => {
  try {
    const appCommonState = getStoreValues();
    const response = await Axios.post(
      APIurl + LANGUAGEAPI.SAVELANGUAGE,
      {
        langcode: Details.langcode,
        language: Details.language,
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

///Api call for Delete a Language by stateid
export const DeleteLanguage = async (langcode: string): Promise<any> => {
  try {
    const response = await Axios.delete(
      APIurl + LANGUAGEAPI.DELETELANGUAGE + "/" + langcode,
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

///Save language from a CSV file or update if already present
export const SaveBulkLanguage = async (csvFile: any): Promise<any> => {
  try {
    const fd = new FormData();
    fd.append("csvFile", csvFile);
    const response = await Axios.put(
      APIurl + LANGUAGEAPI.SAVEBULKLANGUAGE,
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
