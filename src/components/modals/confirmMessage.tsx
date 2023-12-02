import * as React from "react";
import "./modalStyle.css";
import { IAppRootState } from "../../redux/store/appStore";
import { IAppCommonState } from "../../redux/reducers/appCommonState";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import SweetAlert2 from "react-sweetalert2";
import { ActionFor } from "../../middleware/interface/commonInterface";

interface IConfirmMessageProps {
  isShow: boolean;
  closeConfirmMessage: any;
  actionFor: ActionFor;
}

interface IConfirmMessageStateProps {
  appCommonState: IAppCommonState;
}
type Props = IConfirmMessageStateProps & DispatchProps & IConfirmMessageProps;
// Component State
interface IConfirmMessageState {}

class ConfirmMessageView extends React.Component<Props, IConfirmMessageState> {
  public render() {
    const Titlecolor =
      this.props.actionFor === ActionFor.Delete ? "red" : "blue";
    const Titletext =
      this.props.actionFor === ActionFor.Delete
        ? "Are you sure?"
        : "Do you want to save the changes";
    return (
      <React.Fragment>
        <SweetAlert2
          show={this.props.isShow}
          title={"<h3 style='color:" + Titlecolor + "'>" + Titletext + "</h3>"}
          text={
            this.props.actionFor === ActionFor.Delete
              ? "You won't be able to revert this!"
              : ""
          }
          icon={this.props.actionFor === ActionFor.Delete ? "warning" : "info"}
          showCancelButton={false}
          //cancelButtonColor="#d33"
          confirmButtonColor="#3085d6"
          confirmButtonText={
            this.props.actionFor === ActionFor.Delete
              ? "Yes, delete it!"
              : "Yes"
          }
          showDenyButton={true}
          denyButtonText="No"
          denyButtonColor="#d33"
          onConfirm={(result: any) => {
            // run when clieked in confirm and promise is resolved...
            if (result.isConfirmed) {
              this.props.closeConfirmMessage(true);
            } else {
              this.props.closeConfirmMessage(false);
            }
          }}
          didClose={() => {
            // run when swal is closed...
            this.props.closeConfirmMessage(false);
          }}
        />
      </React.Fragment>
    );
  }

  public componentDidMount(): void {}
}

const mapStateToProps = (states: IAppRootState): IConfirmMessageStateProps => ({
  appCommonState: states.rootState.appCommonState,
});

interface DispatchProps {}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>
): DispatchProps => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmMessageView);
