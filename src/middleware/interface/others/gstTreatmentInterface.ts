//*********GST Treatment Deatils*********/
export interface IGSTTreatmentDetails {
  gsttreatmentid: number;
  gsttreatment: string;
  reqgstno: boolean;
  reqsupplace: boolean;
}

export const DefaultGSTTreatmentDetails = {
  gsttreatmentid: 0,
  gsttreatment: "",
  reqgstno: false,
  reqsupplace: false,
} as IGSTTreatmentDetails;

export function GetGSTTreatmentDetailListFromJSON(
  JSONData: any
): IGSTTreatmentDetails[] {
  let countryDetaillist: IGSTTreatmentDetails[] = [];
  try {
    Object.keys(JSONData).map(function (key: any) {
      return countryDetaillist.push(
        GetGSTTreatmentDetailsFromJSON(JSONData[key])
      );
    });
  } catch (error) {
    console.log(error);
  }
  return countryDetaillist;
}

export function GetGSTTreatmentDetailsFromJSON(
  CData: any
): IGSTTreatmentDetails {
  let userDetails: IGSTTreatmentDetails = DefaultGSTTreatmentDetails;
  try {
    userDetails = {
      gsttreatmentid: CData["gsttreatmentid"] ? CData["gsttreatmentid"] : 0,
      gsttreatment: CData["gsttreatment"] ? CData["gsttreatment"] : "",
      reqgstno: CData["reqgstno"] ? CData["reqgstno"] : false,
      reqsupplace: CData["reqsupplace"] ? CData["reqsupplace"] : false,
    };
  } catch (error) {
    console.log(error);
  }
  return userDetails;
}
