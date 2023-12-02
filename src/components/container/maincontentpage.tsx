import * as React from "react";
import { IAppRootState } from "../../redux/store/appStore";
import { IAppCommonState } from "../../redux/reducers/appCommonState";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import LoginPageView from "../pages/user/loginpage";
import { FooterView } from "../container/footer";
import TopNavBarView from "../container/topnavbar";
import SidebarPageView from "../container/sidebar";
import {
  IGlobalStateVariable,
  PageList,
} from "../../middleware/interface/commonInterface";
import {
  GetDecimalList,
  GetFormatList,
  GetGenderList,
  GetStartMonthList,
  GetUploadMasterTypeList,
} from "../../redux/actions/appActionsForStaticDropDown";
import { ActualPageView } from "./actualpage";
import { GetUserDet } from "../../redux/actions/appActionsForUsers";
import {
  GetUserPicture,
  updateGlobalStateVariable,
} from "../../redux/actions/appActionsForCommon";

interface IMainContentPageProps {
  pageName: PageList;
  isweb: boolean;
}
interface IMainContentPageStateProps {
  appCommonState: IAppCommonState;
}
type Props = IMainContentPageStateProps & DispatchProps & IMainContentPageProps;
// Component State
interface IMainContentPageState {}

class MainContentPageView extends React.PureComponent<
  Props,
  IMainContentPageState
> {
  constructor(props: Props, context: any) {
    super(props, context);
    this.state = {};
  }

  public render() {
    return (
      <React.Fragment>
        {this.props.appCommonState.globalStateVariable.userId === 0 ? (
          <LoginPageView isweb={this.props.isweb} />
        ) : (
          <div className="wrapper">
            <div
              className={
                this.props.appCommonState.globalStateVariable.isMoreVert
                  ? "body-overlay show-nav"
                  : "body-overlay"
              }
              onClick={this.onClickMore_vert}
            ></div>
            <SidebarPageView
              currentPageName={this.props.pageName}
              onClickMore_vert={this.onClickMore_vert}
            />
            <div
              id="content"
              className={
                this.props.appCommonState.globalStateVariable.isSidebarCollapse
                  ? "active"
                  : ""
              }
            >
              <TopNavBarView
                clickSidebarCollapse={this.ClickSidebarCollapse}
                onClickMore_vert={this.onClickMore_vert}
              />
              <div className="main-content">
                <div className="container-fluid bg-white shadow">
                  <div className="row">
                    <div className="card p-0 m-0">
                      <ActualPageView currentPageName={this.props.pageName}
                      clickSidebarCollapse={this.ClickSidebarCollapse}
                      collapseSidebar={this.CollpaseSidebar}
                      openSidebar={this.OpenSidebar}
                      
                      />
                    </div>
                  </div>
                </div>
              </div>
              <FooterView />
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }

  public componentDidMount(): void {
    //Load all static drop down value
    this.props.GetStartMonthList();
    this.props.GetGenderList();
    this.props.GetDecimalList();
    this.props.GetFormatList();
    this.props.GetUploadMasterTypeList();
  }

  public componentDidUpdate(
    prevProps: Readonly<Props>,
    prevState: Readonly<IMainContentPageState>,
    snapshot?: any
  ): void {
    if (
      this.props.appCommonState.globalStateVariable.userId &&
      this.props.appCommonState.globalStateVariable.userId > 0 &&
      this.props.appCommonState.globalStateVariable.userId !==
        prevProps.appCommonState.globalStateVariable.userId
    ) {
      //Get User Details
      this.props.GetUserDetails(
        this.props.appCommonState.globalStateVariable.userId
      );
      //Store user id in session storage
      sessionStorage.setItem(
        "supergstuserId",
        this.props.appCommonState.globalStateVariable.userId.toString()
      );
      //Get user prifile pic
      this.props.GetUserPicture(this.props.appCommonState.globalStateVariable);
    }
  }
  public onClickMore_vert = () => {
    let globalStateVariable = this.props.appCommonState.globalStateVariable;
    globalStateVariable.isMoreVert =
      !this.props.appCommonState.globalStateVariable.isMoreVert;
    this.props.UpdateGlobalStateVariable(globalStateVariable);
  };

  public ClickSidebarCollapse = () => {
    let globalStateVariable = this.props.appCommonState.globalStateVariable;
    globalStateVariable.isSidebarCollapse =
      !this.props.appCommonState.globalStateVariable.isSidebarCollapse;
    this.props.UpdateGlobalStateVariable(globalStateVariable);
  };
  public CollpaseSidebar=()=>{
    let globalStateVariable = this.props.appCommonState.globalStateVariable;
    globalStateVariable.isSidebarCollapse=true;
    this.props.UpdateGlobalStateVariable(globalStateVariable);
  }
  public OpenSidebar=()=>{
    let globalStateVariable = this.props.appCommonState.globalStateVariable;
    globalStateVariable.isSidebarCollapse=false;
    this.props.UpdateGlobalStateVariable(globalStateVariable);
  }
}

const mapStateToProps = (
  states: IAppRootState
): IMainContentPageStateProps => ({
  appCommonState: states.rootState.appCommonState,
});

interface DispatchProps {
  GetUserDetails: (userid: number) => void;
  GetStartMonthList: () => void;
  GetGenderList: () => void;
  GetDecimalList: () => void;
  GetFormatList: () => void;
  GetUploadMasterTypeList: () => void;
  GetUserPicture: (globalStateVariable: IGlobalStateVariable) => void;
  UpdateGlobalStateVariable: (
    globalStateVariable: IGlobalStateVariable
  ) => void;
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>
): DispatchProps => ({
  GetUserDetails: (userid: number) => dispatch(GetUserDet(userid)),
  GetStartMonthList: () => dispatch(GetStartMonthList()),
  GetGenderList: () => dispatch(GetGenderList()),
  GetDecimalList: () => dispatch(GetDecimalList()),
  GetFormatList: () => dispatch(GetFormatList()),
  GetUploadMasterTypeList: () => dispatch(GetUploadMasterTypeList()),
  GetUserPicture: (globalStateVariable: IGlobalStateVariable) =>
    dispatch(GetUserPicture(globalStateVariable)),
  UpdateGlobalStateVariable: (globalStateVariable: IGlobalStateVariable) =>
    dispatch(updateGlobalStateVariable(globalStateVariable)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContentPageView);
