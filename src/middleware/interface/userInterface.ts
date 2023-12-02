//*********Login User Deatils*********/
export interface IUserDetails {
  company: string;
  salid: number;
  fullname: string;
  emailid: string;
  isemailverified: boolean;
  mobileno: string;
  ismobileverified: boolean;
  usertype: string;
}

export const DefaultUserDetails = {
  company: "",
  salid: 0,
  fullname: "",
  emailid: "",
  isemailverified: false,
  mobileno: "",
  ismobileverified: false,
  usertype: "",
} as IUserDetails;

export function GetUserDetailListFromJSON(JSONData: any): IUserDetails[] {
  let userDetaillist: IUserDetails[] = [];
  try {
    Object.keys(JSONData).map(function (key: any) {
      return userDetaillist.push(GetUserDetailsFromJSON(JSONData[key]));
    });
  } catch (error) {
    console.log(error);
  }
  return userDetaillist;
}

export function GetUserDetailsFromJSON(CData: any): IUserDetails {
  let userDetails: IUserDetails = DefaultUserDetails;
  try {
    userDetails = {
      company: CData["company"] ? CData["company"] : "",
      salid: CData["salid"] ? CData["salid"] : 0,
      fullname: CData["fullname"] ? CData["fullname"] : "",
      emailid: CData["emailid"] ? CData["emailid"] : "",
      isemailverified: CData["isemailverified"]
        ? CData["isemailverified"]
        : false,
      mobileno: CData["mobileno"] ? CData["mobileno"] : "",
      ismobileverified: CData["ismobileverified"]
        ? CData["ismobileverified"]
        : false,
      usertype: CData["usertype"] ? CData["usertype"] : "",
    };
  } catch (error) {
    console.log(error);
  }
  return userDetails;
}
