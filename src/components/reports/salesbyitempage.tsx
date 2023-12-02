import * as React from "react";
import Item_report from "./Item_report";

interface SalesbyItemViewProps {}

export class SalesbyItemView extends React.PureComponent<SalesbyItemViewProps> {
  public render() {
    return (
      <React.Fragment>
       <div className="card-header   h5 p-3">Sales by Item</div>
        {/* <div className="card-body">
        <div className="row "></div>
        </div> */}
        <Item_report />
      </React.Fragment>
    );
  }
}
