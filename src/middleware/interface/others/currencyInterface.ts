//*********Currency Deatils*********/
export interface ICurrencyDetails {
  currencycode: string;
  currencyname: string;
  symbol: string;
  dec: number;
  format: number;
  compid: number;
}

export const DefaultCurrencyDetails = {
  currencycode: "",
  currencyname: "",
  symbol: "",
  dec: 0,
  format: 0,
  compid: 0,
} as ICurrencyDetails;

export function GetCurrencyDetailListFromJSON(
  JSONData: any
): ICurrencyDetails[] {
  let stateDetaillist: ICurrencyDetails[] = [];
  try {
    Object.keys(JSONData).map(function (key: any) {
      return stateDetaillist.push(GetCurrencyDetailsFromJSON(JSONData[key]));
    });
  } catch (error) {
    console.log(error);
  }
  return stateDetaillist;
}

export function GetCurrencyDetailsFromJSON(CData: any): ICurrencyDetails {
  let userDetails: ICurrencyDetails = DefaultCurrencyDetails;
  try {
    userDetails = {
      currencycode: CData["currencycode"] ? CData["currencycode"] : "",
      currencyname: CData["currencyname"] ? CData["currencyname"] : "",
      symbol: CData["symbol"] ? CData["symbol"] : "",
      dec: CData["dec"] ? CData["dec"] : 0,
      format: CData["format"] ? CData["format"] : 0,
      compid: CData["compid"] ? CData["compid"] : 0,
    };
  } catch (error) {
    console.log(error);
  }
  return userDetails;
}
