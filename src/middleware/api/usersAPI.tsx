import Axios from "axios";
import {
  GetErrorDiscription,
  getAPIHeader,
  getAPIHeaderWithFormData,
  getAPIHeaderForImageFile,
  getStoreValues,
} from "../../utils/CommonFuntions";
import { USERSAPI } from "../apiConstants";
import { IUserDetails } from "../interface/userInterface";

const APIurl = process.env.REACT_APP_API_ENDPOINT;

///Api call for Check the Credential based on mobile number or email ID and Password
export const CheckCred = async (
  userind: string,
  password: string
): Promise<any> => {
  try {
    const response = await Axios.get(
      APIurl + USERSAPI.CHECKCRED + "/" + userind + "/" + password,
      {
        headers: { ...getAPIHeader() },
      }
    );
    console.log("fine in login")
    return {
      responseData: response.data,
      isSuccess: true,
      statusCode: response.status,
    };
  } catch (error) {
    console.log("error in login")
    return {
      responseData: GetErrorDiscription(error),
      isSuccess: true,
      statusCode: 0,
    };
  }
};

///Api call for Get user details from the Users table based on the userid
export const GetUserDet = async (userid: number): Promise<any> => {
  try {
    const response = await Axios.get(
      APIurl + USERSAPI.GETUSERDET + "/" + userid,
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

///Api call for Update user details based on the userid in the Users table
export const UpdateUserDet = async (
  userDetails: IUserDetails,
  profilePic: any
): Promise<any> => {
  try {
    const appCommonState = getStoreValues();
    const formData = new FormData();
    if (profilePic) formData.append("picture", profilePic);
    formData.append(
      "userid",
      appCommonState.globalStateVariable.userId.toString()
    );
    formData.append("salid", userDetails.salid.toString());
    formData.append("fullname", userDetails.fullname);
    formData.append("emailid", userDetails.emailid);
    formData.append("mobileno", userDetails.mobileno);
    const response = await Axios.put(
      APIurl + USERSAPI.UPDATEUSERDET,
      formData,
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

///Api call for Update Password
export const UpdatePassword = async (password: string): Promise<any> => {
  try {
    const appCommonState = getStoreValues();
    const response = await Axios.post(
      APIurl + USERSAPI.UPDATEPASSWORD,
      { userid: appCommonState.globalStateVariable.userId, password: password },
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

///Api call for getting user profile picture by user id
export const GetUserPicture = async (userind: number): Promise<any> => {
  try {
    const response = await Axios.get(
      APIurl + USERSAPI.GETUSERPICTURE + "/" + userind,
      {
        headers: { ...getAPIHeaderForImageFile() },
        responseType: "arraybuffer",
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

///Api call for Send Email OTP
export const SendEmailOTP = async (emailid: string): Promise<any> => {
  try {
    const response = await Axios.post(
      APIurl + USERSAPI.SENDEMAILOTP,
      { emailid: emailid },
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

///Api call for Send Mobile OTP
export const SendMobileOTP = async (mobileno: string): Promise<any> => {
  try {
    const response = await Axios.post(
      APIurl + USERSAPI.SENDMOBILEOTP,
      { mobileno: mobileno },
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
