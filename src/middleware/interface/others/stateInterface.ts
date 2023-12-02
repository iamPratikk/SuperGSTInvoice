//*********State Deatils*********/
export interface IStateDetails {
  stateid: number;
  statename: string;
  countryid: number;
  countryname: string;
  modon: string;
}

export const DefaultStateDetails = {
  stateid: 0,
  statename: "",
  countryid: 0,
  countryname: "",
  modon: "",
} as IStateDetails;

export function GetStateDetailListFromJSON(JSONData: any): IStateDetails[] {
  let stateDetaillist: IStateDetails[] = [];
  try {
    Object.keys(JSONData).map(function (key: any) {
      return stateDetaillist.push(GetStateDetailsFromJSON(JSONData[key]));
    });
  } catch (error) {
    console.log(error);
  }
  return stateDetaillist;
}

export function GetStateDetailsFromJSON(CData: any): IStateDetails {
  let userDetails: IStateDetails = DefaultStateDetails;
  try {
    userDetails = {
      stateid: CData["stateid"] ? CData["stateid"] : 0,
      statename: CData["statename"] ? CData["statename"] : "",
      countryid: CData["countryid"] ? CData["countryid"] : 0,
      countryname: CData["countryname"] ? CData["countryname"] : "",
      modon: CData["modon"] ? CData["modon"] : "",
    };
  } catch (error) {
    console.log(error);
  }
  return userDetails;
}
