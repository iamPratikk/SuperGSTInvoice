import * as React from "react";
import { IAppRootState } from "../../redux/store/appStore";
import { IAppCommonState } from "../../redux/reducers/appCommonState";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { MessageType } from "../../middleware/interface/commonInterface";
import ToasterMessageView from "./toasterMessage";
import MessagePopupView from "./messagePopup";

interface ICommonMessageProps {
  closeCommonMessage: any;
  messageText: string;
  messageType: MessageType;
  headerTitle: string;
}
interface ICommonMessageStateProps {
  appCommonState: IAppCommonState;
}
type Props = ICommonMessageStateProps & DispatchProps & ICommonMessageProps;
// Component State
interface ICommonMessageState {}

class CommonMessageView extends React.Component<Props, ICommonMessageState> {
  constructor(props: Props, context: any) {
    super(props, context);
    this.state = {};
  }
  public render() {
    return (
      <React.Fragment>
        {this.props.messageType === MessageType.Toaster_Error ||
        this.props.messageType === MessageType.Toaster_Success ||
        this.props.messageType === MessageType.Toaster_Info ||
        this.props.messageType === MessageType.Toaster_Warning ? (
          <ToasterMessageView
            closeToasterMessage={this.closeCommonMessage}
            messageText={this.props.messageText}
            alertType={this.props.messageType}
          />
        ) : this.props.messageType === MessageType.Popup_Error ||
          this.props.messageType === MessageType.Popup_Success ||
          this.props.messageType === MessageType.Popup_Info ||
          this.props.messageType === MessageType.Popup_Warning ? (
          <MessagePopupView
            closeMessagePopup={this.closeCommonMessage}
            headerTitle={this.props.headerTitle}
            messageText={this.props.messageText}
            alertType={this.props.messageType}
          />
        ) : (
          <></>
        )}
      </React.Fragment>
    );
  }

  ///For closing the confirmation popup
  public closeCommonMessage = () => {
    this.props.closeCommonMessage();
  };

  public componentDidMount(): void {}
}

const mapStateToProps = (states: IAppRootState): ICommonMessageStateProps => ({
  appCommonState: states.rootState.appCommonState,
});

interface DispatchProps {}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>
): DispatchProps => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CommonMessageView);
