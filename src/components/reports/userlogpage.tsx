import * as React from "react";
import UserLog from "./UserLog";

interface UserLogViewProps {}

export class UserLogView extends React.PureComponent<UserLogViewProps> {
  public render() {
    return (
      <React.Fragment>
       <div className="card-header   h5 p-3">User Log</div>
        {/* <div className="card-body">
        <div className="row "></div>
        </div> */}
        <UserLog />
      </React.Fragment>
    );
  }
}
