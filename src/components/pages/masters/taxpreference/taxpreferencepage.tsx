import * as React from "react";

interface ITaxPreferencePageProps {}

export class TaxPreferencePageView extends React.PureComponent<ITaxPreferencePageProps> {
  public render() {
    return (
      <React.Fragment>
       <div className="card-header   h5 p-3">Tax Preference Master</div>
        <div className="card-body">
        <div className="row "></div>
        </div>
      </React.Fragment>
    );
  }
}
