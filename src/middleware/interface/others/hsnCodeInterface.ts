//*********HSN Code Deatils*********/
export interface IHsnCodeDetails {
  hsncode: string;
  codedesc: string;
  isselectable: boolean;
  isservice: boolean;
}

export const DefaultHsnCodeDetails = {
  hsncode: "",
  codedesc: "",
  isselectable: false,
  isservice: false,
} as IHsnCodeDetails;

export function GetHsnCodeDetailListFromJSON(JSONData: any): IHsnCodeDetails[] {
  let hsnCode: IHsnCodeDetails[] = [];
  try {
    Object.keys(JSONData).map(function (key: any) {
      return hsnCode.push(GetHsnCodeDetailsFromJSON(JSONData[key]));
    });
  } catch (error) {
    console.log(error);
  }
  return hsnCode;
}

export function GetHsnCodeDetailsFromJSON(CData: any): IHsnCodeDetails {
  let userDetails: IHsnCodeDetails = DefaultHsnCodeDetails;
  try {
    userDetails = {
      hsncode: CData["hsncode"] ? CData["hsncode"] : "",
      codedesc: CData["codedesc"] ? CData["codedesc"] : "",
      isselectable: CData["isselectable"] ? CData["isselectable"] : false,
      isservice: CData["isservice"] ? CData["isservice"] : false,
    };
  } catch (error) {
    console.log(error);
  }
  return userDetails;
}
