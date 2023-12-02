//*********Language Deatils*********/
export interface ILanguageDetails {
  langcode: string;
  language: string;
}

export const DefaultLanguageDetails = {
  langcode: "",
  language: "",
} as ILanguageDetails;

export function GetLanguageDetailListFromJSON(
  JSONData: any
): ILanguageDetails[] {
  let detaillist: ILanguageDetails[] = [];
  try {
    Object.keys(JSONData).map(function (key: any) {
      return detaillist.push(GetLanguageDetailsFromJSON(JSONData[key]));
    });
  } catch (error) {
    console.log(error);
  }
  return detaillist;
}

export function GetLanguageDetailsFromJSON(CData: any): ILanguageDetails {
  let details: ILanguageDetails = DefaultLanguageDetails;
  try {
    details = {
      langcode: CData["langcode"] ? CData["langcode"] : "",
      language: CData["language"] ? CData["language"] : "",
    };
  } catch (error) {
    console.log(error);
  }
  return details;
}
