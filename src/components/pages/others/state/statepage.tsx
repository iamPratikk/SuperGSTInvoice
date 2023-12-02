import * as React from "react";

interface IStatePageProps {}

export class StatePageView extends React.PureComponent<IStatePageProps> {
  public render() {
    return (
      <React.Fragment>
       <div className="card-header   h5 p-3">State Master</div>
        <div className="card-body">
        <div className="row "></div>
        </div>
      </React.Fragment>
    );
  }
}

