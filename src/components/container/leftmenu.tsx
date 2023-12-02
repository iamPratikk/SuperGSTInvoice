import * as React from "react";
import { Link } from "react-router-dom";
import { PageList } from "../../middleware/interface/commonInterface";
/**
 * Page LeftMenu Component
 */

interface LeftMenuViewProps {
  currentPageName: PageList;
  onClickMore_vert: any;
}

export class LeftMenuView extends React.PureComponent<LeftMenuViewProps> {
  public render() {
    return (
      <React.Fragment>
        <li
          onClick={this.props.onClickMore_vert}
          className={
            this.props.currentPageName === PageList.Country ? "active" : ""
          }
        >
          <Link to={"/country"} className="dashboard">
            <i className="material-icons">map</i>
            <span>Country</span>
          </Link>
        </li>
        <li
          onClick={this.props.onClickMore_vert}
          className={
            this.props.currentPageName === PageList.State ? "active" : ""
          }
        >
          <Link to={"/state"} className="dashboard">
            <i className="material-icons">directions</i>
            <span>State</span>
          </Link>
        </li>
        <li
          onClick={this.props.onClickMore_vert}
          className={
            this.props.currentPageName === PageList.Currency ? "active" : ""
          }
        >
          <Link to={"/currency"} className="dashboard">
            <i className="material-icons">money</i>
            <span>Currency</span>
          </Link>
        </li>
        <li
          onClick={this.props.onClickMore_vert}
          className={
            this.props.currentPageName === PageList.HSN ? "active" : ""
          }
        >
          <Link to={"/hsn"} className="dashboard">
            <i className="material-icons">category</i>
            <span>HSN Code/SAC</span>
          </Link>
        </li>
        <li
          onClick={this.props.onClickMore_vert}
          className={
            this.props.currentPageName === PageList.Bulk ? "active" : ""
          }
        >
          <Link to={"/bulk"} className="dashboard">
            <i className="material-icons">upload</i>
            <span>Bulk Upload</span>
          </Link>
        </li>
      </React.Fragment>
    );
  }
}
