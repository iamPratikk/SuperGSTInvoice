import * as React from "react";
import { PageList } from "../../middleware/interface/commonInterface";
import UserProfileView from "../pages/user/userprofilepage";
import {ChangePasswordPageView} from "../pages/user/changepasswordpage";
import {CountryPageView} from "../pages/others/country/countrypage";
import {StatePageView} from "../pages/others/state/statepage";
import {CurrencyPageView} from "../pages/others/currency/currencypage";
import {HsnCodePageView} from "../pages/others/hsn/hsncodepage";
import {BulkPageView} from "../pages/others/bulk/bulkpage";
//Others Masters
import SalutationPageView from "../pages/masters/salutation/salutationpage";
import {IndustryTypePageView } from "../pages/masters/industrytype/industrytypepage";
import {BusinessTypePageView} from "../pages/masters/businesstype/businesstypepage";
import {FiscalYearPageView} from "../pages/masters/fiscalyear/fiscalyearpage";
import {LanguagePageView} from "../pages/masters/language/languagepage";
import {DateFormatPageView} from "../pages/masters/dateformat/dateformatpage";
import {GSTTreatmentPageView} from "../pages/others/gsttreatment/gsttreatmentpage";
import {TaxPreferencePageView} from "../pages/masters/taxpreference/taxpreferencepage";
//Reports
import { SalesbyCustomersView } from "../reports/salesbycustomerspage";
import { SalesbyItemView } from "../reports/salesbyitempage";
import { CustomerBalanceView } from "../reports/customerbalancepage";
import { InvoiceDetailsView } from "../reports/invoicedetailspage";
import { ReceivableSummaryView } from "../reports/receivablesummarypage";
import { ReceivableDetailsView } from "../reports/receivabledetailspage";
import { PaymentReceivedView } from "../reports/paymentreceivedpage";
import { TaxSummaryView } from "../reports/taxsummarypage";
import { FormNo27EQView } from "../reports/formno27eqpage";
import { UserListView } from "../reports/userlistpage";
import { CustomerListView } from "../reports/customerlistpage";
import { UserLogView } from "../reports/userlogpage";

interface ActualPageViewProps {
  currentPageName: PageList;
  clickSidebarCollapse: () => void;
  collapseSidebar: () => void;
  openSidebar: () => void;
}

export class ActualPageView extends React.PureComponent<ActualPageViewProps> {
  renderSwitch(param: PageList) {
    const { clickSidebarCollapse } = this.props;
    const {collapseSidebar}= this.props;
    const {openSidebar}= this.props;
    switch (param) {
      case PageList.UserProfile:
        return <UserProfileView />;
      case PageList.ChangePassword:
        return <ChangePasswordPageView />;
      case PageList.Country:
        return <CountryPageView />;
      case PageList.State:
        return <StatePageView />;
      case PageList.Currency:
        return <CurrencyPageView />;
      case PageList.HSN:
        return <HsnCodePageView />;
      case PageList.Bulk:
        return <BulkPageView />;
      //Others Masters
      case PageList.Salutation:
        return <SalutationPageView />;
      case PageList.IndustryType:
        return <IndustryTypePageView />;
      case PageList.BusinessType:
        return <BusinessTypePageView />;
      case PageList.FiscalYear:
        return <FiscalYearPageView />;
      case PageList.Language:
        return <LanguagePageView />;
      case PageList.DateFormat:
        return <DateFormatPageView />;
      case PageList.GSTTreatment:
        return <GSTTreatmentPageView />;
      case PageList.TaxPreference:
        return <TaxPreferencePageView />;
      //Reports
      case PageList.SalesbyCustomers:
        return <SalesbyCustomersView />;
      case PageList.SalesbyItem:
        return <SalesbyItemView  />;
      case PageList.CustomerBalance:
        return <CustomerBalanceView />;
      case PageList.InvoiceDetails:
        return <InvoiceDetailsView />;
      case PageList.ReceivableSummary:
        return <ReceivableSummaryView />;
      case PageList.ReceivableDetails:
        return <ReceivableDetailsView />;
      case PageList.PaymentReceived:
        return <PaymentReceivedView />;
      case PageList.TaxSummary:
        return <TaxSummaryView />;
      case PageList.FormNo27EQ:
        return <FormNo27EQView />;
      case PageList.UserList:
        return <UserListView />;
      case PageList.CustomerList:
        return <CustomerListView />;
      case PageList.UserLog:
        return <UserLogView />;
      default:
        return <></>;
    }
  }

  public render() {
    return (
      <React.Fragment>
        {this.renderSwitch(this.props.currentPageName)}
      </React.Fragment>
    );
  }
}
