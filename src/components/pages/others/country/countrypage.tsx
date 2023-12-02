import * as React from "react";

interface ICountryPageProps {}

export class CountryPageView extends React.PureComponent<ICountryPageProps> {
  public render() {
    return (
      <React.Fragment>
       <div className="card-header   h5 p-3">Country Master</div>
        <div className="card-body">
        <div className="row "></div>
        </div>
      </React.Fragment>
    );
  }
}
