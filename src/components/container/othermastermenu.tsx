import * as React from "react";
import { Link } from "react-router-dom";
import { PageList } from "../../middleware/interface/commonInterface";
/**
 * Page OtherMasterMenu Component
 */

interface OtherMasterMenuViewProps {
  currentPageName: PageList;
}

export class OtherMasterMenuView extends React.PureComponent<OtherMasterMenuViewProps> {
  public render() {
    return (
      <React.Fragment>
        <li
          className={
            this.props.currentPageName === PageList.Salutation ? "active" : ""
          }
        >
          <Link to={"/salutation"} className="dashboard">
            Salutation
          </Link>
        </li>
        <li
          className={
            this.props.currentPageName === PageList.IndustryType ? "active" : ""
          }
        >
          <Link to={"/industry-type"} className="dashboard">
            Industry Type
          </Link>
        </li>
        <li
          className={
            this.props.currentPageName === PageList.BusinessType ? "active" : ""
          }
        >
          <Link to={"/business-type"} className="dashboard">
            Business Type
          </Link>
        </li>{" "}
        <li
          className={
            this.props.currentPageName === PageList.FiscalYear ? "active" : ""
          }
        >
          <Link to={"/fiscal-year"} className="dashboard">
            Fiscal Year
          </Link>
        </li>
        <li
          className={
            this.props.currentPageName === PageList.Language ? "active" : ""
          }
        >
          <Link to={"/language"} className="dashboard">
            Language
          </Link>
        </li>
        <li
          className={
            this.props.currentPageName === PageList.DateFormat ? "active" : ""
          }
        >
          <Link to={"/date-format"} className="dashboard">
            Date Format
          </Link>
        </li>
        <li
          className={
            this.props.currentPageName === PageList.GSTTreatment ? "active" : ""
          }
        >
          <Link to={"/gst-treatment"} className="dashboard">
            GST Treatment
          </Link>
        </li>
        <li
          className={
            this.props.currentPageName === PageList.TaxPreference
              ? "active"
              : ""
          }
        >
          <Link to={"/tax-preference"} className="dashboard">
            Tax Preference
          </Link>
        </li>
      </React.Fragment>
    );
  }
}
