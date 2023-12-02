import Axios from "axios";
import {
  GetErrorDiscription,
  getAPIHeader,
  getStoreValues,
} from "../../../utils/CommonFuntions";
import { DATEFORMATAPI } from "../../apiConstants";
import { IDateFormatDetails } from "../../interface/masters/dateFormatInterface";

const APIurl = process.env.REACT_APP_API_ENDPOINT;

///Api call for Get all DateFormats
export const GetAllDateFormats = async (): Promise<any> => {
  try {
    const response = await Axios.get(APIurl + DATEFORMATAPI.GETDATEFORMAT, {
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

///Api call for Create or update a DateFormat
export const SaveDateFormat = async (
  Details: IDateFormatDetails
): Promise<any> => {
  try {
    const appCommonState = getStoreValues();
    const response = await Axios.post(
      APIurl + DATEFORMATAPI.SAVEDATEFORMAT,
      {
        dateformatid: Details.dateformatid,
        dateformat: Details.dateformat,
        monfmt: Details.monfmt,
        daypos: Details.daypos,
        monpos: Details.monpos,
        yearpos: Details.yearpos,
        yearfmt: Details.yearfmt,
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

///Api call for Delete a DateFormat by dateformatid
export const DeleteDateFormat = async (dateformatid: number): Promise<any> => {
  try {
    const response = await Axios.delete(
      APIurl + DATEFORMATAPI.DELETEDATEFORMAT + "/" + dateformatid,
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
