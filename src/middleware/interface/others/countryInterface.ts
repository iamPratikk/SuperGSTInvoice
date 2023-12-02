//*********Login User Deatils*********/
export interface ICountryDetails {
  countryid: number;
  countryname: string;
  defcurcode: string;
  isdcode: number;
}

export const DefaultCountryDetails = {
  countryid: 0,
  countryname: "",
  defcurcode: "",
  isdcode: 0,
} as ICountryDetails;

export function GetCountryDetailListFromJSON(JSONData: any): ICountryDetails[] {
  let countryDetaillist: ICountryDetails[] = [];
  try {
    Object.keys(JSONData).map(function (key: any) {
      return countryDetaillist.push(GetCountryDetailsFromJSON(JSONData[key]));
    });
  } catch (error) {
    console.log(error);
  }
  return countryDetaillist;
}

export function GetCountryDetailsFromJSON(CData: any): ICountryDetails {
  let userDetails: ICountryDetails = DefaultCountryDetails;
  try {
    userDetails = {
      countryid: CData["countryid"] ? CData["countryid"] : 0,
      countryname: CData["countryname"] ? CData["countryname"] : "",
      defcurcode: CData["defcurcode"] ? CData["defcurcode"] : "",
      isdcode: CData["isdcode"] ? CData["isdcode"] : 0,
    };
  } catch (error) {
    console.log(error);
  }
  return userDetails;
}
