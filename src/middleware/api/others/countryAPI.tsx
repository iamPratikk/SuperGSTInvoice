import Axios from "axios";
import {
  GetErrorDiscription,
  getAPIHeader,
  getStoreValues,
  getAPIHeaderWithFormData,
} from "../../../utils/CommonFuntions";
import { COUNTRYAPI } from "../../apiConstants";
import { ICountryDetails } from "../../interface/others/countryInterface";

const APIurl = process.env.REACT_APP_API_ENDPOINT;

///Api call for Get all Countries
export const GetCountries = async (): Promise<any> => {
  try {
    const response = await Axios.get(APIurl + COUNTRYAPI.GETCOUNTRIES, {
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

///Api call for Create or update a Country
export const SaveCountry = async (
  countryDetails: ICountryDetails
): Promise<any> => {
  try {
    const appCommonState = getStoreValues();
    const response = await Axios.post(
      APIurl + COUNTRYAPI.SAVECOUNTRY,
      {
        countryid: countryDetails.countryid,
        countryname: countryDetails.countryname,
        defcurcode: countryDetails.defcurcode,
        isdcode: countryDetails.isdcode,
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

///Api call for Delete a Country by countryid
export const DeleteCountry = async (countryid: number): Promise<any> => {
  try {
    const response = await Axios.delete(
      APIurl + COUNTRYAPI.DELETECOUNTRY + "/" + countryid,
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

///Save countries from a CSV file or update if already present
export const SaveBulkCountry = async (csvFile: any): Promise<any> => {
  try {
    const fd = new FormData();
    fd.append("csvFile", csvFile);
    const response = await Axios.put(APIurl + COUNTRYAPI.SAVEBULKCOUNTRY, fd, {
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
