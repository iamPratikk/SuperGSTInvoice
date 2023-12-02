import * as React from "react";
import Receivable_sum from "./Receivable_sum";

interface ReceivableSummaryViewProps {}

export class ReceivableSummaryView extends React.PureComponent<ReceivableSummaryViewProps> {
  public render() {
    return (
      <React.Fragment>
       <div className="card-header   h5 p-3">Receivable Summary</div>
        {/* <div className="card-body">
        <div className="row "></div>
        </div> */}
        <Receivable_sum />
      </React.Fragment>
    );
  }
}
