import Axios from "axios";
import {
  GetErrorDiscription,
  getAPIHeader,
  getStoreValues,
  getAPIHeaderWithFormData,
} from "../../../utils/CommonFuntions";
import { GSTTREATMENTAPI } from "../../apiConstants";
import { IGSTTreatmentDetails } from "../../interface/others/gstTreatmentInterface";

const APIurl = process.env.REACT_APP_API_ENDPOINT;

///Api call for Get all GSTTreatment
export const GetGSTTreatments = async (): Promise<any> => {
  try {
    const response = await Axios.get(
      APIurl + GSTTREATMENTAPI.GETGSTTREATMENTS,
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

///Api call for Create or update a GSTTreatment
export const SaveGSTTreatment = async (
  countryDetails: IGSTTreatmentDetails
): Promise<any> => {
  try {
    const appCommonState = getStoreValues();
    const response = await Axios.post(
      APIurl + GSTTREATMENTAPI.SAVEGSTTREATMENT,
      {
        gsttreatmentid: countryDetails.gsttreatmentid,
        gsttreatment: countryDetails.gsttreatment,
        reqgstno: countryDetails.reqgstno,
        reqsupplace: countryDetails.reqsupplace,
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

///Api call for Delete a GSTTreatment by gsttreatmentid
export const DeleteGSTTreatment = async (
  gsttreatmentid: number
): Promise<any> => {
  try {
    const response = await Axios.delete(
      APIurl + GSTTREATMENTAPI.DELETEGSTTREATMENT + "/" + gsttreatmentid,
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

///Save gst treatment from a CSV file or update if already present
export const SaveBulkGSTTreatment = async (csvFile: any): Promise<any> => {
  try {
    const fd = new FormData();
    fd.append("csvFile", csvFile);
    const response = await Axios.put(APIurl + GSTTREATMENTAPI.SAVEBULKGSTTREATMENT, fd, {
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