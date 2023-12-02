import * as React from "react";
import { IAppRootState } from "../../redux/store/appStore";
import { IAppCommonState } from "../../redux/reducers/appCommonState";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { Alert, Form } from "react-bootstrap";
import { DropDown } from "../../middleware/interface/commonInterface";
import { getUniqueID } from "../../utils/CommonFuntions";

interface ICSelectControlProps {
  getValue: any;
  selectedValue: any;
  placeholder: string;
  errorMessage: string;
  isRequired: boolean;
  listValue: DropDown[];
  isValid: boolean;
}

interface ICSelectControlStateProps {
  appCommonState: IAppCommonState;
}
type Props = ICSelectControlStateProps & DispatchProps & ICSelectControlProps;
// Component State
interface ICSelectControlState {
  selectedValue: any;
  isValid: boolean;
}

class CSelectControl extends React.PureComponent<Props, ICSelectControlState> {
  constructor(props: Props, context: any) {
    super(props, context);
    this.state = {
      selectedValue: this.props.selectedValue,
      isValid: true,
    };
  }

  // Set default props
  static defaultProps = {
    isRequired: true,
    errorMessage: "",
    isValid: true,
  };

  getValue(value: any) {
    this.setState({
      selectedValue: value,
      isValid: value ? true : false,
    });
    this.props.getValue(getUniqueID(this.props.placeholder), value);
  }

  public render() {
    return (
      <React.Fragment>
        <div className="input-group-my pt-2">
          <div className="group1 mb-2">
            <Form.Select
              id={getUniqueID(this.props.placeholder)}
              className="input"
              required
              value={this.state.selectedValue}
              onChange={(e) => this.getValue(e.target.value)}
            >
              <option key="optionmainkey1" value=""></option>
              {this.props.listValue.map((option: DropDown) => {
                return (
                  <option key={option.Value} value={option.Value}>
                    {option.Name}
                  </option>
                );
              })}
            </Form.Select>
            {this.props.isRequired &&
              !this.state.isValid &&
              !this.state.selectedValue && (
                <Alert key="danger" variant="danger">
                  {this.props.errorMessage}
                </Alert>
              )}
            <label className="label">{this.props.placeholder} </label>
          </div>
        </div>
      </React.Fragment>
    );
  }
  componentDidUpdate(
    prevProps: Readonly<Props>,
    prevState: Readonly<ICSelectControlState>,
    snapshot?: any
  ): void {
    if (prevProps.isValid !== this.props.isValid) {
      this.setState({
        isValid: this.props.isValid,
      });
    }
    if (prevProps.selectedValue !== this.props.selectedValue) {
      this.setState({
        selectedValue: this.props.selectedValue,
      });
    }
  }
}

const mapStateToProps = (states: IAppRootState): ICSelectControlStateProps => ({
  appCommonState: states.rootState.appCommonState,
});

interface DispatchProps {}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>
): DispatchProps => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CSelectControl);
