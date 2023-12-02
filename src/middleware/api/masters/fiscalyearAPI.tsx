import Axios from "axios";
import {
  GetErrorDiscription,
  getAPIHeader,
  getStoreValues,
} from "../../../utils/CommonFuntions";
import { FISCALYEARAPI } from "../../apiConstants";
import { IFiscalYearDetails } from "../../interface/masters/fiscalYearInterface";

const APIurl = process.env.REACT_APP_API_ENDPOINT;

///Api call for Get all FiscalYears
export const GetAllFiscalYears = async (): Promise<any> => {
  try {
    const response = await Axios.get(APIurl + FISCALYEARAPI.GETFISCALYEAR, {
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

///Api call for Create or update a FiscalYear
export const SaveFiscalYear = async (
  Details: IFiscalYearDetails
): Promise<any> => {
  try {
    const appCommonState = getStoreValues();
    const response = await Axios.post(
      APIurl + FISCALYEARAPI.SAVEFISCALYEAR,
      {
        fiscalid: Details.fiscalid,
        fiscalyear: Details.fiscalyear,
        startmonth: Details.startmonth,
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

///Api call for Delete a FiscalYear by fiscalid
export const DeleteFiscalYear = async (fiscalid: number): Promise<any> => {
  try {
    const response = await Axios.delete(
      APIurl + FISCALYEARAPI.DELETEFISCALYEAR + "/" + fiscalid,
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
