import { Action } from "../actions/appActionTypes";
import {
  CHECKCRED,
  DELETEBUSINESSTYPE,
  DELETECOUNTRY,
  DELETEBASECURRENCY,
  DELETEDATEFORMAT,
  DELETEFISCALYEAR,
  DELETEGSTTREATMENT,
  DELETEHSNCODE,
  DELETEINDUSTRYTYPE,
  DELETELANGUAGE,
  DELETESALUTATION,
  DELETESTATE,
  GETBUSINESSTYPES,
  GETCOUNTRIES,
  GETBASECURRENCIES,
  GETDATEFORMATS,
  GETDECIMALLIST,
  GETFISCALYEARS,
  GETFORMATLIST,
  GETGENDERLIST,
  GETGSTTREATMENTS,
  GETHSNCODES,
  GETINDUSTRYTYPES,
  GETLANGUAGES,
  GETSALUTATIONS,
  GETSTARTMONTHLIST,
  GETSTATES,
  GETUSERDET,
  LOGOUT,
  RESET_API_RESULT,
  SAVEBASECURRENCY,
  SAVEBULKBUSTYPE,
  SAVEBULKCOUNTRY,
  SAVEBULKCURRENCIES,
  SAVEBULKGSTTREATMENT,
  SAVEBULKHSNCODE,
  SAVEBULKINDUSTRYTYPE,
  SAVEBULKLANGUAGE,
  SAVEBULKSTATES,
  SAVEBUSINESSTYPE,
  SAVECOUNTRY,
  SAVEDATEFORMAT,
  SAVEFISCALYEAR,
  SAVEGSTTREATMENT,
  SAVEHSNCODE,
  SAVEINDUSTRYTYPE,
  SAVELANGUAGE,
  SAVESALUTATION,
  SAVESTATE,
  UPDATEPASSWORD,
  UPDATEUSERDET,
  UPLOADMASTERTYPELIST,
  VERIFYOLDPASSWORD,
  SENDEMAILOTP,
  SENDMOBILEOTP,
  DELETETAXPREFERENCE,
  SAVETAXPREFERENCE,
  GETTAXPREFERENCES,
  GETBASECURRENCIEBYCODE,
  UPDATEGLOBALSTATEVARIABLE,
} from "../reduxConstants";
import {
  IApiResult,
  DefaultApiResult,
  DefaultGlobalStateVariable,
  DropDown,
  IGlobalStateVariable,
} from "../../middleware/interface/commonInterface";
import { ICountryDetails } from "../../middleware/interface/others/countryInterface";
import {
  DefaultCurrencyDetails,
  ICurrencyDetails,
} from "../../middleware/interface/others/currencyInterface";
import { IStateDetails } from "../../middleware/interface/others/stateInterface";
import {
  DefaultUserDetails,
  IUserDetails,
} from "../../middleware/interface/userInterface";
import { IBusinessTypeDetails } from "../../middleware/interface/masters/businessTypeInterface";
import { IFiscalYearDetails } from "../../middleware/interface/masters/fiscalYearInterface";
import { IIndustryTypeDetails } from "../../middleware/interface/masters/industryTypeInterface";
import { ISalutationDetails } from "../../middleware/interface/masters/salutationInterface";
import { ILanguageDetails } from "../../middleware/interface/masters/languageInterface";
import { IDateFormatDetails } from "../../middleware/interface/masters/dateFormatInterface";
import { IHsnCodeDetails } from "../../middleware/interface/others/hsnCodeInterface";
import { IGSTTreatmentDetails } from "../../middleware/interface/others/gstTreatmentInterface";
import { ITaxPreferenceDetails } from "../../middleware/interface/masters/taxpreferenceInterface";

export interface IAppCommonState {
  apiResult: IApiResult;
  userDetails: IUserDetails;
  currencyDetails: ICurrencyDetails;
  globalStateVariable: IGlobalStateVariable;
  countryList: ICountryDetails[];
  stateList: IStateDetails[];
  currencyList: ICurrencyDetails[];
  hsnCodeList: IHsnCodeDetails[];
  salutationList: ISalutationDetails[];
  industryTypeList: IIndustryTypeDetails[];
  businessTypeList: IBusinessTypeDetails[];
  fiscalYearList: IFiscalYearDetails[];
  languageList: ILanguageDetails[];
  dateFormatList: IDateFormatDetails[];
  taxPreferenceList: ITaxPreferenceDetails[];
  startMonthList: DropDown[];
  genderList: DropDown[];
  decimalList: DropDown[];
  formatList: DropDown[];
  gsttreatmentList: IGSTTreatmentDetails[];
  uploadMasterlistList: DropDown[];
}

export const appCommonState = (
  state: IAppCommonState = {
    apiResult: DefaultApiResult,
    userDetails: DefaultUserDetails,
    currencyDetails: DefaultCurrencyDetails,
    globalStateVariable: DefaultGlobalStateVariable,
    countryList: [],
    stateList: [],
    currencyList: [],
    hsnCodeList: [],
    salutationList: [],
    industryTypeList: [],
    businessTypeList: [],
    fiscalYearList: [],
    languageList: [],
    dateFormatList: [],
    taxPreferenceList: [],
    startMonthList: [],
    genderList: [],
    decimalList: [],
    formatList: [],
    gsttreatmentList: [],
    uploadMasterlistList: [],
  },
  action: Action
): IAppCommonState => {
  switch (action.type) {
    case RESET_API_RESULT:
      return {
        ...state,
        apiResult: action.apiResult,
      };
    case UPDATEGLOBALSTATEVARIABLE:
      return {
        ...state,
        globalStateVariable: action.globalStateVariable,
      };
    case CHECKCRED:
      return {
        ...state,
        apiResult: action.apiResult,
        globalStateVariable: {
          ...{ userId: action.userId, isweb: action.isweb },
        },
      };
    case GETUSERDET:
      return {
        ...state,
        apiResult: action.apiResult,
        userDetails: action.userDetails,
      };
    case UPDATEUSERDET:
      return {
        ...state,
        apiResult: action.apiResult,
      };
    case UPDATEPASSWORD:
      return {
        ...state,
        apiResult: action.apiResult,
      };
    case VERIFYOLDPASSWORD:
      return {
        ...state,
        apiResult: action.apiResult,
      };
    case SENDEMAILOTP:
      return {
        ...state,
        apiResult: action.apiResult,
      };
    case SENDMOBILEOTP:
      return {
        ...state,
        apiResult: action.apiResult,
      };
    case LOGOUT:
      return {
        ...state,
        apiResult: action.apiResult,
        userDetails: DefaultUserDetails,
        countryList: [],
        stateList: [],
        currencyList: [],
        hsnCodeList: [],
        salutationList: [],
        industryTypeList: [],
        businessTypeList: [],
        fiscalYearList: [],
        languageList: [],
        dateFormatList: [],
        startMonthList: [],
        genderList: [],
        decimalList: [],
        formatList: [],
        gsttreatmentList: [],
        globalStateVariable: DefaultGlobalStateVariable,
      };

    //#region Country

    case GETCOUNTRIES:
      return {
        ...state,
        apiResult: action.apiResult,
        countryList: action.countryList,
      };
    case SAVECOUNTRY:
      return {
        ...state,
        apiResult: action.apiResult,
      };
    case DELETECOUNTRY:
      return {
        ...state,
        apiResult: action.apiResult,
      };
    case SAVEBULKCOUNTRY:
      return {
        ...state,
        apiResult: action.apiResult,
      };
    //#endregion

    //#region State

    case GETSTATES:
      return {
        ...state,
        apiResult: action.apiResult,
        stateList: action.stateList,
      };
    case SAVESTATE:
      return {
        ...state,
        apiResult: action.apiResult,
      };
    case DELETESTATE:
      return {
        ...state,
        apiResult: action.apiResult,
      };
    case SAVEBULKSTATES:
      return {
        ...state,
        apiResult: action.apiResult,
      };

    //#endregion

    //#region Currency

    case GETBASECURRENCIES:
      return {
        ...state,
        apiResult: action.apiResult,
        currencyList: action.currencyList,
      };
    case GETBASECURRENCIEBYCODE:
      return {
        ...state,
        apiResult: action.apiResult,
        currencyDetails: action.currencyDetails,
      };
    case SAVEBASECURRENCY:
      return {
        ...state,
        apiResult: action.apiResult,
      };
    case DELETEBASECURRENCY:
      return {
        ...state,
        apiResult: action.apiResult,
      };
    case SAVEBULKCURRENCIES:
      return {
        ...state,
        apiResult: action.apiResult,
      };
    //#endregion

    //#region HSN Code

    case GETHSNCODES:
      return {
        ...state,
        apiResult: action.apiResult,
        hsnCodeList: action.hsnCodeList,
      };
    case SAVEHSNCODE:
      return {
        ...state,
        apiResult: action.apiResult,
      };
    case DELETEHSNCODE:
      return {
        ...state,
        apiResult: action.apiResult,
      };
    case SAVEBULKHSNCODE:
      return {
        ...state,
        apiResult: action.apiResult,
      };

    //#endregion

    //#region GST Treatment

    case GETGSTTREATMENTS:
      return {
        ...state,
        apiResult: action.apiResult,
        gsttreatmentList: action.gsttreatmentList,
      };
    case SAVEGSTTREATMENT:
      return {
        ...state,
        apiResult: action.apiResult,
      };
    case DELETEGSTTREATMENT:
      return {
        ...state,
        apiResult: action.apiResult,
      };
    case SAVEBULKGSTTREATMENT:
      return {
        ...state,
        apiResult: action.apiResult,
      };
    //#endregion

    //#region Salutation

    case GETSALUTATIONS:
      return {
        ...state,
        apiResult: action.apiResult,
        salutationList: action.salutationList,
      };
    case SAVESALUTATION:
      return {
        ...state,
        apiResult: action.apiResult,
      };
    case DELETESALUTATION:
      return {
        ...state,
        apiResult: action.apiResult,
      };

    //#endregion

    //#region Industry Type

    case GETINDUSTRYTYPES:
      return {
        ...state,
        apiResult: action.apiResult,
        industryTypeList: action.industryTypeList,
      };
    case SAVEINDUSTRYTYPE:
      return {
        ...state,
        apiResult: action.apiResult,
      };
    case DELETEINDUSTRYTYPE:
      return {
        ...state,
        apiResult: action.apiResult,
      };
    case SAVEBULKINDUSTRYTYPE:
      return {
        ...state,
        apiResult: action.apiResult,
      };
    //#endregion

    //#region Business Type

    case GETBUSINESSTYPES:
      return {
        ...state,
        apiResult: action.apiResult,
        businessTypeList: action.businessTypeList,
      };
    case SAVEBUSINESSTYPE:
      return {
        ...state,
        apiResult: action.apiResult,
      };
    case DELETEBUSINESSTYPE:
      return {
        ...state,
        apiResult: action.apiResult,
      };
    case SAVEBULKBUSTYPE:
      return {
        ...state,
        apiResult: action.apiResult,
      };

    //#endregion

    //#region Fiscal Year

    case GETFISCALYEARS:
      return {
        ...state,
        apiResult: action.apiResult,
        fiscalYearList: action.fiscalYearList,
      };
    case SAVEFISCALYEAR:
      return {
        ...state,
        apiResult: action.apiResult,
      };
    case DELETEFISCALYEAR:
      return {
        ...state,
        apiResult: action.apiResult,
      };

    //#endregion

    //#region Language

    case GETLANGUAGES:
      return {
        ...state,
        apiResult: action.apiResult,
        languageList: action.languageList,
      };
    case SAVELANGUAGE:
      return {
        ...state,
        apiResult: action.apiResult,
      };
    case DELETELANGUAGE:
      return {
        ...state,
        apiResult: action.apiResult,
      };
    case SAVEBULKLANGUAGE:
      return {
        ...state,
        apiResult: action.apiResult,
      };
    //#endregion

    //#region Date Format

    case GETDATEFORMATS:
      return {
        ...state,
        apiResult: action.apiResult,
        dateFormatList: action.dateFormatList,
      };
    case SAVEDATEFORMAT:
      return {
        ...state,
        apiResult: action.apiResult,
      };
    case DELETEDATEFORMAT:
      return {
        ...state,
        apiResult: action.apiResult,
      };

    //#endregion

    //#region Tax Preference

    case GETTAXPREFERENCES:
      return {
        ...state,
        apiResult: action.apiResult,
        taxPreferenceList: action.taxPreferenceList,
      };
    case SAVETAXPREFERENCE:
      return {
        ...state,
        apiResult: action.apiResult,
      };
    case DELETETAXPREFERENCE:
      return {
        ...state,
        apiResult: action.apiResult,
      };

    //#endregion

    //#region  Static Drop Down

    case GETSTARTMONTHLIST:
      return {
        ...state,
        apiResult: action.apiResult,
        startMonthList: action.startMonthList,
      };

    case GETGENDERLIST:
      return {
        ...state,
        apiResult: action.apiResult,
        genderList: action.genderList,
      };

    case GETDECIMALLIST:
      return {
        ...state,
        apiResult: action.apiResult,
        decimalList: action.decimalList,
      };

    case GETFORMATLIST:
      return {
        ...state,
        apiResult: action.apiResult,
        formatList: action.formatList,
      };

    case UPLOADMASTERTYPELIST:
      return {
        ...state,
        apiResult: action.apiResult,
        uploadMasterlistList: action.uploadMasterlistList,
      };
    //#endregion

    default:
      return state;
  }
};
