//*********Business Type Deatils*********/
export interface IBusinessTypeDetails {
  bustypeid: number;
  bustype: string;
}

export const DefaultBusinessTypeDetails = {
  bustypeid: 0,
  bustype: "",
} as IBusinessTypeDetails;

export function GetBusinessTypeDetailListFromJSON(
  JSONData: any
): IBusinessTypeDetails[] {
  let detaillist: IBusinessTypeDetails[] = [];
  try {
    Object.keys(JSONData).map(function (key: any) {
      return detaillist.push(GetBusinessTypeDetailsFromJSON(JSONData[key]));
    });
  } catch (error) {
    console.log(error);
  }
  return detaillist;
}

export function GetBusinessTypeDetailsFromJSON(
  CData: any
): IBusinessTypeDetails {
  let details: IBusinessTypeDetails = DefaultBusinessTypeDetails;
  try {
    details = {
      bustypeid: CData["bustypeid"] ? CData["bustypeid"] : 0,
      bustype: CData["bustype"] ? CData["bustype"] : "",
    };
  } catch (error) {
    console.log(error);
  }
  return details;
}
