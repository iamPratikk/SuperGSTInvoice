import * as React from "react";

interface ICurrencyPageProps {}

export class CurrencyPageView extends React.PureComponent<ICurrencyPageProps> {
  public render() {
    return (
      <React.Fragment>
       <div className="card-header   h5 p-3">Currency Master</div>
        <div className="card-body">
        <div className="row "></div>
        </div>
      </React.Fragment>
    );
  }
}

