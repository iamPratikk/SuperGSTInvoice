import * as React from "react";
import Customers_list from "./Customers_list";

interface CustomerListViewProps {}

export class CustomerListView extends React.PureComponent<CustomerListViewProps> {
  public render() {
    return (
      <React.Fragment>
       <div className="card-header   h5 p-3">Customer List</div>
        {/* <div className="card-body">
        <div className="row "></div>
        </div> */}
        <Customers_list />
      </React.Fragment>
    );
  }
}
