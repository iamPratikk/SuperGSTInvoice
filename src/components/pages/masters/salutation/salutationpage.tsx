import * as React from "react";
import { IAppRootState } from "../../../../redux/store/appStore";
import { IAppCommonState } from "../../../../redux/reducers/appCommonState";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import SalutationPageForm from "./salutationpageform";
import { MessageType } from "../../../../middleware/interface/commonInterface";
import { resetApiResult } from "../../../../redux/actions/appActionsForCommon";
import { GetAllSalutations } from "../../../../redux/actions/masters/appActionsForSalutation";
import { DELETESALUTATION, SAVESALUTATION } from "../../../../redux/reduxConstants";
import CommonMessageView from "../../../modals/commonMessage";

interface ISalutationPageProps {}
interface ISalutationPageStateProps {
  appCommonState: IAppCommonState;
}
type Props = ISalutationPageStateProps & DispatchProps & ISalutationPageProps;
// Component State
interface ISalutationPageState {
  messageText: string;
  messageType: MessageType;
}

class SalutationPageView extends React.Component<Props, ISalutationPageState> {
 
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
        <div className="card-header   h5 p-3">Salutation</div>
        <div className="card-body">
          <SalutationPageForm />
          <CommonMessageView
            closeCommonMessage={this.closeMessagePopup}
            messageText={this.state.messageText}
            messageType={this.state.messageType}
            headerTitle={"Super GST Invoice | Salutation"}
          />
        </div>
      </React.Fragment>
    );
  }

  public componentDidMount(): void {
    this.props.GetSalutationList();
  }

  public componentDidUpdate(
    prevProps: Readonly<Props>,
    prevState: Readonly<ISalutationPageState>,
    snapshot?: any
  ): void {
    if (
      this.props.appCommonState.apiResult.actionName &&
      prevProps.appCommonState.apiResult.actionName !==
        this.props.appCommonState.apiResult.actionName
    ) {
      //Show alert based on action and api response
      if (
        this.props.appCommonState.apiResult.actionName === SAVESALUTATION ||
        this.props.appCommonState.apiResult.actionName === DELETESALUTATION
      ) {
        if (this.props.appCommonState.apiResult.isSuccess) {
          //Show toaster message
          this.showMessagePopup(
            this.props.appCommonState.apiResult.apiResponse,
            MessageType.Toaster_Success
          );
          //Refresh list
          this.props.GetSalutationList();
        } else {
          //Show what response getting from API
          this.showMessagePopup(
            this.props.appCommonState.apiResult.apiResponse,
            MessageType.Popup_Error
          );
        }
        //Reset API flag
        this.props.resetApiResult();
      }
    }
  }

  //#region Popop

  public showMessagePopup = (messageText: string, messageType: MessageType) => {
    this.setState({
      messageType: messageType,
      messageText: messageText,
    });
  };

  public closeMessagePopup = () => {
    this.setState({
      messageType: MessageType.None,
      messageText: "",
    });
  };

  //#endregion

}

const mapStateToProps = (states: IAppRootState): ISalutationPageStateProps => ({
  appCommonState: states.rootState.appCommonState,
});

interface DispatchProps {
  resetApiResult: () => void;
  GetSalutationList: () => void;
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {
    
  }, any>
): DispatchProps => ({
  resetApiResult: () => dispatch(resetApiResult()),
  GetSalutationList: () => dispatch(GetAllSalutations()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SalutationPageView);
