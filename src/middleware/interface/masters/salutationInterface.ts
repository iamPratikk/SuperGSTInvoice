//*********Salutation Deatils*********/
export interface ISalutationDetails {
  salid: number;
  salutation: string;
  gender: string;
}

export const DefaultSalutationDetails = {
  salid: 0,
  salutation: "",
  gender: "",
} as ISalutationDetails;

export function GetSalutationDetailListFromJSON(
  JSONData: any
): ISalutationDetails[] {
  let detaillist: ISalutationDetails[] = [];
  try {
    Object.keys(JSONData).map(function (key: any) {
      return detaillist.push(GetSalutationDetailsFromJSON(JSONData[key]));
    });
  } catch (error) {
    console.log(error);
  }
  return detaillist;
}

export function GetSalutationDetailsFromJSON(CData: any): ISalutationDetails {
  let details: ISalutationDetails = DefaultSalutationDetails;
  try {
    details = {
      salid: CData["salid"] ? CData["salid"] : 0,
      salutation: CData["salutation"] ? CData["salutation"] : "",
      gender: CData["gender"] ? CData["gender"] : "",
    };
  } catch (error) {
    console.log(error);
  }
  return details;
}
