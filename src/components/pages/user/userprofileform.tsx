import * as React from "react";
import { IAppRootState } from "../../../redux/store/appStore";
import { IAppCommonState } from "../../../redux/reducers/appCommonState";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { Button, Form } from "react-bootstrap";
import { IUserDetails } from "../../../middleware/interface/userInterface";
import {
  GetUserPicture,
  resetApiResult,
} from "../../../redux/actions/appActionsForCommon";
import {
  GetUserDet,
  SendEmailOTP,
  SendMobileOTP,
  UpdateUserDet,
} from "../../../redux/actions/appActionsForUsers";
import {
  SENDEMAILOTP,
  SENDMOBILEOTP,
  UPDATEUSERDET,
} from "../../../redux/reduxConstants";
import {
  FormControlType,
  IGlobalStateVariable,
  MessageType,
  ProfilePictureAction,
} from "../../../middleware/interface/commonInterface";
import CInputControl from "../../controls/cinputcontrol";
import { APP_STRINGS } from "../../../utils/commonStrings";
import { getUniqueID } from "../../../utils/CommonFuntions";
import CSelectControl from "../../controls/cselectcontrol";
import { GetAllSalutations } from "../../../redux/actions/masters/appActionsForSalutation";

interface IUserProfileFormProps {
  showMessagePopup: any;
}

interface IUserProfileFormStateProps {
  appCommonState: IAppCommonState;
}

type Props = IUserProfileFormStateProps & DispatchProps & IUserProfileFormProps;

// Component State
interface IUserProfileFormState {
  formData: IUserDetails;
  isValid: boolean;
  selectedFile: any;
  selectedFilePath: string;
  profilepIctureAction: ProfilePictureAction;
}

class UserProfileForm extends React.Component<Props, IUserProfileFormState> {
  constructor(props: Props, context: any) {
    super(props, context);
    this.state = {
      formData: this.props.appCommonState.userDetails,
      isValid: true,
      selectedFile: null,
      selectedFilePath: "",
      profilepIctureAction: ProfilePictureAction.None,
    };
  }

  public OnVerifyEmailId = () => {
    //Verify required form value
    if (this.state.formData.emailid) {
      this.props.SendEmailOTP(this.state.formData.emailid);
    } else {
      //Display error for all required fields
      this.setState({ isValid: false });
    }
  };

  public OnVerifyMobileNumber = () => {
    //Verify required form value
    if (this.state.formData.mobileno) {
      this.props.SendMobileOTP(this.state.formData.mobileno);
    } else {
      //Display error for all required fields
      this.setState({ isValid: false });
    }
  };

  public render() {
    const userPicData = this.props.appCommonState.globalStateVariable
      .userPicString
      ? `data:image/jpeg;base64,${this.props.appCommonState.globalStateVariable.userPicString}`
      : null;
    const Verified = () => {
      return (
        <React.Fragment>
          <i
            className="material-icons"
            style={{ paddingLeft: "10px", color: "green" }}
          >
            verified
          </i>
        </React.Fragment>
      );
    };

    const VerifyEmailId = () => {
      return (
        <React.Fragment>
          <span
            style={{ color: "Red", cursor: "pointer", paddingLeft: "10px" }}
            onClick={this.OnVerifyEmailId}
          >
            Verify Email ID
          </span>
        </React.Fragment>
      );
    };

    const VerifyMobileNumber = () => {
      return (
        <React.Fragment>
          <span
            style={{ color: "Red", cursor: "pointer", paddingLeft: "10px" }}
            onClick={this.OnVerifyMobileNumber}
          >
            Verify Mobile Number
          </span>
        </React.Fragment>
      );
    };

    return (
      <React.Fragment>
        <div className="row profile">
          <div className="profile-pic">
            {userPicData ? (
              <img
                src={userPicData}
                alt=""
                className="rounded-circle img-thumbnail"
              />
            ) : (
              <></>
            )}
          </div>
          <div className="col-lg-12 col-12 col-sm-12 col-md-12 text-center">
            <Form.Check
              inline
              label="Edit"
              name="group1"
              type="radio"
              id={`inline-radio-Edit`}
              checked={
                this.state.profilepIctureAction === ProfilePictureAction.Change
                  ? true
                  : false
              }
              onChange={(e) => this.onClickProfilePIctureAction("Edit")}
            />
            <Form.Check
              inline
              label="Remove"
              name="group1"
              type="radio"
              id={`inline-radio-Remove`}
              checked={
                this.state.profilepIctureAction === ProfilePictureAction.Remove
                  ? true
                  : false
              }
              onChange={(e) => this.onClickProfilePIctureAction("Remove")}
            />
            {this.state.profilepIctureAction === ProfilePictureAction.Change ? (
              <Form.Control
                type="file"
                accept=".jpg"
                onChange={this.onSelectProfilePicFile}
                value={this.state.selectedFilePath}
              />
            ) : (
              <></>
            )}
          </div>
          <div className="col-lg-12 col-12 col-sm-12 col-md-12 mt-4">
            <CInputControl
              placeholder={APP_STRINGS.LABELS.USERPROFILE.COMPANYNAME}
              errorMessage={APP_STRINGS.ERROR_MESSAGES.USERPROFILE.COMPANYNAME}
              inputValue={this.state.formData.company}
              getValue={this.setFormData}
              isValid={this.state.isValid}
            />
          </div>
          <div className="col-lg-4 col-4 col-sm-3 col-md-3 mt-2">
            <CSelectControl
              placeholder={APP_STRINGS.LABELS.USERPROFILE.SALUTATION}
              errorMessage={APP_STRINGS.ERROR_MESSAGES.USERPROFILE.SALUTATION}
              selectedValue={this.state.formData.salid}
              getValue={this.setFormData}
              listValue={this.props.appCommonState.salutationList
                .sort((x) => x.salid)
                .map((option) => {
                  return { Name: option.salutation, Value: option.salid };
                })}
              isValid={this.state.isValid}
            />
          </div>
          <div className="col-lg-8 col-8 col-sm-8 col-md-8 mt-2">
            <CInputControl
              placeholder={APP_STRINGS.LABELS.USERPROFILE.FULLNAME}
              errorMessage={APP_STRINGS.ERROR_MESSAGES.USERPROFILE.FULLNAME}
              inputValue={this.state.formData.fullname}
              getValue={this.setFormData}
              isValid={this.state.isValid}
            />
          </div>
          <div className="col-lg-12 col-12 col-sm-12 col-md-12">
            <div className="verifirdedbutton">
              <CInputControl
                placeholder={APP_STRINGS.LABELS.USERPROFILE.EMAILID}
                errorMessage={APP_STRINGS.ERROR_MESSAGES.USERPROFILE.EMAILID}
                inputValue={this.state.formData.emailid}
                getValue={this.setFormData}
                inputType={FormControlType.Email}
                isValid={this.state.isValid}
              />
              <div className="d-flex justify-content-end">
                <span className="forget_text-pwd f-8 email-varify">
                  {this.props.appCommonState.userDetails.isemailverified ? (
                    <Verified />
                  ) : (
                    <VerifyEmailId />
                  )}
                </span>
              </div>
            </div>
          </div>
          <div className="col-lg-12 col-12 col-sm-12 col-md-12">
            <div className="verifirdedbutton">
              <CInputControl
                placeholder={APP_STRINGS.LABELS.USERPROFILE.MOBILE}
                errorMessage={APP_STRINGS.ERROR_MESSAGES.USERPROFILE.MOBILE}
                inputValue={this.state.formData.mobileno}
                getValue={this.setFormData}
                isValid={this.state.isValid}
                allowOnlyNumber={true}
              />
              <div className="d-flex justify-content-end">
                <span className="forget_text-pwd f-8 email-varify">
                  {this.props.appCommonState.userDetails.ismobileverified ? (
                    <Verified />
                  ) : (
                    <VerifyMobileNumber />
                  )}
                </span>
              </div>
            </div>
          </div>
          <div className="col-lg-12 col-12 col-sm-12 col-md-12 text-center">
            <Button
              id="btnUpload"
              className="gst-btn"
              onClick={this.OnClickUpdate}
            >
              Update
            </Button>
          </div>
        </div>
      </React.Fragment>
    );
  }

  //#region Form Events

  public componentDidMount(): void {
    this.props.GetSalutationList();
  }

  public componentDidUpdate(
    prevProps: Readonly<Props>,
    prevState: Readonly<IUserProfileFormState>,
    snapshot?: any
  ): void {
    //Get user details
    if (
      this.props.appCommonState.userDetails &&
      this.props.appCommonState.userDetails !==
        prevProps.appCommonState.userDetails
    ) {
      //Save redux state to local state
      this.setState({
        formData: this.props.appCommonState.userDetails,
      });
    }

    //Update User Details
    if (
      this.props.appCommonState.apiResult.actionName &&
      prevProps.appCommonState.apiResult.actionName !==
        this.props.appCommonState.apiResult.actionName
    ) {
      //Show alert based on action and api response
      if (
        this.props.appCommonState.apiResult.actionName === UPDATEUSERDET ||
        this.props.appCommonState.apiResult.actionName === SENDEMAILOTP ||
        this.props.appCommonState.apiResult.actionName === SENDMOBILEOTP
      ) {
        if (this.props.appCommonState.apiResult.isSuccess) {
          //Show toaster message
          this.props.showMessagePopup(
            this.props.appCommonState.apiResult.apiResponse,
            MessageType.Toaster_Success
          );
          //Reset form
          this.resetForm();
          //Get User Details
          this.props.GetUserDetails(
            this.props.appCommonState.globalStateVariable.userId
          );
          //Get user prifile pic
          this.props.GetUserPicture(
            this.props.appCommonState.globalStateVariable
          );
        } else {
          //Show what response getting from API
          this.props.showMessagePopup(
            this.props.appCommonState.apiResult.apiResponse,
            MessageType.Popup_Error
          );
        }
        //Reset API flag
        this.props.resetApiResult();
      }
    }
  }

  public onClickProfilePIctureAction = (e: any) => {
    switch (e) {
      case "Edit":
        this.setState({ profilepIctureAction: ProfilePictureAction.Change });
        break;
      case "Remove":
        this.setState({ profilepIctureAction: ProfilePictureAction.Remove });
        break;
      default:
        break;
    }
  };

  public setFormData = (fieldName: string, feildValue: any) => {
    let cFormData = this.state.formData;
    switch (fieldName) {
      case getUniqueID(APP_STRINGS.LABELS.USERPROFILE.COMPANYNAME):
        cFormData.company = feildValue;
        break;
      case getUniqueID(APP_STRINGS.LABELS.USERPROFILE.SALUTATION):
        cFormData.salid = Number(feildValue);
        break;
      case getUniqueID(APP_STRINGS.LABELS.USERPROFILE.FULLNAME):
        cFormData.fullname = feildValue;
        break;
      case getUniqueID(APP_STRINGS.LABELS.USERPROFILE.EMAILID):
        cFormData.emailid = feildValue;
        break;
      case getUniqueID(APP_STRINGS.LABELS.USERPROFILE.MOBILE):
        cFormData.mobileno = feildValue;
        break;
      default:
        break;
    }
    this.setState({ formData: cFormData });
  };

  public OnClickUpdate = () => {
    //Verify required form value
    if (
      this.state.formData.salid &&
      this.state.formData.company &&
      this.state.formData.fullname &&
      this.state.formData.emailid &&
      this.state.formData.mobileno
    ) {
      switch (this.state.profilepIctureAction) {
        case 0:
          this.props.UpdateUserDetails(
            this.state.formData,
            this.props.appCommonState.globalStateVariable.userPicBinary
          );
          break;
        case 1:
          if (this.state.selectedFile) {
            this.props.UpdateUserDetails(
              this.state.formData,
              this.state.selectedFile
            );
          } else {
            this.props.UpdateUserDetails(
              this.state.formData,
              this.props.appCommonState.globalStateVariable.userPicBinary
            );
          }
          break;
        case 2:
          this.props.UpdateUserDetails(this.state.formData, null);
          break;
        default:
          break;
      }
    } else {
      //Display error for all required fields
      this.setState({ isValid: false });
    }
  };

  public resetForm() {
    //Reset Form
    this.setState({
      isValid: true,
      selectedFile: null,
      selectedFilePath: "",
    });
  }
  public onSelectProfilePicFile = (event: any) => {
    try {
      //verfy valid file type only allow jpeg
      if (event.target.files[0].type.toLowerCase() !== "image/jpeg") {
        this.props.showMessagePopup(
          "Select only valid jpg file.",
          MessageType.Popup_Error
        );
        //Reset form
        this.resetForm();
      } else {
        this.setState({
          selectedFile: event.target.files[0],
          selectedFilePath: event.target.value,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  //#endregion
}

const mapStateToProps = (
  states: IAppRootState
): IUserProfileFormStateProps => ({
  appCommonState: states.rootState.appCommonState,
});

interface DispatchProps {
  resetApiResult: () => void;
  UpdateUserDetails: (userDetails: IUserDetails, picfile: any) => void;
  GetUserDetails: (userid: number) => void;
  GetUserPicture: (globalStateVariable: IGlobalStateVariable) => void;
  SendEmailOTP: (emailid: string) => void;
  SendMobileOTP: (mobileno: string) => void;
  GetSalutationList: () => void;
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>
): DispatchProps => ({
  resetApiResult: () => dispatch(resetApiResult()),
  UpdateUserDetails: (userDetails: IUserDetails, picfile: any) =>
    dispatch(UpdateUserDet(userDetails, picfile)),
  GetUserDetails: (userid: number) => dispatch(GetUserDet(userid)),
  GetUserPicture: (globalStateVariable: IGlobalStateVariable) =>
    dispatch(GetUserPicture(globalStateVariable)),
  SendEmailOTP: (emailid: string) => dispatch(SendEmailOTP(emailid)),
  SendMobileOTP: (mobileno: string) => dispatch(SendMobileOTP(mobileno)),
  GetSalutationList: () => dispatch(GetAllSalutations()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileForm);
