import * as React from "react";
import { IAppRootState } from "../../redux/store/appStore";
import { IAppCommonState } from "../../redux/reducers/appCommonState";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { Alert, Form } from "react-bootstrap";
import { FormControlType } from "../../middleware/interface/commonInterface";
import { getUniqueID } from "../../utils/CommonFuntions";

interface ICInputControlProps {
  getValue: any;
  inputValue: any;
  inputType: FormControlType;
  placeholder: string;
  errorMessage: string;
  isRequired: boolean;
  isValid: boolean;
  autoFocus: boolean;
  allowOnlyNumber: boolean;
}

interface ICInputControlStateProps {
  appCommonState: IAppCommonState;
}
type Props = ICInputControlStateProps & DispatchProps & ICInputControlProps;
// Component State
interface ICInputControlState {
  inputValue: any;
  isValid: boolean;
}

class CInputControl extends React.PureComponent<Props, ICInputControlState> {
  constructor(props: Props, context: any) {
    super(props, context);
    this.state = {
      inputValue:
        this.props.inputType === FormControlType.NmberOnly
          ? ""
          : this.props.inputValue,
      isValid: true,
    };
  }

  // Set default props
  static defaultProps = {
    isRequired: true,
    errorMessage: "",
    inputType: FormControlType.PlanText,
    isValid: true,
    autoFocus: false,
    allowOnlyNumber: false,
  };

  getValue(value: any) {
    this.setState({
      inputValue: value,
      isValid: value ? true : false,
    });
    this.props.getValue(getUniqueID(this.props.placeholder), value);
  }

  public render() {
    return (
      <React.Fragment>
        <div className="input-group-my pt-2">
          <div className="group1 mb-2">
            <Form.Control
              id={getUniqueID(this.props.placeholder)}
              type={this.props.inputType}
              className="input1"
              required
              value={this.state.inputValue}
              onChange={(e) => this.getValue(e.target.value)}
              autoComplete="off"
              autoFocus={this.props.autoFocus}
              onKeyPress={this.onKeyDownInput}
            />
            {this.props.isRequired &&
              !this.state.isValid &&
              !this.state.inputValue && (
                <Alert key="danger" variant="danger">
                  {this.props.errorMessage}
                </Alert>
              )}
            <label className="label1">{this.props.placeholder} </label>
          </div>
        </div>
      </React.Fragment>
    );
  }
  public onKeyDownInput = (event: any) => {
    if (this.props.allowOnlyNumber) {
      var key = event.charCode;
      // Only allow numbers to be entered
      if (key < 48 || key > 57) {
        event.preventDefault();
      }
    }
  };
  componentDidUpdate(
    prevProps: Readonly<Props>,
    prevState: Readonly<ICInputControlState>,
    snapshot?: any
  ): void {
    if (prevProps.isValid !== this.props.isValid) {
      this.setState({
        isValid: this.props.isValid,
      });
    }
    if (prevProps.inputValue !== this.props.inputValue) {
      this.setState({
        inputValue: this.props.inputValue,
      });
    }
  }
}

const mapStateToProps = (states: IAppRootState): ICInputControlStateProps => ({
  appCommonState: states.rootState.appCommonState,
});

interface DispatchProps {}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>
): DispatchProps => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CInputControl);
