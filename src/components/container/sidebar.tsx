import * as React from "react";
import { IAppRootState } from "../../redux/store/appStore";
import { IAppCommonState } from "../../redux/reducers/appCommonState";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import logo from "../../assets/img/logo.jpeg";
import { PageList } from "../../middleware/interface/commonInterface";
import { Accordion } from "react-bootstrap";
import { OtherMasterMenuView } from "./othermastermenu";
import { LeftMenuView } from "./leftmenu";
import { ReportsMenuView } from "./reportsmenu";
import UserSettingMenuView from "../container/usersettingmenu";

interface ISidebarPageProps {
  currentPageName: PageList;
  onClickMore_vert: any;
}
interface ISidebarPageStateProps {
  appCommonState: IAppCommonState;
}
type Props = ISidebarPageStateProps & DispatchProps & ISidebarPageProps;
// Component State
interface ISidebarPageState {
  isOtherMasters: boolean;
  isReports: boolean;
}

class SidebarPageView extends React.PureComponent<Props, ISidebarPageState> {
  constructor(props: Props, context: any) {
    super(props, context);
    this.state = {
      isOtherMasters: false,
      isReports: false,
    };
  }

  public render() {
    const OtherMasterMenu = () => {
      return (
        <React.Fragment>
          <i className="material-icons" style={{ marginRight: "5px" }}>
            settings
          </i>
          <span>Other Masters</span>
        </React.Fragment>
      );
    };

    const ReportsMenu = () => {
      return (
        <React.Fragment>
          <i className="material-icons" style={{ marginRight: "5px" }}>
            description
          </i>
          <span>Reports</span>
        </React.Fragment>
      );
    };

    const CollapseMenu = () => {
      return (
        <React.Fragment>
          <li>
            <i className="material-icons" style={{ marginLeft: "20px" }}>
              settings
            </i>
          </li>
          <li>
            <i
              className="material-icons"
              style={{ marginLeft: "20px", marginTop: "10px" }}
            >
              description
            </i>
          </li>
        </React.Fragment>
      );
    };
    const sidebarClass = this.props.appCommonState.globalStateVariable
      .isSidebarCollapse
      ? "active"
      : "" || this.props.appCommonState.globalStateVariable.isMoreVert
      ? "show-nav"
      : "";
    return (
      <React.Fragment>
        <nav id="sidebar" className={sidebarClass}>
          <div className="sidebar-header">
            <h3>
              <img src={logo} className="img-fluid" alt="" id="small-img" />
              <span>
                <img
                  src={logo}
                  className="img-fluid"
                  alt=""
                  id="big-img"
                  style={{ width: "110px" }}
                />{" "}
                <span className="logo-s">Invoice</span>
              </span>
            </h3>
          </div>
          <ul className="list-unstyled components" id="accordion">
            <UserSettingMenuView
              currentPageName={this.props.currentPageName}
              onClickMore_vert={this.props.onClickMore_vert}
            />
            {this.state.isOtherMasters || this.state.isReports ? (
              <></>
            ) : (
              <LeftMenuView
                currentPageName={this.props.currentPageName}
                onClickMore_vert={this.props.onClickMore_vert}
              />
            )}
            {this.props.appCommonState.globalStateVariable.isSidebarCollapse ? (
              <CollapseMenu />
            ) : (
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header onClick={this.onClickOtherMasters}>
                    <OtherMasterMenu />
                  </Accordion.Header>
                  <Accordion.Body onClick={this.props.onClickMore_vert}>
                    <OtherMasterMenuView
                      currentPageName={this.props.currentPageName}
                    />
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header onClick={this.onClickReports}>
                    <ReportsMenu />
                  </Accordion.Header>
                  <Accordion.Body onClick={this.props.onClickMore_vert}>
                    <ReportsMenuView
                      currentPageName={this.props.currentPageName}
                    />
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            )}
          </ul>
        </nav>
      </React.Fragment>
    );
  }

  public onClickOtherMasters = () => {
    this.setState({
      isOtherMasters: !this.state.isOtherMasters,
      isReports: false,
    });
  };

  public onClickReports = () => {
    this.setState({
      isReports: !this.state.isReports,
      isOtherMasters: false,
    });
  };
  public onClickUserSettings = () => {
    this.setState({
      isOtherMasters: false,
      isReports: false,
    });
  };
}

const mapStateToProps = (states: IAppRootState): ISidebarPageStateProps => ({
  appCommonState: states.rootState.appCommonState,
});

interface DispatchProps {}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>
): DispatchProps => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SidebarPageView);
