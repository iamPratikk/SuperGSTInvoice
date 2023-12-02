//*********IndustryType Deatils*********/
export interface IIndustryTypeDetails {
  indtypeid: number;
  indtype: string;
}

export const DefaultIndustryTypeDetails = {
  indtypeid: 0,
  indtype: "",
} as IIndustryTypeDetails;

export function GetIndustryTypeDetailListFromJSON(
  JSONData: any
): IIndustryTypeDetails[] {
  let detaillist: IIndustryTypeDetails[] = [];
  try {
    Object.keys(JSONData).map(function (key: any) {
      return detaillist.push(GetIndustryTypeDetailsFromJSON(JSONData[key]));
    });
  } catch (error) {
    console.log(error);
  }
  return detaillist;
}

export function GetIndustryTypeDetailsFromJSON(
  CData: any
): IIndustryTypeDetails {
  let details: IIndustryTypeDetails = DefaultIndustryTypeDetails;
  try {
    details = {
      indtypeid: CData["indtypeid"] ? CData["indtypeid"] : 0,
      indtype: CData["indtype"] ? CData["indtype"] : "",
    };
  } catch (error) {
    console.log(error);
  }
  return details;
}
