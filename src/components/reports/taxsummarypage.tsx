import * as React from "react";
import Tax_received from "./Tax_received";

interface TaxSummaryViewProps {}

export class TaxSummaryView extends React.PureComponent<TaxSummaryViewProps> {
  public render() {
    return (
      <React.Fragment>
       <div className="card-header   h5 p-3">Tax Summary</div>
        {/* <div className="card-body">
        <div className="row "></div>
        </div> */}
        <Tax_received />
      </React.Fragment>
    );
  }
}
