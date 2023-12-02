import * as React from "react";

interface IGSTTreatmentPageProps {}

export class GSTTreatmentPageView extends React.PureComponent<IGSTTreatmentPageProps> {
  public render() {
    return (
      <React.Fragment>
       <div className="card-header   h5 p-3">GST Treatment Master</div>
        <div className="card-body">
        <div className="row "></div>
        </div>
      </React.Fragment>
    );
  }
}
