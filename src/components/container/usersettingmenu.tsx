import * as React from "react";
import { IAppRootState } from "../../redux/store/appStore";
import { IAppCommonState } from "../../redux/reducers/appCommonState";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Logout } from "../../redux/actions/appActionsForUsers";
import { Accordion } from "react-bootstrap";
import { PageList } from "../../middleware/interface/commonInterface";

/**
 * Page ReportsMenu Component
 */

interface IUserSettingMenuProps {
  currentPageName: PageList;
  onClickMore_vert: any;
}

interface IUserSettingMenuStateProps {
  appCommonState: IAppCommonState;
}
type Props = IUserSettingMenuStateProps & DispatchProps & IUserSettingMenuProps;
// Component State
interface IUserSettingMenuState {}

class UserSettingMenuView extends React.PureComponent<
  Props,
  IUserSettingMenuState
> {
  constructor(props: Props, context: any) {
    super(props, context);
    this.state = {};
  }

  public render() {
    return (
      <React.Fragment>
        <div className="small-screen navbar-display">
          <li className="dropdown d-lg-none d-md-block d-xl-none d-sm-block">
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <i className="material-icons">person</i>
                  <span>User Settings</span>
                </Accordion.Header>
                <Accordion.Body>
                  <ul
                    className="collapse list-unstyled menu show"
                    id="homeSubmenu0"
                  >
                    <li>
                      <Link
                        to={"/user-profile"}
                        className="dashboard"
                        onClick={this.onClickMenu}
                      >
                        <i className="material-icons">person</i>
                        <span>
                          {this.props.appCommonState.userDetails.fullname}
                        </span>
                      </Link>
                    </li>
                    <li
                      className={
                        this.props.currentPageName === PageList.UserProfile
                          ? "active"
                          : ""
                      }
                    >
                      <Link
                        to={"/user-profile"}
                        className="dashboard"
                        onClick={this.onClickMenu}
                      >
                        <i className="material-icons">manage_accounts</i>
                        <span>User Profile</span>
                      </Link>
                    </li>
                    <li
                      className={
                        this.props.currentPageName === PageList.ChangePassword
                          ? "active"
                          : ""
                      }
                    >
                      <Link
                        to={"/change-password"}
                        className="dashboard"
                        onClick={this.onClickMenu}
                      >
                        <i className="material-icons">lock</i>
                        <span>Change Password</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"/"}
                        className="dashboard"
                        onClick={() => this.onClickLogout()}
                      >
                        <i className="material-icons">power_settings_new</i>
                        <span>Logout</span>
                      </Link>
                    </li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </li>
        </div>
      </React.Fragment>
    );
  }
  public onClickLogout = () => {
    this.props.onClickMore_vert();
    sessionStorage.clear();
    this.props.Logout();
  };
  public onClickMenu = () => {
    this.props.onClickMore_vert();
  };
}

const mapStateToProps = (
  states: IAppRootState
): IUserSettingMenuStateProps => ({
  appCommonState: states.rootState.appCommonState,
});

interface DispatchProps {
  Logout: () => void;
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>
): DispatchProps => ({
  Logout: () => dispatch(Logout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserSettingMenuView);
