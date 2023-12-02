import * as React from "react";
import FormNo27 from "./FormNo27";

interface FormNo27EQViewProps {}

export class FormNo27EQView extends React.PureComponent<FormNo27EQViewProps> {
  public render() {
    return (
      <React.Fragment>
       <div className="card-header   h5 p-3">Form No. 27 EQ</div>
        {/* <div className="card-body">
        <div className="row "></div>
        </div> */}
        <FormNo27 />
      </React.Fragment>
    );
  }
}
