import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { IAppRootState } from "../../redux/store/appStore";
import { IAppCommonState } from "../../redux/reducers/appCommonState";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import MainContentPageView from "../container/maincontentpage";
import { PageList } from "../../middleware/interface/commonInterface";
import { UpdateUseridANDisweb } from "../../redux/actions/appActionsForUsers";

interface IHomePageProps {
  sreenHeight: number;
  screenWidth: number;
}

interface IHomePageStateProps {
  appCommonState: IAppCommonState;
}
type Props = IHomePageStateProps & DispatchProps & IHomePageProps;
// Component State
interface IHomePageState {}

class HomePageView extends React.PureComponent<Props, IHomePageState> {
  componentDidMount(): void {
    try {
      const supergstuserId = sessionStorage.getItem("supergstuserId");
      if (supergstuserId) {
        const isweb = this.checkScreenIsweb();
        const userid = parseInt(supergstuserId);
        this.props.UpdateUseridANDisweb(userid, isweb);
      }
    } catch (error) {}
  }

  public checkScreenIsweb() {
    //Design for desktop displays from 1280×720 through 1920×1080
    //Design for mobile displays from 360×640 through 414×896
    //Design for tablet displays from 601×962 through 1280×800
    return this.props.screenWidth > 1000 && this.props.sreenHeight > 700
      ? true
      : false;
  }

  public render() {
    const isweb = this.checkScreenIsweb();

    return (
      <React.Fragment>
        <Router>
          <Routes>
            <Route
              index
              path="/"
              element={
                <MainContentPageView
                  pageName={PageList.UserProfile}
                  isweb={isweb}
                />
              }
            />
            <Route
              index
              path="/change-password"
              element={
                <MainContentPageView
                  pageName={PageList.ChangePassword}
                  isweb={isweb}
                />
              }
            />
            <Route
              index
              path="/user-profile"
              element={
                <MainContentPageView
                  pageName={PageList.UserProfile}
                  isweb={isweb}
                />
              }
            />
            <Route
              index
              path="/country"
              element={
                <MainContentPageView
                  pageName={PageList.Country}
                  isweb={isweb}
                />
              }
            />
            <Route
              index
              path="/state"
              element={
                <MainContentPageView pageName={PageList.State} isweb={isweb} />
              }
            />
            <Route
              index
              path="/currency"
              element={
                <MainContentPageView
                  pageName={PageList.Currency}
                  isweb={isweb}
                />
              }
            />
            <Route
              index
              path="/hsn"
              element={
                <MainContentPageView pageName={PageList.HSN} isweb={isweb} />
              }
            />
            <Route
              index
              path="/bulk"
              element={
                <MainContentPageView pageName={PageList.Bulk} isweb={isweb} />
              }
            />
            {/* Others Master */}
            <Route
              index
              path="/salutation"
              element={
                <MainContentPageView
                  pageName={PageList.Salutation}
                  isweb={isweb}
                />
              }
            />
            <Route
              index
              path="/industry-type"
              element={
                <MainContentPageView
                  pageName={PageList.IndustryType}
                  isweb={isweb}
                />
              }
            />
            <Route
              index
              path="/business-type"
              element={
                <MainContentPageView
                  pageName={PageList.BusinessType}
                  isweb={isweb}
                />
              }
            />
            <Route
              index
              path="/fiscal-year"
              element={
                <MainContentPageView
                  pageName={PageList.FiscalYear}
                  isweb={isweb}
                />
              }
            />
            <Route
              index
              path="/language"
              element={
                <MainContentPageView
                  pageName={PageList.Language}
                  isweb={isweb}
                />
              }
            />
            <Route
              index
              path="/date-format"
              element={
                <MainContentPageView
                  pageName={PageList.DateFormat}
                  isweb={isweb}
                />
              }
            />
            <Route
              index
              path="/gst-treatment"
              element={
                <MainContentPageView
                  pageName={PageList.GSTTreatment}
                  isweb={isweb}
                />
              }
            />
            <Route
              index
              path="/tax-preference"
              element={
                <MainContentPageView
                  pageName={PageList.TaxPreference}
                  isweb={isweb}
                />
              }
            />
            {/* Reports */}
            <Route
              index
              path="/sales-by-customers"
              element={
                <MainContentPageView
                  pageName={PageList.SalesbyCustomers}
                  isweb={isweb}
                />
              }
            />
            <Route
              index
              path="/sales-by-item"
              element={
                <MainContentPageView
                  pageName={PageList.SalesbyItem}
                  isweb={isweb}
                />
              }
            />
            <Route
              index
              path="/customer-balance"
              element={
                <MainContentPageView
                  pageName={PageList.CustomerBalance}
                  isweb={isweb}
                />
              }
            />
            <Route
              index
              path="/invoice-details"
              element={
                <MainContentPageView
                  pageName={PageList.InvoiceDetails}
                  isweb={isweb}
                />
              }
            />
            <Route
              index
              path="/receivable-summary"
              element={
                <MainContentPageView
                  pageName={PageList.ReceivableSummary}
                  isweb={isweb}
                />
              }
            />
            <Route
              index
              path="/receivable-details"
              element={
                <MainContentPageView
                  pageName={PageList.ReceivableDetails}
                  isweb={isweb}
                />
              }
            />
            <Route
              index
              path="/payment-received"
              element={
                <MainContentPageView
                  pageName={PageList.PaymentReceived}
                  isweb={isweb}
                />
              }
            />
            <Route
              index
              path="/tax-summary"
              element={
                <MainContentPageView
                  pageName={PageList.TaxSummary}
                  isweb={isweb}
                />
              }
            />
            <Route
              index
              path="/form-no-27-eq"
              element={
                <MainContentPageView
                  pageName={PageList.FormNo27EQ}
                  isweb={isweb}
                />
              }
            />
            <Route
              index
              path="/user-list"
              element={
                <MainContentPageView
                  pageName={PageList.UserList}
                  isweb={isweb}
                />
              }
            />
            <Route
              index
              path="/customer-list"
              element={
                <MainContentPageView
                  pageName={PageList.CustomerList}
                  isweb={isweb}
                />
              }
            />
            <Route
              index
              path="/user-log"
              element={
                <MainContentPageView
                  pageName={PageList.UserLog}
                  isweb={isweb}
                />
              }
            />
            <Route
              index
              path="/user-log"
              element={
                <MainContentPageView
                  pageName={PageList.UserLog}
                  isweb={isweb}
                />
              }
            />
          </Routes>
        </Router>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (states: IAppRootState): IHomePageStateProps => ({
  appCommonState: states.rootState.appCommonState,
});

interface DispatchProps {
  UpdateUseridANDisweb: (userid: number, isweb: boolean) => void;
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>
): DispatchProps => ({
  UpdateUseridANDisweb: (userid: number, isweb: boolean) =>
    dispatch(UpdateUseridANDisweb(userid, isweb)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePageView);
