import * as React from "react";
import Customer_balc from "./Customer_balc";

interface CustomerBalanceViewProps {}

export class CustomerBalanceView extends React.PureComponent<CustomerBalanceViewProps> {
  


  public render() {
    return (
      <React.Fragment>
       <div className="card-header   h5 p-3">Customer Balance</div>
        {/* <div className="card-body">
        <div className="row "></div>
        
        </div> */}
        <Customer_balc  />
      </React.Fragment>
    );
  }
}
