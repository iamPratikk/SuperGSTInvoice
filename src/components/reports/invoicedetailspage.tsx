import * as React from "react";
import Invoice_detail from "./Invoice_detail";

interface InvoiceDetailsViewProps {}

export class InvoiceDetailsView extends React.PureComponent<InvoiceDetailsViewProps> {
  public render() {
    return (
      <React.Fragment>
       <div className="card-header   h5 p-3">Invoice Details</div>
        {/* <div className="card-body">
        <div className="row "></div>
        </div> */}
        <Invoice_detail />
      </React.Fragment>
    );
  }
}
