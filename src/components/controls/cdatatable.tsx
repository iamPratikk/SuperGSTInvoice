import * as React from "react";
import { IAppRootState } from "../../redux/store/appStore";
import { IAppCommonState } from "../../redux/reducers/appCommonState";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import ConfirmMessageView from "../modals/confirmMessage";
import {
  ActionFor,
  CustomDataTable,
  PageList,
} from "../../middleware/interface/commonInterface";
import { DeleteCountry } from "../../redux/actions/others/appActionsForCountry";
import { DeleteSalutation } from "../../redux/actions/masters/appActionsForSalutation";
import { DeleteState } from "../../redux/actions/others/appActionsForState";
import { DeleteIndustryType } from "../../redux/actions/masters/appActionsForIndustryType";
import { DeleteBusinessType } from "../../redux/actions/masters/appActionsForBusinessType";
import { DeleteFiscalYear } from "../../redux/actions/masters/appActionsForFiscalYear";
import { DeleteLanguage } from "../../redux/actions/masters/appActionsForLanguage";
import { DeleteDateFormat } from "../../redux/actions/masters/appActionsForDateFormat";
import { DeleteHsnCode } from "../../redux/actions/others/appActionsForHsncode";
import { DeleteGSTTreatment } from "../../redux/actions/others/appActionsForGSTTreatment";
import { DeleteCurrency } from "../../redux/actions/others/appActionsForCurrency";
import { DeleteTaxPreference } from "../../redux/actions/masters/appActionsForTaxPreference";

interface ICDataTableProps {
  pageName: PageList;
  onEditAction: any;
  dataTableList: CustomDataTable[];
  firstColumn: string;
  secondColumn: string;
}

interface ICDataTableStateProps {
  appCommonState: IAppCommonState;
}

type Props = ICDataTableStateProps & DispatchProps & ICDataTableProps;
// Component State

interface ICDataTableState {
  uniqueId: any;
  isShow: boolean;
}

class CDataTable extends React.Component<Props, ICDataTableState> {
  constructor(props: Props, context: any) {
    super(props, context);
    this.state = {
      isShow: false,
      uniqueId: 0,
    };
  }

  // Set default props
  static defaultProps = {
    secondColumn: "",
  };

  public render() {
    return (
      <React.Fragment>
        <div
          className="body-table height-200"
          style={{
            textTransform:
              this.props.pageName === PageList.DateFormat
                ? "none"
                : "capitalize",
          }}
        >
          <table className="table table-striped table-bordered table-hover">
            <thead className="table-dark text-center header-fixed">
              <tr>
                <th className="text-center" scope="col">
                  {this.props.firstColumn}
                </th>
                {this.props.secondColumn ? (
                  <th className="text-center" scope="col">
                    {this.props.secondColumn}
                  </th>
                ) : (
                  <></>
                )}
                <th className="text-center" scope="col">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {this.props.dataTableList.map((data: CustomDataTable) => (
                <tr key={data.uniqueId}>
                  <th scope="row">{data.firstColumn}</th>
                  {this.props.secondColumn ? (
                    <td>{data.secondColumn}</td>
                  ) : (
                    <></>
                  )}
                  <td>
                    <i
                      className="material-icons text-dark h5"
                      onClick={() => this.onEditAction(data.uniqueId)}
                    >
                      edit
                    </i>
                    &nbsp;&nbsp;
                    <i
                      className="material-icons text-dark h5"
                      onClick={() => this.onDeleteAction(data.uniqueId)}
                    >
                      delete_outline
                    </i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ConfirmMessageView
          isShow={this.state.isShow}
          closeConfirmMessage={this.closeConfirmMessage}
          actionFor={ActionFor.Delete}
        />
      </React.Fragment>
    );
  }

  public componentDidMount(): void {}
  componentDidUpdate(
    prevProps: Readonly<Props>,
    prevState: Readonly<ICDataTableState>,
    snapshot?: any
  ): void {}

  //On Delete Action
  public onDeleteAction = (uniqueId: string) => {
    //Show confirm message
    this.setState({ isShow: true, uniqueId: uniqueId });
  };

  //On Edit Action
  public onEditAction = (uniqueId: any) => {
    this.props.onEditAction(uniqueId);
  };

  //#region Popop

  public closeConfirmMessage = (isConfirm: boolean) => {
    this.setState({ isShow: false });
    if (isConfirm) {
      switch (this.props.pageName) {
        case PageList.Country:
          this.props.DeleteCountry(this.state.uniqueId);
          break;
        case PageList.State:
          this.props.DeleteState(this.state.uniqueId);
          break;
        case PageList.Currency:
          this.props.DeleteCurrency(this.state.uniqueId);
          break;
        case PageList.Salutation:
          this.props.DeleteSalutation(this.state.uniqueId);
          break;
        case PageList.IndustryType:
          this.props.DeleteIndustryType(this.state.uniqueId);
          break;
        case PageList.BusinessType:
          this.props.DeleteBusinessType(this.state.uniqueId);
          break;
        case PageList.FiscalYear:
          this.props.DeleteFiscalYear(this.state.uniqueId);
          break;
        case PageList.Language:
          this.props.DeleteLanguage(this.state.uniqueId);
          break;
        case PageList.DateFormat:
          this.props.DeleteDateFormat(this.state.uniqueId);
          break;
        case PageList.HSN:
          this.props.DeleteHsnCode(this.state.uniqueId);
          break;
        case PageList.GSTTreatment:
          this.props.DeleteGSTTreatment(this.state.uniqueId);
          break;
        case PageList.TaxPreference:
          this.props.DeleteTaxPreference(this.state.uniqueId);
          break;
        default:
          break;
      }
    }
  };

  //#endregion
}

const mapStateToProps = (states: IAppRootState): ICDataTableStateProps => ({
  appCommonState: states.rootState.appCommonState,
});

interface DispatchProps {
  DeleteCountry: (countryid: number) => void;
  DeleteState: (stateid: number) => void;
  DeleteCurrency: (currencycode: string) => void;
  DeleteSalutation: (salutationid: number) => void;
  DeleteIndustryType: (industrytypeid: number) => void;
  DeleteBusinessType: (businesstypeid: number) => void;
  DeleteFiscalYear: (fiscalid: number) => void;
  DeleteLanguage: (langcode: string) => void;
  DeleteDateFormat: (dateformatid: number) => void;
  DeleteHsnCode: (hsncode: number) => void;
  DeleteGSTTreatment: (gsttreatmentid: number) => void;
  DeleteTaxPreference: (taxpreferenceid: number) => void;
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>
): DispatchProps => ({
  DeleteCountry: (countryid: number) => dispatch(DeleteCountry(countryid)),
  DeleteState: (stateid: number) => dispatch(DeleteState(stateid)),
  DeleteCurrency: (currencycode: string) =>
    dispatch(DeleteCurrency(currencycode)),
  DeleteSalutation: (salutationid: number) =>
    dispatch(DeleteSalutation(salutationid)),
  DeleteIndustryType: (industrytypeid: number) =>
    dispatch(DeleteIndustryType(industrytypeid)),
  DeleteBusinessType: (businesstypeid: number) =>
    dispatch(DeleteBusinessType(businesstypeid)),
  DeleteFiscalYear: (fiscalid: number) => dispatch(DeleteFiscalYear(fiscalid)),
  DeleteLanguage: (langcode: string) => dispatch(DeleteLanguage(langcode)),
  DeleteDateFormat: (dateformatid: number) =>
    dispatch(DeleteDateFormat(dateformatid)),
  DeleteHsnCode: (hsncode: number) => dispatch(DeleteHsnCode(hsncode)),
  DeleteGSTTreatment: (gsttreatmentid: number) =>
    dispatch(DeleteGSTTreatment(gsttreatmentid)),
  DeleteTaxPreference: (taxpreferenceid: number) =>
    dispatch(DeleteTaxPreference(taxpreferenceid)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CDataTable);
