import * as React from "react";
import { IAppRootState } from "../../../redux/store/appStore";
import { IAppCommonState } from "../../../redux/reducers/appCommonState";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import UserProfileForm from "./userprofileform";
import CommonMessageView from "../../modals/commonMessage";
import { MessageType } from "../../../middleware/interface/commonInterface";
interface IUserProfileProps {}
interface IUserProfileStateProps {
  appCommonState: IAppCommonState;
}
type Props = IUserProfileStateProps & DispatchProps & IUserProfileProps;
// Component State
interface IUserProfileState {
  messageText: string;
  messageType: MessageType;
}

class UserProfileView extends React.Component<Props, IUserProfileState> {
  constructor(props: Props, context: any) {
    super(props, context);
    this.state = {
      messageText: "",
      messageType: MessageType.None,
    };
  }
  public render() {
    return (
      <React.Fragment>
        <div className="card-header   h5 p-3">Update Profile</div>
        <div className="card-body">
          <UserProfileForm showMessagePopup={this.showMessagePopup} />
          <CommonMessageView
            closeCommonMessage={this.closeMessagePopup}
            messageText={this.state.messageText}
            messageType={this.state.messageType}
            headerTitle={"Super GST Invoice | User-Profile"}
          />
        </div>
      </React.Fragment>
    );
  }

  public componentDidMount(): void {}

  //#region Popop

  public showMessagePopup = (messageText: string, messageType: MessageType) => {
    this.setState({
      messageType: messageType,
      messageText: messageText,
    });
  };

  public closeMessagePopup = () => {
    this.setState({ messageType: MessageType.None, messageText: "" });
  };

  //#endregion
}

const mapStateToProps = (states: IAppRootState): IUserProfileStateProps => ({
  appCommonState: states.rootState.appCommonState,
});

interface DispatchProps {}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>
): DispatchProps => ({});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileView);
