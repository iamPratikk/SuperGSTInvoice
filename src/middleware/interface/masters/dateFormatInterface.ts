//*********Date Format Deatils*********/
export interface IDateFormatDetails {
  dateformatid: number;
  dateformat: string;
  monfmt: string;
  daypos: number;
  monpos: number;
  yearpos: number;
  yearfmt: string;
}

export const DefaultDateFormatDetails = {
  dateformatid: 0,
  dateformat: "",
  monfmt: "",
  daypos: 0,
  monpos: 0,
  yearpos: 0,
  yearfmt: "",
} as IDateFormatDetails;

export function GetDateFormatDetailListFromJSON(
  JSONData: any
): IDateFormatDetails[] {
  let detaillist: IDateFormatDetails[] = [];
  try {
    Object.keys(JSONData).map(function (key: any) {
      return detaillist.push(GetDateFormatDetailsFromJSON(JSONData[key]));
    });
  } catch (error) {
    console.log(error);
  }
  return detaillist;
}

export function GetDateFormatDetailsFromJSON(CData: any): IDateFormatDetails {
  let details: IDateFormatDetails = DefaultDateFormatDetails;
  try {
    details = {
      dateformatid: CData["dateformatid"] ? CData["dateformatid"] : 0,
      dateformat: CData["dateformat"] ? CData["dateformat"] : "",
      monfmt: CData["monfmt"] ? CData["monfmt"] : "",
      daypos: CData["daypos"] ? CData["daypos"] : 0,
      monpos: CData["monpos"] ? CData["monpos"] : 0,
      yearpos: CData["yearpos"] ? CData["yearpos"] : 0,
      yearfmt: CData["yearfmt"] ? CData["yearfmt"] : "",
    };
  } catch (error) {
    console.log(error);
  }
  return details;
}
