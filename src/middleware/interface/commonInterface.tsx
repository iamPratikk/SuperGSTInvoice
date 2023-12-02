//********* Page List*********/
export enum PageList {
  None = 0,
  UserProfile = 1,
  ChangePassword = 2,
  Country = 3,
  State = 4,
  Currency = 5,
  HSN = 6,
  Bulk = 7,
  //Other Masters
  Salutation = 8,
  IndustryType = 9,
  BusinessType = 10,
  FiscalYear = 11,
  Language = 12,
  DateFormat = 13,
  GSTTreatment = 14,
  TaxPreference = 15,
  //Reports
  SalesbyCustomers = 16,
  SalesbyItem = 17,
  CustomerBalance = 18,
  InvoiceDetails = 19,
  ReceivableSummary = 20,
  ReceivableDetails = 21,
  PaymentReceived = 22,
  TaxSummary = 23,
  FormNo27EQ = 24,
  UserList = 25,
  CustomerList = 26,
  UserLog = 27,
}

//********* Upload Master Type*********/
export enum MasterType {
  None = 0,
  Country = 1,
  State = 2,
  Currency = 3,
  HSNSAC = 4,
  IndustryType = 5,
  BusinessType = 6,
  Language = 7,
  GSTTreatment = 8,
}

//********* Form Type*********/
export enum FormType {
  None = 0,
  Add = 1,
  Edit = 2,
  View = 3,
}
//*********Action For*********/
export enum ActionFor {
  Add = 1,
  Edit = 2,
  Delete = 3,
}
//********* Alert Type*********/
export enum MessageType {
  None = 0,
  Toaster_Success = 1,
  Toaster_Error = 2,
  Toaster_Info = 3,
  Toaster_Warning = 4,
  Popup_Success = 5,
  Popup_Error = 6,
  Popup_Info = 7,
  Popup_Warning = 8,
}

//*********Profile Picture Action*********/
export enum ProfilePictureAction {
  None = 0,
  Change = 1,
  Remove = 2,
}

//*********Form Control Type*********/
export enum FormControlType {
  PlanText = "text",
  NmberOnly = "number",
  Email = "email",
  Password = "password",
}

//*********Api Result*********/
export interface IApiResult {
  actionName: string;
  isSuccess: boolean;
  apiResponse: string;
}

export const DefaultApiResult = {
  actionName: "",
  isSuccess: false,
  apiResponse: "",
} as IApiResult;

//*********Form Control Type*********/
export interface DropDown {
  Name: string;
  Value: any;
}

//Data Table
export interface CustomDataTable {
  uniqueId: any;
  firstColumn: string;
  secondColumn: string;
}

//Global State Variable
export interface IGlobalStateVariable {
  userPicBinary?: any;
  userPicString?: string;
  userId?: number;
  isweb?: boolean;
  isSidebarCollapse?: boolean;
  isMoreVert?: boolean;
}

export const DefaultGlobalStateVariable = {
  userId: 0,
  isweb: true,
  userPicBinary: null,
  userPicString: "",
  isSidebarCollapse: false,
  isMoreVert: false,
} as IGlobalStateVariable;
