import Axios from "axios";
import {
  GetErrorDiscription,
  getAPIHeader,
  getStoreValues,
  getAPIHeaderWithFormData,
} from "../../../utils/CommonFuntions";
import { STATEAPI } from "../../apiConstants";
import { IStateDetails } from "../../interface/others/stateInterface";

const APIurl = process.env.REACT_APP_API_ENDPOINT;

///Api call for Get all States
export const GetAllStates = async (): Promise<any> => {
  try {
    const response = await Axios.get(APIurl + STATEAPI.GETALLSTATES, {
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

///Api call for Get States by country id
export const GetStates = async (countryid: number): Promise<any> => {
  try {
    const response = await Axios.get(
      APIurl + STATEAPI.GETSTATES + "/" + countryid,
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

///Api call for Create or update a State
export const SaveState = async (stateDetails: IStateDetails): Promise<any> => {
  try {
    const appCommonState = getStoreValues();
    const response = await Axios.post(
      APIurl + STATEAPI.SAVESTATE,
      {
        stateid: stateDetails.stateid,
        statename: stateDetails.statename,
        countryid: stateDetails.countryid,
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

///Api call for Delete a State by stateid
export const DeleteState = async (stateid: number): Promise<any> => {
  try {
    const response = await Axios.delete(
      APIurl + STATEAPI.DELETESTATE + "/" + stateid,
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

//Save or update states from a CSV file
export const SaveBulkStates = async (csvFile: any): Promise<any> => {
  try {
    const fd = new FormData();
    fd.append("csvFile", csvFile);
    const response = await Axios.put(APIurl + STATEAPI.SAVEBULKSTATES, fd, {
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
