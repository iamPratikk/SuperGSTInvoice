import {
  IApiResult,
  DropDown,
  IGlobalStateVariable,
} from "../../middleware/interface/commonInterface";
import { ICountryDetails } from "../../middleware/interface/others/countryInterface";
import { ICurrencyDetails } from "../../middleware/interface/others/currencyInterface";
import { IStateDetails } from "../../middleware/interface/others/stateInterface";
import { IUserDetails } from "../../middleware/interface/userInterface";
import { IBusinessTypeDetails } from "../../middleware/interface/masters/businessTypeInterface";
import { IFiscalYearDetails } from "../../middleware/interface/masters/fiscalYearInterface";
import { IIndustryTypeDetails } from "../../middleware/interface/masters/industryTypeInterface";
import { ISalutationDetails } from "../../middleware/interface/masters/salutationInterface";
import {
  RESET_API_RESULT,
  CHECKCRED,
  GETUSERDET,
  UPDATEUSERDET,
  GETCOUNTRIES,
  SAVECOUNTRY,
  DELETECOUNTRY,
  GETSTATES,
  SAVESTATE,
  DELETESTATE,
  GETBASECURRENCIES,
  GETSALUTATIONS,
  SAVESALUTATION,
  DELETESALUTATION,
  GETINDUSTRYTYPES,
  SAVEINDUSTRYTYPE,
  DELETEINDUSTRYTYPE,
  GETBUSINESSTYPES,
  SAVEBUSINESSTYPE,
  DELETEBUSINESSTYPE,
  GETFISCALYEARS,
  SAVEFISCALYEAR,
  DELETEFISCALYEAR,
  GETLANGUAGES,
  SAVELANGUAGE,
  DELETELANGUAGE,
  GETDATEFORMATS,
  SAVEDATEFORMAT,
  DELETEDATEFORMAT,
  SAVEBASECURRENCY,
  DELETEBASECURRENCY,
  GETSTARTMONTHLIST,
  GETGENDERLIST,
  GETDECIMALLIST,
  GETFORMATLIST,
  GETHSNCODES,
  SAVEHSNCODE,
  DELETEHSNCODE,
  GETGSTTREATMENTS,
  SAVEGSTTREATMENT,
  DELETEGSTTREATMENT,
  UPDATEPASSWORD,
  LOGOUT,
  UPLOADMASTERTYPELIST,
  SAVEBULKCOUNTRY,
  SAVEBULKBUSTYPE,
  SAVEBULKSTATES,
  SAVEBULKCURRENCIES,
  SAVEBULKHSNCODE,
  SAVEBULKINDUSTRYTYPE,
  SAVEBULKLANGUAGE,
  SAVEBULKGSTTREATMENT,
  VERIFYOLDPASSWORD,
  GETUSERPICTURE,
  SENDEMAILOTP,
  SENDMOBILEOTP,
  GETTAXPREFERENCES,
  SAVETAXPREFERENCE,
  DELETETAXPREFERENCE,
  GETBASECURRENCIEBYCODE,
  UPDATEGLOBALSTATEVARIABLE,
} from "../reduxConstants";
import { ILanguageDetails } from "../../middleware/interface/masters/languageInterface";
import { IDateFormatDetails } from "../../middleware/interface/masters/dateFormatInterface";
import { IHsnCodeDetails } from "../../middleware/interface/others/hsnCodeInterface";
import { IGSTTreatmentDetails } from "../../middleware/interface/others/gstTreatmentInterface";
import { ITaxPreferenceDetails } from "../../middleware/interface/masters/taxpreferenceInterface";

export interface IRESET_API_RESULT {
  type: typeof RESET_API_RESULT;
  apiResult: IApiResult;
}

export interface IUPDATEGLOBALSTATEVARIABLE {
  type: typeof UPDATEGLOBALSTATEVARIABLE;
  globalStateVariable: IGlobalStateVariable;
}

//User
export interface ICHECKCRED {
  type: typeof CHECKCRED;
  apiResult: IApiResult;
  userId: number;
  isweb: boolean;
}

export interface IGETUSERDET {
  type: typeof GETUSERDET;
  apiResult: IApiResult;
  userDetails: IUserDetails;
}

export interface IUPDATEUSERDET {
  type: typeof UPDATEUSERDET;
  apiResult: IApiResult;
}

export interface IUPDATEPASSWORD {
  type: typeof UPDATEPASSWORD;
  apiResult: IApiResult;
}

export interface ILOGOUT {
  type: typeof LOGOUT;
  apiResult: IApiResult;
}
export interface IVERIFYOLDPASSWORD {
  type: typeof VERIFYOLDPASSWORD;
  apiResult: IApiResult;
}

export interface IGETUSERPICTURE {
  type: typeof GETUSERPICTURE;
  apiResult: IApiResult;
  userPicBinary: any;
  userPicString: any;
}

export interface ISENDEMAILOTP {
  type: typeof SENDEMAILOTP;
  apiResult: IApiResult;
}

export interface ISENDMOBILEOTP {
  type: typeof SENDMOBILEOTP;
  apiResult: IApiResult;
}

//Country
export interface IGETCOUNTRIES {
  type: typeof GETCOUNTRIES;
  apiResult: IApiResult;
  countryList: ICountryDetails[];
}

export interface ISAVECOUNTRY {
  type: typeof SAVECOUNTRY;
  apiResult: IApiResult;
}

export interface IDELETECOUNTRY {
  type: typeof DELETECOUNTRY;
  apiResult: IApiResult;
}

export interface ISAVEBULKCOUNTRY {
  type: typeof SAVEBULKCOUNTRY;
  apiResult: IApiResult;
}

//State
export interface IGETSTATES {
  type: typeof GETSTATES;
  apiResult: IApiResult;
  stateList: IStateDetails[];
}

export interface ISAVESTATE {
  type: typeof SAVESTATE;
  apiResult: IApiResult;
}

export interface IDELETESTATE {
  type: typeof DELETESTATE;
  apiResult: IApiResult;
}

export interface ISAVEBULKSTATES {
  type: typeof SAVEBULKSTATES;
  apiResult: IApiResult;
}

//Currency
export interface IGETBASECURRENCIES {
  type: typeof GETBASECURRENCIES;
  apiResult: IApiResult;
  currencyList: ICurrencyDetails[];
}

export interface IGETBASECURRENCIEBYCODE {
  type: typeof GETBASECURRENCIEBYCODE;
  apiResult: IApiResult;
  currencyDetails: ICurrencyDetails;
}

export interface ISAVEBASECURRENCY {
  type: typeof SAVEBASECURRENCY;
  apiResult: IApiResult;
}

export interface IDELETEBASECURRENCY {
  type: typeof DELETEBASECURRENCY;
  apiResult: IApiResult;
}

export interface ISAVEBULKCURRENCIES {
  type: typeof SAVEBULKCURRENCIES;
  apiResult: IApiResult;
}

//HSN Code
export interface IGETHSNCODES {
  type: typeof GETHSNCODES;
  apiResult: IApiResult;
  hsnCodeList: IHsnCodeDetails[];
}

export interface ISAVEHSNCODE {
  type: typeof SAVEHSNCODE;
  apiResult: IApiResult;
}

export interface IDELETEHSNCODE {
  type: typeof DELETEHSNCODE;
  apiResult: IApiResult;
}

export interface ISAVEBULKHSNCODE {
  type: typeof SAVEBULKHSNCODE;
  apiResult: IApiResult;
}

//GST Treatment
export interface IGETGSTTREATMENTS {
  type: typeof GETGSTTREATMENTS;
  apiResult: IApiResult;
  gsttreatmentList: IGSTTreatmentDetails[];
}

export interface ISAVEGSTTREATMENT {
  type: typeof SAVEGSTTREATMENT;
  apiResult: IApiResult;
}

export interface IDELETEGSTTREATMENT {
  type: typeof DELETEGSTTREATMENT;
  apiResult: IApiResult;
}

export interface ISAVEBULKGSTTREATMENT {
  type: typeof SAVEBULKGSTTREATMENT;
  apiResult: IApiResult;
}

//**Masters */
//Salutation
export interface IGETSALUTATIONS {
  type: typeof GETSALUTATIONS;
  apiResult: IApiResult;
  salutationList: ISalutationDetails[];
}

export interface ISAVESALUTATION {
  type: typeof SAVESALUTATION;
  apiResult: IApiResult;
}

export interface IDELETESALUTATION {
  type: typeof DELETESALUTATION;
  apiResult: IApiResult;
}

//Industry Type
export interface IGETINDUSTRYTYPES {
  type: typeof GETINDUSTRYTYPES;
  apiResult: IApiResult;
  industryTypeList: IIndustryTypeDetails[];
}

export interface ISAVEINDUSTRYTYPE {
  type: typeof SAVEINDUSTRYTYPE;
  apiResult: IApiResult;
}

export interface IDELETEINDUSTRYTYPE {
  type: typeof DELETEINDUSTRYTYPE;
  apiResult: IApiResult;
}

export interface ISAVEBULKINDUSTRYTYPE {
  type: typeof SAVEBULKINDUSTRYTYPE;
  apiResult: IApiResult;
}

//Business Type
export interface IGETBUSINESSTYPES {
  type: typeof GETBUSINESSTYPES;
  apiResult: IApiResult;
  businessTypeList: IBusinessTypeDetails[];
}

export interface ISAVEBUSINESSTYPE {
  type: typeof SAVEBUSINESSTYPE;
  apiResult: IApiResult;
}

export interface IDELETEBUSINESSTYPE {
  type: typeof DELETEBUSINESSTYPE;
  apiResult: IApiResult;
}

export interface ISAVEBULKBUSTYPE {
  type: typeof SAVEBULKBUSTYPE;
  apiResult: IApiResult;
}

//Fiscal Year
export interface IGETFISCALYEARS {
  type: typeof GETFISCALYEARS;
  apiResult: IApiResult;
  fiscalYearList: IFiscalYearDetails[];
}

export interface ISAVEFISCALYEAR {
  type: typeof SAVEFISCALYEAR;
  apiResult: IApiResult;
}

export interface IDELETEFISCALYEAR {
  type: typeof DELETEFISCALYEAR;
  apiResult: IApiResult;
}

//Language
export interface IGETLANGUAGES {
  type: typeof GETLANGUAGES;
  apiResult: IApiResult;
  languageList: ILanguageDetails[];
}

export interface ISAVELANGUAGE {
  type: typeof SAVELANGUAGE;
  apiResult: IApiResult;
}

export interface IDELETELANGUAGE {
  type: typeof DELETELANGUAGE;
  apiResult: IApiResult;
}

export interface ISAVEBULKLANGUAGE {
  type: typeof SAVEBULKLANGUAGE;
  apiResult: IApiResult;
}

//Date Formate
export interface IGETDATEFORMATS {
  type: typeof GETDATEFORMATS;
  apiResult: IApiResult;
  dateFormatList: IDateFormatDetails[];
}

export interface ISAVEDATEFORMAT {
  type: typeof SAVEDATEFORMAT;
  apiResult: IApiResult;
}

export interface IDELETEDATEFORMAT {
  type: typeof DELETEDATEFORMAT;
  apiResult: IApiResult;
}

//Tax Preference
export interface IGETTAXPREFERENCES {
  type: typeof GETTAXPREFERENCES;
  apiResult: IApiResult;
  taxPreferenceList: ITaxPreferenceDetails[];
}

export interface ISAVETAXPREFERENCE {
  type: typeof SAVETAXPREFERENCE;
  apiResult: IApiResult;
}

export interface IDELETETAXPREFERENCE {
  type: typeof DELETETAXPREFERENCE;
  apiResult: IApiResult;
}

//*****Static Drop Down List
export interface IGETSTARTMONTHLIST {
  type: typeof GETSTARTMONTHLIST;
  apiResult: IApiResult;
  startMonthList: DropDown[];
}

export interface IGETGENDERLIST {
  type: typeof GETGENDERLIST;
  apiResult: IApiResult;
  genderList: DropDown[];
}

export interface IGETDECIMALLIST {
  type: typeof GETDECIMALLIST;
  apiResult: IApiResult;
  decimalList: DropDown[];
}

export interface IGETFORMATLIST {
  type: typeof GETFORMATLIST;
  apiResult: IApiResult;
  formatList: DropDown[];
}

export interface IUPLOADMASTERTYPELIST {
  type: typeof UPLOADMASTERTYPELIST;
  apiResult: IApiResult;
  uploadMasterlistList: DropDown[];
}

export type Action =
  | IRESET_API_RESULT
  | IUPDATEGLOBALSTATEVARIABLE
  | ICHECKCRED
  | IGETUSERDET
  | IUPDATEUSERDET
  | IUPDATEPASSWORD
  | ILOGOUT
  | IVERIFYOLDPASSWORD
  | IGETUSERPICTURE
  | ISENDEMAILOTP
  | ISENDMOBILEOTP
  | IGETCOUNTRIES
  | ISAVECOUNTRY
  | IDELETECOUNTRY
  | ISAVEBULKCOUNTRY
  | IGETSTATES
  | ISAVESTATE
  | IDELETESTATE
  | ISAVEBULKSTATES
  | IGETBASECURRENCIES
  | IGETBASECURRENCIEBYCODE
  | ISAVEBASECURRENCY
  | IDELETEBASECURRENCY
  | ISAVEBULKCURRENCIES
  | IGETHSNCODES
  | ISAVEHSNCODE
  | IDELETEHSNCODE
  | ISAVEBULKHSNCODE
  | IGETGSTTREATMENTS
  | ISAVEGSTTREATMENT
  | IDELETEGSTTREATMENT
  | ISAVEBULKGSTTREATMENT
  | IGETSALUTATIONS
  | ISAVESALUTATION
  | IDELETESALUTATION
  | IGETINDUSTRYTYPES
  | ISAVEINDUSTRYTYPE
  | IDELETEINDUSTRYTYPE
  | IGETTAXPREFERENCES
  | ISAVETAXPREFERENCE
  | IDELETETAXPREFERENCE
  | ISAVEBULKINDUSTRYTYPE
  | IGETBUSINESSTYPES
  | ISAVEBUSINESSTYPE
  | IDELETEBUSINESSTYPE
  | ISAVEBULKBUSTYPE
  | IGETFISCALYEARS
  | ISAVEFISCALYEAR
  | IDELETEFISCALYEAR
  | IGETLANGUAGES
  | ISAVELANGUAGE
  | IDELETELANGUAGE
  | ISAVEBULKLANGUAGE
  | IGETDATEFORMATS
  | ISAVEDATEFORMAT
  | IDELETEDATEFORMAT
  | IGETSTARTMONTHLIST
  | IGETGENDERLIST
  | IGETDECIMALLIST
  | IGETFORMATLIST
  | IUPLOADMASTERTYPELIST;
