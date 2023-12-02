import Papa from "papaparse";
import {
  IApiResult,
  CustomDataTable,
  PageList,
} from "../middleware/interface/commonInterface";
import { IBusinessTypeDetails } from "../middleware/interface/masters/businessTypeInterface";
import { IDateFormatDetails } from "../middleware/interface/masters/dateFormatInterface";
import { IFiscalYearDetails } from "../middleware/interface/masters/fiscalYearInterface";
import { IIndustryTypeDetails } from "../middleware/interface/masters/industryTypeInterface";
import { ILanguageDetails } from "../middleware/interface/masters/languageInterface";
import { ISalutationDetails } from "../middleware/interface/masters/salutationInterface";
import { ITaxPreferenceDetails } from "../middleware/interface/masters/taxpreferenceInterface";
import { ICountryDetails } from "../middleware/interface/others/countryInterface";
import { ICurrencyDetails } from "../middleware/interface/others/currencyInterface";
import { IGSTTreatmentDetails } from "../middleware/interface/others/gstTreatmentInterface";
import { IHsnCodeDetails } from "../middleware/interface/others/hsnCodeInterface";
import { IStateDetails } from "../middleware/interface/others/stateInterface";
import { reduxConstants } from "../redux/actions";
import store from "../redux/store/appStore";

//placeholder function to access redux store
export const getStoreValues = () => {
  const { rootState } = store.getState();
  return rootState.appCommonState;
};

// Function to read csv which returns a promise so you can do async / await.
export const readCSVFile = async (csvfile: any) => {
  return new Promise((resolve) => {
    Papa.parse(csvfile, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        resolve(results.data);
      },
    });
  });
};

//Get Datatable list

export function getDataTableList(pageName: PageList): CustomDataTable[] {
  const appCommonState = getStoreValues();
  try {
    switch (pageName) {
      case PageList.Country:
        return appCommonState.countryList.map((data: ICountryDetails) => {
          return {
            uniqueId: data.countryid,
            firstColumn: data.countryname,
            secondColumn: data.defcurcode,
          };
        });
      case PageList.State:
        return appCommonState.stateList.map((data: IStateDetails) => {
          return {
            uniqueId: data.stateid,
            firstColumn: data.statename,
            secondColumn: data.countryname,
          };
        });
      case PageList.Currency:
        return appCommonState.currencyList.map((data: ICurrencyDetails) => {
          return {
            uniqueId: data.currencycode,
            firstColumn: data.currencycode + " - " + data.currencyname,
            secondColumn: data.symbol,
          };
        });
      case PageList.HSN:
        return appCommonState.hsnCodeList.map((data: IHsnCodeDetails) => {
          return {
            uniqueId: data.hsncode,
            firstColumn: data.hsncode,
            secondColumn: data.isservice
              ? "Service"
              : data.isselectable
              ? "Goods"
              : "",
          };
        });
      case PageList.IndustryType:
        return appCommonState.industryTypeList.map(
          (data: IIndustryTypeDetails) => {
            return {
              uniqueId: data.indtypeid,
              firstColumn: data.indtype,
              secondColumn: "",
            };
          }
        );
      case PageList.BusinessType:
        return appCommonState.businessTypeList.map(
          (data: IBusinessTypeDetails) => {
            return {
              uniqueId: data.bustypeid,
              firstColumn: data.bustype,
              secondColumn: "",
            };
          }
        );
      case PageList.TaxPreference:
        return appCommonState.taxPreferenceList.map(
          (data: ITaxPreferenceDetails) => {
            return {
              uniqueId: data.taxprefid,
              firstColumn: data.taxprefname,
              secondColumn: "",
            };
          }
        );
      case PageList.DateFormat:
        return appCommonState.dateFormatList.map((data: IDateFormatDetails) => {
          return {
            uniqueId: data.dateformatid,
            firstColumn: data.dateformat,
            secondColumn: "",
          };
        });
      case PageList.FiscalYear:
        return appCommonState.fiscalYearList.map((data: IFiscalYearDetails) => {
          return {
            uniqueId: data.fiscalid,
            firstColumn: data.fiscalyear,
            secondColumn: "",
          };
        });
      case PageList.Language:
        return appCommonState.languageList.map((data: ILanguageDetails) => {
          return {
            uniqueId: data.langcode,
            firstColumn: data.langcode,
            secondColumn: data.language,
          };
        });
      case PageList.Salutation:
        return appCommonState.salutationList.map((data: ISalutationDetails) => {
          return {
            uniqueId: data.salid,
            firstColumn: data.salutation,
            secondColumn: data.gender,
          };
        });
      case PageList.GSTTreatment:
        return appCommonState.gsttreatmentList.map(
          (data: IGSTTreatmentDetails) => {
            return {
              uniqueId: data.gsttreatmentid,
              firstColumn: data.gsttreatment,
              secondColumn: "",
            };
          }
        );
      default:
        return [];
    }
  } catch (error) {
    console.log(error);
  }
  return [];
}

//Get API Header
export const getAPIHeader = () => {
  const username = process.env.REACT_APP_API_USERNAME;
  const password = process.env.REACT_APP_API_PASSORD;
  var basicAuth = "Basic " + btoa(username + ":" + password);
  const apiheaders = {
    Authorization: basicAuth,
    "Content-Type": "application/json",
  };
  return apiheaders;
};

//Get API Header with Form Data
export const getAPIHeaderWithFormData = () => {
  const username = process.env.REACT_APP_API_USERNAME;
  const password = process.env.REACT_APP_API_PASSORD;
  var basicAuth = "Basic " + btoa(username + ":" + password);
  const apiheaders = {
    Authorization: basicAuth,
    "Content-Type": "multipart/form-data",
  };
  return apiheaders;
};

//Get API Header
export const getAPIHeaderForImageFile = () => {
  const username = process.env.REACT_APP_API_USERNAME;
  const password = process.env.REACT_APP_API_PASSORD;
  var basicAuth = "Basic " + btoa(username + ":" + password);
  const apiheaders = {
    Authorization: basicAuth,
  };
  return apiheaders;
};

export function GetErrorDiscription(error: any): string {
  let errormessage: any;
  try {
    if (error.response && error.response.data && error.response.data.error) {
      errormessage = error.response.data.error;
      if (error.response.status) {
        errormessage =
          "status code " + error.response.status + ": " + errormessage;
      }
    } else {
      errormessage = error.message;
    }
  } catch (error) {
    errormessage = error;
  }
  return errormessage;
}

//Get API Header for User details Update
export const getUniqueID = (value: string) => {
  return value.replace(/ /g, "").toLowerCase();
};

//Get API Reponse with messages
export function getAPIResponseWithMessage(
  res: any,
  apiResult: IApiResult,
  validStatusCode: any[] = [200],
  defaultMessage: string = ""
): IApiResult {
  try {
    if (validStatusCode.includes(res.statusCode)) {
      apiResult.isSuccess = true;
      if (res.responseData.message) {
        apiResult.apiResponse = res.responseData.message;
      } else if (res.responseData.Message) {
        apiResult.apiResponse = res.responseData.Message;
      } else {
        switch (apiResult.actionName) {
          case reduxConstants.SAVECOUNTRY:
            apiResult.apiResponse =
              res.statusCode === 200
                ? "Successfully update the Country."
                : "Successfully created a new Country";
            break;
          case reduxConstants.SAVESTATE:
            apiResult.apiResponse =
              res.statusCode === 200
                ? "Successfully update the State."
                : "Successfully created a new State";
            break;
          case reduxConstants.SAVEBASECURRENCY:
            apiResult.apiResponse =
              res.statusCode === 200
                ? "Successfully update the Currency."
                : "Successfully created a new Currency";
            break;
          case reduxConstants.SAVEINDUSTRYTYPE:
            apiResult.apiResponse =
              res.statusCode === 200
                ? "Successfully update the IndustryType."
                : "Successfully created a new IndustryType";
            break;
          case reduxConstants.SAVEBUSINESSTYPE:
            apiResult.apiResponse =
              res.statusCode === 200
                ? "Successfully update the BusinessType."
                : "Successfully created a new BusinessType";
            break;
          default:
            if (res.responseData) {
              apiResult.apiResponse = res.responseData;
            } else {
              apiResult.apiResponse = defaultMessage;
            }
            break;
        }
      }
    } else {
      if (res.responseData.message) {
        apiResult.apiResponse =
          res.statusCode + " : " + res.responseData.message;
      } else {
        apiResult.apiResponse = res.statusCode + " : " + res.responseData;
      }
    }
  } catch (error) {
    console.log(error);
  }
  return apiResult;
}
