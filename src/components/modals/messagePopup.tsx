import * as React from "react";
import "./modalStyle.css";
import { IAppRootState } from "../../redux/store/appStore";
import { IAppCommonState } from "../../redux/reducers/appCommonState";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import SweetAlert2 from "react-sweetalert2";
import { MessageType } from "../../middleware/interface/commonInterface";

interface IMessagePopupProps {
  closeMessagePopup: any;
  headerTitle: string;
  messageText: string;
  alertType: MessageType;
}
interface IMessagePopupStateProps {
  appCommonState: IAppCommonState;
}
type Props = IMessagePopupStateProps & DispatchProps & IMessagePopupProps;
// Component State
interface IMessagePopupState {}

class MessagePopupView extends React.Component<Props, IMessagePopupState> {
  constructor(props: Props, context: any) {
    super(props, context);
    this.state = {};
  }
  public render() {
    const Titlecolor =
      this.props.alertType === MessageType.Popup_Error
        ? "red"
        : this.props.alertType === MessageType.Popup_Success
        ? "green"
        : this.props.alertType === MessageType.Popup_Info
        ? "blue"
        : this.props.alertType === MessageType.Popup_Warning
        ? "orange"
        : "black";
    return (
      <SweetAlert2
        show={true}
        text={this.props.messageText}
        title={
          "<h3 style='color:" +
          Titlecolor +
          "'>" +
          this.props.headerTitle +
          "</h3>"
        }
        didClose={() => {
          // run when swal is closed...
          this.closeMessagePopup();
        }}
        icon={
          this.props.alertType === MessageType.Popup_Error
            ? "error"
            : this.props.alertType === MessageType.Popup_Success
            ? "success"
            : this.props.alertType === MessageType.Popup_Info
            ? "info"
            : this.props.alertType === MessageType.Popup_Warning
            ? "warning"
            : "question"
        }
        confirmButtonColor={"var(--primary-theme-color) !important"}
        //footer={'<a href="">Why do I have this issue?</a>'}
        // imageUrl={"https://placeholder.pics/svg/300x1500"}
        // imageHeight={150}
        // imageAlt={"A tall image"}
      />
    );
  }

  ///For closing the confirmation popup
  public closeMessagePopup = () => {
    this.props.closeMessagePopup();
  };

  public componentDidMount(): void {}
}

const mapStateToProps = (states: IAppRootState): IMessagePopupStateProps => ({
  appCommonState: states.rootState.appCommonState,
});

interface DispatchProps {}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>
): DispatchProps => ({});

export default connect(mapStateToProps, mapDispatchToProps)(MessagePopupView);
