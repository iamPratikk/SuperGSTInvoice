import * as React from "react";
import { IAppRootState } from "../../redux/store/appStore";
import { IAppCommonState } from "../../redux/reducers/appCommonState";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { getUniqueID } from "../../utils/CommonFuntions";
import { Button } from "react-bootstrap";

interface ICButtonControlProps {
  onClick: any;
  displayText: string;
}

interface ICButtonControlStateProps {
  appCommonState: IAppCommonState;
}
type Props = ICButtonControlStateProps & DispatchProps & ICButtonControlProps;
// Component State
interface ICButtonControlState {}

class CButtonControl extends React.PureComponent<Props, ICButtonControlState> {
  constructor(props: Props, context: any) {
    super(props, context);
    this.state = {};
  }

  public OnClick = () => {
    this.props.onClick();
  };

  public render() {
    return (
      <React.Fragment>
        <Button
          id={getUniqueID(this.props.displayText)}
          className="btn btn-kec"
          onClick={this.OnClick}
        >
          {this.props.displayText}
        </Button>
      </React.Fragment>
    );
  }

  public componentDidMount(): void {}

  public componentDidUpdate(
    prevProps: Readonly<Props>,
    prevState: Readonly<ICButtonControlState>,
    snapshot?: any
  ): void {}
}

const mapStateToProps = (states: IAppRootState): ICButtonControlStateProps => ({
  appCommonState: states.rootState.appCommonState,
});

interface DispatchProps {}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>
): DispatchProps => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CButtonControl);
