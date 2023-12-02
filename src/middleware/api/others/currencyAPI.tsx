import Axios from "axios";
import {
  GetErrorDiscription,
  getAPIHeader,
  getStoreValues,
  getAPIHeaderWithFormData,
} from "../../../utils/CommonFuntions";
import { CURRENCYAPI } from "../../apiConstants";
import { ICurrencyDetails } from "../../interface/others/currencyInterface";

const APIurl = process.env.REACT_APP_API_ENDPOINT;

///Api call for Get all Default/Base Currencies
export const GetCurrencies = async (): Promise<any> => {
  try {
    const response = await Axios.get(APIurl + CURRENCYAPI.GETBASECURRENCIES, {
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

///Api call for Get Base Currencie by code
export const GetCurrenciesByCode = async (
  currencycode: string
): Promise<any> => {
  try {
    const response = await Axios.get(
      APIurl +
        CURRENCYAPI.GETBASECURRENCIEBYCODE +
        "?currencycode=" +
        currencycode,
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

///Api call for Create or update a Base Currency
export const SaveBaseCurrency = async (
  currencyDetails: ICurrencyDetails
): Promise<any> => {
  try {
    const appCommonState = getStoreValues();
    const response = await Axios.post(
      APIurl + CURRENCYAPI.SAVEBASECURRENCY,
      {
        currencycode: currencyDetails.currencycode,
        symbol: currencyDetails.symbol,
        currencyname: currencyDetails.currencyname,
        dec: currencyDetails.dec,
        format: currencyDetails.format,
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

///Api call for Delete a base Currency by currencycode
export const DeleteCurrency = async (currencycode: string): Promise<any> => {
  try {
    const response = await Axios.delete(
      APIurl + CURRENCYAPI.DELETEBASECURRENCY + "/" + currencycode,
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

///Save currencies from a CSV file or update if already present
export const SaveBulkCurrency = async (csvFile: any): Promise<any> => {
  try {
    const fd = new FormData();
    fd.append("csvFile", csvFile);
    const response = await Axios.put(
      APIurl + CURRENCYAPI.SAVEBULKCURRENCIES,
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
