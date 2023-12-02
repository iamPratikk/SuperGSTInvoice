import * as React from "react";
import Customer_report from "./Customer_report";

interface SalesbyCustomersViewProps {}

export class SalesbyCustomersView extends React.PureComponent<SalesbyCustomersViewProps> {
  public render() {
    return (
      <React.Fragment>
       <div className="card-header   h5 p-3">Sales by Customers</div>
        {/* <div className="card-body">
        <div className="row "></div>
        </div> */}
        <Customer_report />
      </React.Fragment>
    );
  }
}
