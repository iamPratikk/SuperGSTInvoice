import * as React from "react";
import Receivable_detail from "./Receivable_detail";

interface ReceivableDetailsViewProps {}

export class ReceivableDetailsView extends React.PureComponent<ReceivableDetailsViewProps> {
  public render() {
    return (
      <React.Fragment>
       <div className="card-header   h5 p-3">Receivable Details</div>
        {/* <div className="card-body">
        <div className="row "></div>
        </div> */}
        <Receivable_detail />
      </React.Fragment>
    );
  }
}
