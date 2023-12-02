import Axios from "axios";
import {
  GetErrorDiscription,
  getAPIHeader,
  getStoreValues,
  getAPIHeaderWithFormData,
} from "../../../utils/CommonFuntions";
import { HSNCODEAPI } from "../../apiConstants";
import { IHsnCodeDetails } from "../../interface/others/hsnCodeInterface";

const APIurl = process.env.REACT_APP_API_ENDPOINT;

///Api call for Get all HsnCodes
export const GetAllHsnCodes = async (): Promise<any> => {
  try {
    const response = await Axios.get(APIurl + HSNCODEAPI.GETHSNCODES, {
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

///Api call for Create or update a HsnCode
export const SaveHsnCode = async (
  hsncodeDetails: IHsnCodeDetails
): Promise<any> => {
  try {
    const appCommonState = getStoreValues();
    const response = await Axios.post(
      APIurl + HSNCODEAPI.SAVEHSNCODE,
      {
        hsncode: hsncodeDetails.hsncode,
        codedesc: hsncodeDetails.codedesc,
        isselectable: hsncodeDetails.isselectable,
        isservice: hsncodeDetails.isservice,
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

///Api call for Delete a HsnCode by hsncodeid
export const DeleteHsnCode = async (hsncodeid: number): Promise<any> => {
  try {
    const response = await Axios.delete(
      APIurl + HSNCODEAPI.DELETEHSNCODE + "/" + hsncodeid,
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

///Save HSN code from a CSV file or update if already present
export const SaveBulkHSNCode = async (csvFile: any): Promise<any> => {
  try {
    const fd = new FormData();
    fd.append("csvFile", csvFile);
    const response = await Axios.put(APIurl + HSNCODEAPI.SAVEBULKHSNCODE, fd, {
      headers: { ...getAPIHeaderWithFormData() },
    });
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

