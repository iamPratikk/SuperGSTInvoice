import * as React from "react";

interface IBulkPageProps {}

export class BulkPageView extends React.PureComponent<IBulkPageProps> {
  public render() {
    return (
      <React.Fragment>
       <div className="card-header   h5 p-3">Bulk Page Master</div>
        <div className="card-body">
        <div className="row "></div>
        </div>
      </React.Fragment>
    );
  }
}
