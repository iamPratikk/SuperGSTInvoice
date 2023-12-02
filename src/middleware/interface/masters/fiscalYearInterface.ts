//*********Fiscal Year Deatils*********/
export interface IFiscalYearDetails {
  fiscalid: number;
  fiscalyear: string;
  startmonth: number;
}

export const DefaultFiscalYearDetails = {
  fiscalid: 0,
  fiscalyear: "",
  startmonth: 0,
} as IFiscalYearDetails;

export function GetFiscalYearDetailListFromJSON(
  JSONData: any
): IFiscalYearDetails[] {
  let detaillist: IFiscalYearDetails[] = [];
  try {
    Object.keys(JSONData).map(function (key: any) {
      return detaillist.push(GetFiscalYearDetailsFromJSON(JSONData[key]));
    });
  } catch (error) {
    console.log(error);
  }
  return detaillist;
}

export function GetFiscalYearDetailsFromJSON(CData: any): IFiscalYearDetails {
  let details: IFiscalYearDetails = DefaultFiscalYearDetails;
  try {
    details = {
      fiscalid: CData["fiscalid"] ? CData["fiscalid"] : 0,
      fiscalyear: CData["fiscalyear"] ? CData["fiscalyear"] : "",
      startmonth: CData["startmonth"] ? CData["startmonth"] : 0,
    };
  } catch (error) {
    console.log(error);
  }
  return details;
}
