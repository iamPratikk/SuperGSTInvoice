//User API
export const USERSAPI = {
  CHECKCRED: "/CheckCred",
  GETUSERDET: "/GetUserDet",
  UPDATEUSERDET: "/UpdateUserDet",
  UPDATEPASSWORD: "/UpdatePassword",
  GETUSERPICTURE: "/GetUserPicture",
  SENDEMAILOTP: "/SendEmailOTP",
  SENDMOBILEOTP: "/SendMobileOTP",
};
//Country API
export const COUNTRYAPI = {
  GETCOUNTRIES: "/GetCountries",
  SAVECOUNTRY: "/SaveCountry",
  DELETECOUNTRY: "/countries",
  SAVEBULKCOUNTRY: "/SaveBulkCountries",
};
//State API
export const STATEAPI = {
  GETALLSTATES: "/GetAllStates",
  GETSTATES: "/GetStates",
  SAVESTATE: "/SaveState",
  DELETESTATE: "/states",
  SAVEBULKSTATES: "/SaveBulkStates",
};
//Currency API
export const CURRENCYAPI = {
  GETBASECURRENCIES: "/GetDefCur",
  GETBASECURRENCIEBYCODE: "/GetCurDet",
  SAVEBASECURRENCY: "/SaveBaseCur",
  DELETEBASECURRENCY: "/basecurrencies",
  SAVEBULKCURRENCIES: "/SaveBulkBaseCur",
};
//HSN Code API
export const HSNCODEAPI = {
  GETHSNCODES: "/GetAllHSNCodes",
  SAVEHSNCODE: "/SaveHSNCode",
  DELETEHSNCODE: "/hsn",
  SAVEBULKHSNCODE: "/SaveBulkHSNCode",
};
//GST Treatment API
export const GSTTREATMENTAPI = {
  GETGSTTREATMENTS: "/GetGSTTreatment",
  SAVEGSTTREATMENT: "/SaveGSTTreatment",
  DELETEGSTTREATMENT: "/gsttreatments",
  SAVEBULKGSTTREATMENT: "/SaveBulkGSTTreat",
};
//*********Others Master
//**Salutation */
export const SALUTATIONAPI = {
  GETSALUTATION: "/GetSalutation",
  SAVESALUTATION: "/SaveSalutation",
  DELETESALUTATION: "/salutations",
};
//**Industry Type */
export const INDUSTRYTYPEAPI = {
  GETINDUSTRYTYPE: "/GetIndustryType",
  SAVEINDUSTRYTYPE: "/SaveIndustryType",
  DELETEINDUSTRYTYPE: "/industry-types",
  SAVEBULKINDUSTRYTYPE: "/SaveBulkIndType",
};
//**Business Type */
export const BUSINESSTYPEAPI = {
  GETBUSINESSTYPE: "/GetBusinessType",
  SAVEBUSINESSTYPE: "/SaveBusinessType",
  DELETEBUSINESSTYPE: "/business-types",
  SAVEBULKBUSTYPE: "/SaveBulkBusType",
};
//**Fiscal Year */
export const FISCALYEARAPI = {
  GETFISCALYEAR: "/GetFisYear",
  SAVEFISCALYEAR: "/SaveFiscalYear",
  DELETEFISCALYEAR: "/fiscalyears",
};
//**Language */
export const LANGUAGEAPI = {
  GETLANGUAGE: "/GetLang",
  SAVELANGUAGE: "/SaveLanguage",
  DELETELANGUAGE: "/languages",
  SAVEBULKLANGUAGE: "/SaveBulkLang",
};
//**Date  Formate */
export const DATEFORMATAPI = {
  GETDATEFORMAT: "/GetDateFormat",
  SAVEDATEFORMAT: "/SaveDateFormat",
  DELETEDATEFORMAT: "/dateFormats",
};
//**Tax Preference */
export const TAXPREFERENCEAPI = {
  GETTAXPREFERENCE: "/GetTaxPref",
  SAVETAXPREFERENCE: "/SaveTaxPref",
  DELETETAXPREFERENCE: "/taxes",
};
