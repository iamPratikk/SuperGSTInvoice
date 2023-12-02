import * as React from "react";
import { Link } from "react-router-dom";
import { PageList } from "../../middleware/interface/commonInterface";
/**
 * Page ReportsMenu Component
 */

interface ReportsMenuViewProps {
  currentPageName: PageList;
}

export class ReportsMenuView extends React.PureComponent<ReportsMenuViewProps> {
  public render() {
    return (
      <React.Fragment>
        <li
          className={
            this.props.currentPageName === PageList.SalesbyCustomers
              ? "active"
              : ""
          }
        >
          <Link to={"/sales-by-customers"} className="dashboard">
            Sales by Customers
          </Link>
        </li>
        <li
          className={
            this.props.currentPageName === PageList.SalesbyItem ? "active" : ""
          }
        >
          <Link to={"/sales-by-Item"} className="dashboard">
            Sales by Item
          </Link>
        </li>
        <li
          className={
            this.props.currentPageName === PageList.CustomerBalance
              ? "active"
              : ""
          }
        >
          <Link to={"/customer-balance"} className="dashboard">
            Customer Balance
          </Link>
        </li>
        <li
          className={
            this.props.currentPageName === PageList.InvoiceDetails
              ? "active"
              : ""
          }
        >
          <Link to={"/invoice-details"} className="dashboard">
            Invoice Details
          </Link>
        </li>{" "}
        <li
          className={
            this.props.currentPageName === PageList.ReceivableSummary
              ? "active"
              : ""
          }
        >
          <Link to={"/receivable-summary"} className="dashboard">
            Receivable Summary
          </Link>
        </li>
        <li
          className={
            this.props.currentPageName === PageList.ReceivableDetails
              ? "active"
              : ""
          }
        >
          <Link to={"/receivable-details"} className="dashboard">
            Receivable Details
          </Link>
        </li>
        <li
          className={
            this.props.currentPageName === PageList.PaymentReceived
              ? "active"
              : ""
          }
        >
          <Link to={"/payment-received"} className="dashboard">
            Payment Received
          </Link>
        </li>
        <li
          className={
            this.props.currentPageName === PageList.TaxSummary ? "active" : ""
          }
        >
          <Link to={"/tax-summary"} className="dashboard">
            Tax Summary
          </Link>
        </li>
        <li
          className={
            this.props.currentPageName === PageList.FormNo27EQ ? "active" : ""
          }
        >
          <Link to={"/form-no-27-eq"} className="dashboard">
            Form No. 27 EQ
          </Link>
        </li>
        <li
          className={
            this.props.currentPageName === PageList.UserList ? "active" : ""
          }
        >
          <Link to={"/user-list"} className="dashboard">
            User List
          </Link>
        </li>
        <li
          className={
            this.props.currentPageName === PageList.CustomerList ? "active" : ""
          }
        >
          <Link to={"/customer-list"} className="dashboard">
            Customer List
          </Link>
        </li>
        <li
          className={
            this.props.currentPageName === PageList.UserLog ? "active" : ""
          }
        >
          <Link to={"/user-log"} className="dashboard">
            User Log
          </Link>
        </li>
      </React.Fragment>
    );
  }
}
