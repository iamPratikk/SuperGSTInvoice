import * as React from "react";
import Payment_received from "./Payment_received";

interface PaymentReceivedViewProps {}

export class PaymentReceivedView extends React.PureComponent<PaymentReceivedViewProps> {
  public render() {
    return (
      <React.Fragment>
       <div className="card-header   h5 p-3">Payment Received</div>
        {/* <div className="card-body">
        <div className="row "></div>
        </div> */}
        <Payment_received />
      </React.Fragment>
    );
  }
}
