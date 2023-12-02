import * as React from "react";
import { IAppRootState } from "../../redux/store/appStore";
import { IAppCommonState } from "../../redux/reducers/appCommonState";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import logo from "../../assets/img/logo.jpeg";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Logout } from "../../redux/actions/appActionsForUsers";

interface ITopNavBarProps {
  clickSidebarCollapse: any;
  onClickMore_vert: any;
}
interface ITopNavBarStateProps {
  appCommonState: IAppCommonState;
}
type Props = ITopNavBarStateProps & DispatchProps & ITopNavBarProps;
// Component State
interface ITopNavBarState {
  isClickOnPersionicon: boolean;
}

class TopNavBarView extends React.PureComponent<Props, ITopNavBarState> {
  constructor(props: Props, context: any) {
    super(props, context);
    this.state = {
      isClickOnPersionicon: false,
    };
  }

  public onClickSidebarCollapse = () => {
    this.props.clickSidebarCollapse();
  };

  public onClickpersionicon = () => {
    this.setState({ isClickOnPersionicon: !this.state.isClickOnPersionicon });
  };

  public onClickLogout = () => {
    this.setState({ isClickOnPersionicon: false });
    sessionStorage.clear();
    this.props.Logout();
  };

  public render() {
    return (
      <React.Fragment>
        <div className="top-navbar">
          <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
              <h3
                className="d-inline-block d-lg-none  more-button"
                onClick={this.props.onClickMore_vert}
              >
                <span>
                  <img
                    src={logo}
                    className="img-fluid"
                    alt=""
                    id="big-img"
                    style={{ width: "110px" }}
                  />
                  <span className="logo-s">Invoice</span>
                </span>
              </h3>
              <Button
                id="sidebarCollapse"
                className="d-xl-block d-lg-block d-md-mone d-none"
                onClick={this.onClickSidebarCollapse}
              >
                <span className="material-icons">arrow_back_ios</span>
              </Button>
              <button
                className="d-inline-block d-lg-none ml-auto more-button"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
                onClick={this.props.onClickMore_vert}
              >
                <span className="material-icons">more_vert</span>
              </button>
              <div className="user_name">
                <a className="navbar-brand" href="#">
                  {" "}
                  Welcome :{" "}
                  <span>{this.props.appCommonState.userDetails.fullname} </span>
                </a>
              </div>
              <div
                className="collapse navbar-collapse d-lg-block d-xl-block d-sm-none d-md-none d-none"
                id="navbarSupportedContent"
              >
                <ul className="nav navbar-nav ml-auto">
                  <li
                    className={
                      this.state.isClickOnPersionicon
                        ? "dropdown nav-item active show"
                        : "dropdown nav-item active"
                    }
                  >
                    <Button
                      id="persionicon"
                      className="nav-link"
                      onClick={this.onClickpersionicon}
                    >
                      <span className="material-icons">person</span>
                    </Button>
                    <ul className="dropdown-menu">
                      <li>
                        <Link
                          to={"/user-profile"}
                          className="dashboard"
                          onClick={() =>
                            this.setState({ isClickOnPersionicon: false })
                          }
                        >
                          <i className="material-icons">manage_accounts</i>
                          <span>User Profile</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={"/change-password"}
                          className="dashboard"
                          onClick={() =>
                            this.setState({ isClickOnPersionicon: false })
                          }
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
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (states: IAppRootState): ITopNavBarStateProps => ({
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

export default connect(mapStateToProps, mapDispatchToProps)(TopNavBarView);

