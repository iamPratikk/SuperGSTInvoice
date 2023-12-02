import * as React from "react";
import "./modalStyle.css";
import { IAppRootState } from "../../redux/store/appStore";
import { IAppCommonState } from "../../redux/reducers/appCommonState";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import SweetAlert2 from "react-sweetalert2";
import { MessageType } from "../../middleware/interface/commonInterface";

interface IToasterMessageProps {
  closeToasterMessage: any;
  messageText: string;
  alertType: MessageType;
}
interface IToasterMessageStateProps {
  appCommonState: IAppCommonState;
}
type Props = IToasterMessageStateProps & DispatchProps & IToasterMessageProps;
// Component State
interface IToasterMessageState {}

class ToasterMessageView extends React.Component<Props, IToasterMessageState> {
  constructor(props: Props, context: any) {
    super(props, context);
    this.state = {};
  }
  public render() {
    return (
      <React.Fragment>
        <SweetAlert2
          show={true}
          text={this.props.messageText}
          didClose={() => {
            // run when swal is closed...
            this.closeToasterMessage();
          }}
          icon={
            this.props.alertType === MessageType.Toaster_Error
              ? "error"
              : this.props.alertType === MessageType.Toaster_Success
              ? "success"
              : this.props.alertType === MessageType.Toaster_Info
              ? "info"
              : this.props.alertType === MessageType.Toaster_Warning
              ? "warning"
              : "question"
          }
          title={
            this.props.alertType === MessageType.Toaster_Error
              ? "Error"
              : this.props.alertType === MessageType.Toaster_Success
              ? "Success"
              : this.props.alertType === MessageType.Toaster_Info
              ? "Info"
              : this.props.alertType === MessageType.Toaster_Warning
              ? "Warning"
              : "Question"
          }
          toast={true}
          position={"top-right"}
          iconColor={"white"}
          customClass={"colored-toast"}
          showConfirmButton={false}
          timer={1500}
          timerProgressBar={true}
        />
      </React.Fragment>
    );
  }

  ///For closing the confirmation popup
  public closeToasterMessage = () => {
    this.props.closeToasterMessage();
  };

  public componentDidMount(): void {}
}

const mapStateToProps = (states: IAppRootState): IToasterMessageStateProps => ({
  appCommonState: states.rootState.appCommonState,
});

interface DispatchProps {}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>
): DispatchProps => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ToasterMessageView);
