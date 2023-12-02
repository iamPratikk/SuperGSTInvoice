//*********TaxPreference Deatils*********/
export interface ITaxPreferenceDetails {
  taxprefid: number;
  taxprefname: string;
}

export const DefaultTaxPreferenceDetails = {
  taxprefid: 0,
  taxprefname: "",
} as ITaxPreferenceDetails;

export function GetTaxPreferenceDetailListFromJSON(
  JSONData: any
): ITaxPreferenceDetails[] {
  let detaillist: ITaxPreferenceDetails[] = [];
  try {
    Object.keys(JSONData).map(function (key: any) {
      return detaillist.push(GetTaxPreferenceDetailsFromJSON(JSONData[key]));
    });
  } catch (error) {
    console.log(error);
  }
  return detaillist;
}

export function GetTaxPreferenceDetailsFromJSON(
  CData: any
): ITaxPreferenceDetails {
  let details: ITaxPreferenceDetails = DefaultTaxPreferenceDetails;
  try {
    details = {
      taxprefid: CData["taxprefid"] ? CData["taxprefid"] : 0,
      taxprefname: CData["taxprefname"] ? CData["taxprefname"] : "",
    };
  } catch (error) {
    console.log(error);
  }
  return details;
}
