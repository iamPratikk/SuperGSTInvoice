import * as React from "react";
import { IAppRootState } from "../../../../redux/store/appStore";
import { IAppCommonState } from "../../../../redux/reducers/appCommonState";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import {
  DefaultSalutationDetails,
  ISalutationDetails,
} from "../../../../middleware/interface/masters/salutationInterface";
import { SaveSalutation } from "../../../../redux/actions/masters/appActionsForSalutation";
import {
  getDataTableList,
  getUniqueID,
} from "../../../../utils/CommonFuntions";
import { APP_STRINGS } from "../../../../utils/commonStrings";
import Form from "react-bootstrap/Form";
import CInputControl from "../../../controls/cinputcontrol";
import CSelectControl from "../../../controls/cselectcontrol";
import CButtonControl from "../../../controls/cbuttoncontrol";
import CDataTable from "../../../controls/cdatatable";
import { PageList } from "../../../../middleware/interface/commonInterface";

interface ISalutationPageFormProps {}
interface ISalutationPageFormStateProps {
  appCommonState: IAppCommonState;
}
type Props = ISalutationPageFormStateProps &
  DispatchProps &
  ISalutationPageFormProps;
// Component State
interface ISalutationPageFormState {
  formData: ISalutationDetails;
  isValid: boolean;
}

class SalutationPageForm extends React.Component<
  Props,
  ISalutationPageFormState
> {
  constructor(props: Props, context: any) {
    super(props, context);
    this.state = {
      formData: { ...DefaultSalutationDetails },
      isValid: true,
    };
  }

  public render() {
    return (
      <React.Fragment>
        <Form>
          <div className="row ">
            <div className="col-lg-6 col-12 col-sm-6 col-md-6">
              <CInputControl
                placeholder={APP_STRINGS.LABELS.SALUTATION.SALUTATION}
                errorMessage={APP_STRINGS.ERROR_MESSAGES.SALUTATION.SALUTATION}
                inputValue={this.state.formData.salutation}
                getValue={this.setFormData}
                isValid={this.state.isValid}
              />
            </div>
            <div className="col-lg-6 col-12 col-sm-6 col-md-6">
              <CSelectControl
                placeholder={APP_STRINGS.LABELS.SALUTATION.GENDER}
                errorMessage={APP_STRINGS.ERROR_MESSAGES.SALUTATION.GENDER}
                selectedValue={this.state.formData.gender}
                getValue={this.setFormData}
                listValue={this.props.appCommonState.genderList}
                isValid={this.state.isValid}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-12 col-sm-4 col-md-4"></div>
            <div className="col-lg-8 col-12 col-sm-8 col-md-8 text-right mt-2">
              <CButtonControl displayText="Save" onClick={this.OnClickSave} />
            </div>
          </div>
          <div className="row">
            <CDataTable
              pageName={PageList.Salutation}
              onEditAction={this.onEditAction}
              firstColumn="Salutation"
              secondColumn="Gender"
              dataTableList={getDataTableList(PageList.Salutation)}
            />
          </div>
        </Form>
      </React.Fragment>
    );
  }

  public setFormData = (fieldName: string, feildValue: any) => {
    let cFormData = this.state.formData;
    switch (fieldName) {
      case getUniqueID(APP_STRINGS.LABELS.SALUTATION.SALUTATION):
        cFormData.salutation = feildValue;
        break;
      case getUniqueID(APP_STRINGS.LABELS.SALUTATION.GENDER):
        cFormData.gender = feildValue;
        break;
      default:
        break;
    }
    this.setState({
      formData: cFormData,
    });
  };

  public OnClickSave = () => {
    //Verify required form value
    if (this.state.formData.salutation && this.state.formData.gender) {
      let cformData = this.state.formData;
      if (this.state.formData.salid === 0) {
        const isData = this.props.appCommonState.salutationList.find(
          (data: ISalutationDetails) =>
            data.salutation.toLowerCase() === cformData.salutation.toLowerCase()
        );
        //Already exist
        if (isData) {
          cformData.salid = isData.salid;
        }
      }
      this.props.SaveSalutationDetails(cformData);
      //Reset form control
      this.setState({
        formData: { ...DefaultSalutationDetails },
        isValid: true,
      });
    } else {
      //Display error for all required fields
      this.setState({ isValid: false });
    }
  };

  //On Edit Action
  public onEditAction = (uniqueId: number) => {
    //Set selected data
    const selectedData = this.props.appCommonState.salutationList.find(
      (data: ISalutationDetails) => data.salid === uniqueId
    );
    if (selectedData) {
      this.setState({
        formData: {
          salid: selectedData.salid,
          salutation: selectedData.salutation,
          gender: selectedData.gender,
        },
        isValid: true,
      });
    }
  };
}

const mapStateToProps = (
  states: IAppRootState
): ISalutationPageFormStateProps => ({
  appCommonState: states.rootState.appCommonState,
});

interface DispatchProps {
  SaveSalutationDetails: (data: ISalutationDetails) => void;
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>
): DispatchProps => ({
  SaveSalutationDetails: (data: ISalutationDetails) =>
    dispatch(SaveSalutation(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SalutationPageForm);
