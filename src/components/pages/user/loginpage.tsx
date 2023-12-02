import * as React from "react";
import { IAppRootState } from "../../../redux/store/appStore";
import { IAppCommonState } from "../../../redux/reducers/appCommonState";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { FooterView } from "../../container/footer";
import logo from "../../../assets/img/logo.jpeg";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { CheckCred } from "../../../redux/actions/appActionsForUsers";
import Alert from "react-bootstrap/Alert";
import { APP_STRINGS } from "../../../utils/commonStrings";
import { CHECKCRED } from "../../../redux/reduxConstants";
import CommonMessageView from "../../modals/commonMessage";
import { resetApiResult } from "../../../redux/actions/appActionsForCommon";
import { MessageType } from "../../../middleware/interface/commonInterface";

interface ILoginPageProps {
  isweb: boolean;
}

interface ILoginPageStateProps {
  appCommonState: IAppCommonState;
}

type Props = ILoginPageStateProps & DispatchProps & ILoginPageProps;
// Component State
interface ILoginPageState {
  userid: string;
  password: string;
  isValidUserID: boolean;
  isValidPassword: boolean;
  messageText: string;
  messageType: MessageType;
}

class LoginPageView extends React.Component<Props, ILoginPageState> {
  userindinputRef: any;
  constructor(props: Props, context: any) {
    super(props, context);
    this.state = {
      userid: "",
      password: "",
      isValidUserID: true,
      isValidPassword: true,
      messageText: "",
      messageType: MessageType.None,
    };
    this.userindinputRef = React.createRef();
  }

  public render() {
    return (
      <React.Fragment>
        <div className="login_wrapper">
          <div className="login sign-in">
            <div className="login_left">
              <div className="logostyle">
                <img src={logo} className="img-responsive" alt="" />
                <span className="logo-s">Invoice</span>
              </div>
              <h2>Free Invoicing Software For Small Businesses</h2>
              <p>
                SuperGST Invoice helps you create Invoice in few steps. Be it
                professional or Amature, you would enjoy making SuperGST
                Invoice.
              </p>
            </div>
            <div className="login_right">
              <div className="login-logo">
                <div className="mob-show">
                  <img src={logo} className="img-responsive" alt="" />
                  <span className="logo-s">Invoice</span>
                </div>
                <h2>Super Admin Sign-In</h2>
                <p>Experience Professional Invoicing</p>
              </div>
              <Form>
                <div className="inp-control">
                  <Form.Control
                    id="txtUserEmail"
                    type="email"
                    placeholder="Email id or Mobile No."
                    className="my-input"
                    autoComplete="off"
                    required
                    value={this.state.userid}
                    onChange={this.onChangeuserind}
                    autoFocus={true}
                    onKeyDown={this.onKeyDownuserind}
                  />
                  <i className="material-icons">person</i>
                  {this.state.isValidUserID === false && (
                    <Alert key="danger" variant="danger">
                      {APP_STRINGS.ERROR_MESSAGES.LOGIN.USERID}
                    </Alert>
                  )}
                </div>
                <div className="inp-control">
                  <Form.Control
                    id="txtUserPassword"
                    type="password"
                    placeholder="Password"
                    className="my-input"
                    autoComplete="off"
                    required
                    value={this.state.password}
                    onChange={this.onChangepassword}
                    onKeyDown={this.onKeyDownpassword}
                    ref={this.userindinputRef}
                  />
                  {this.state.isValidPassword === false && (
                    <Alert key="danger" variant="danger">
                      {APP_STRINGS.ERROR_MESSAGES.LOGIN.PASSWORD}
                    </Alert>
                  )}
                  <i className="material-icons">key</i>
                </div>
                <div></div>
                <Button
                  id="btnSignIn"
                  className="login-btn"
                  onClick={this.onSignIn}
                >
                  SIGN IN
                </Button>
              </Form>
            </div>
          </div>
          <FooterView />
          <CommonMessageView
            closeCommonMessage={this.closeMessagePopup}
            messageText={this.state.messageText}
            messageType={this.state.messageType}
            headerTitle={"Super GST Invoice | sign in"}
          />
        </div>
      </React.Fragment>
    );
  }

  //#region Form Events

  public componentDidMount(): void {}

  public componentDidUpdate(
    prevProps: Readonly<Props>,
    prevState: Readonly<ILoginPageState>,
    snapshot?: any
  ): void {
    if (
      this.props.appCommonState.apiResult.actionName &&
      prevProps.appCommonState.apiResult.actionName !==
        this.props.appCommonState.apiResult.actionName
    ) {
      //Show alert based on action and api response
      if (this.props.appCommonState.apiResult.actionName === CHECKCRED) {
        if (this.props.appCommonState.apiResult.isSuccess) {
          //Redirect user profile details once successfuly Login.
        } else {
          //Show what response getting from API
          this.setState({
            messageType: MessageType.Popup_Error,
            messageText: this.props.appCommonState.apiResult.apiResponse,
          });
        }
        //Reset API flag
        this.props.resetApiResult();
      }
    }
  }

  //#endregion

  public onKeyDownuserind = (e: any) => {
    if (e.key === "Enter") {
      this.userindinputRef.current.focus();
    }
  };

  public onChangeuserind = (event: any) => {
    this.setState({
      userid: event.target.value,
      isValidUserID: event.target.value ? true : false,
    });
  };

  public onKeyDownpassword = (e: any) => {
    if (e.key === "Enter") {
      this.onSignIn();
    }
  };

  public onChangepassword = (event: any) => {
    this.setState({
      password: event.target.value,
      isValidPassword: event.target.value ? true : false,
    });
  };

  //Verify User Credencial
  public onSignIn = () => {
    let isValidForm = false;
    //Verify form value
    if (!this.state.userid) {
      this.setState({ isValidUserID: false });
    }
    if (!this.state.password) {
      this.setState({ isValidPassword: false });
    }

    if (this.state.userid && this.state.password) {
      isValidForm = true;
    }
    if (isValidForm) {
      this.props.CheckCredencial(
        this.state.userid,
        this.state.password,
        this.props.isweb
      );
    }
  };

  //#region Popop

  public closeMessagePopup = () => {
    this.setState({ messageType: MessageType.None });
  };

  //#endregion
}

const mapStateToProps = (states: IAppRootState): ILoginPageStateProps => ({
  appCommonState: states.rootState.appCommonState,
});

interface DispatchProps {
  resetApiResult: () => void;
  CheckCredencial: (userid: string, password: string, isweb: boolean) => void;
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>
): DispatchProps => ({
  resetApiResult: () => dispatch(resetApiResult()),
  CheckCredencial: (userid: string, password: string, isweb: boolean) =>
    dispatch(CheckCred(userid, password, isweb)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPageView);
