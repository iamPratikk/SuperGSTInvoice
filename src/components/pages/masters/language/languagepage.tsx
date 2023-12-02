import * as React from "react";

interface ILanguagePageProps {}

export class LanguagePageView extends React.PureComponent<ILanguagePageProps> {
  public render() {
    return (
      <React.Fragment>
       <div className="card-header   h5 p-3">Language Master</div>
        <div className="card-body">
        <div className="row "></div>
        </div>
      </React.Fragment>
    );
  }
}
