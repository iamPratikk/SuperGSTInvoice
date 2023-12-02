import * as React from "react";
import UserList from "./UserList";

interface UserListViewProps {}

export class UserListView extends React.PureComponent<UserListViewProps> {
  public render() {
    return (
      <React.Fragment>
       <div className="card-header   h5 p-3">User List</div>
        {/* <div className="card-body">
        <div className="row "></div>
        </div> */}
        <UserList />
      </React.Fragment>
    );
  }
}
