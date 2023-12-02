import * as React from "react";
import { IAppRootState } from "../../redux/store/appStore";
import { IAppCommonState } from "../../redux/reducers/appCommonState";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import {
  CustomDataTable,
  PageList,
} from "../../middleware/interface/commonInterface";
import { getDataTableList } from "../../utils/CommonFuntions";

interface ICBulkDataTableProps {
  pageName: PageList;
}

interface ICBulkDataTableStateProps {
  appCommonState: IAppCommonState;
}

type Props = ICBulkDataTableStateProps & DispatchProps & ICBulkDataTableProps;
// Component State

interface ICBulkDataTableState {
  dataTableList: CustomDataTable[];
  firstColumn: string;
  secondColumn: string;
}

class CBulkDataTable extends React.Component<Props, ICBulkDataTableState> {
  constructor(props: Props, context: any) {
    super(props, context);
    this.state = { dataTableList: [], firstColumn: "", secondColumn: "" };
  }

  public render() {
    return (
      <React.Fragment>
        <div className="body-table height-200">
          <table className="table table-striped table-bordered table-hover ">
            <thead className="table-dark text-center header-fixed">
              <tr>
                <th className="text-center" scope="col">
                  {this.state.firstColumn}
                </th>
                {this.state.secondColumn ? (
                  <th className="text-center" scope="col">
                    {this.state.secondColumn}
                  </th>
                ) : (
                  <></>
                )}
              </tr>
            </thead>
            <tbody>
              {this.state.dataTableList.map((data: CustomDataTable) => (
                <tr key={data.uniqueId}>
                  <th scope="row">{data.firstColumn}</th>
                  {this.state.secondColumn ? (
                    <td>{data.secondColumn}</td>
                  ) : (
                    <></>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }

  public componentDidMount(): void {}

  componentDidUpdate(
    prevProps: Readonly<Props>,
    prevState: Readonly<ICBulkDataTableState>,
    snapshot?: any
  ): void {
    if (this.props.pageName !== prevProps.pageName) {
      switch (this.props.pageName) {
        case PageList.Country:
          this.setState({
            firstColumn: "Country",
            secondColumn: "Currency",
            dataTableList: getDataTableList(this.props.pageName),
          });
          break;
        case PageList.State:
          this.setState({
            firstColumn: "State",
            secondColumn: "Country",
            dataTableList: getDataTableList(this.props.pageName),
          });
          break;
        case PageList.Currency:
          this.setState({
            firstColumn: "Currency Code",
            secondColumn: "Symbol",
            dataTableList: getDataTableList(this.props.pageName),
          });
          break;
        case PageList.HSN:
          this.setState({
            firstColumn: "HSN Code",
            secondColumn: "Code Type",
            dataTableList: getDataTableList(this.props.pageName),
          });
          break;
        case PageList.IndustryType:
          this.setState({
            firstColumn: "Industry Type",
            secondColumn: "",
            dataTableList: getDataTableList(this.props.pageName),
          });
          break;
        case PageList.BusinessType:
          this.setState({
            firstColumn: "Business Type",
            secondColumn: "",
            dataTableList: getDataTableList(this.props.pageName),
          });
          break;
        case PageList.Language:
          this.setState({
            firstColumn: "Code",
            secondColumn: "Name",
            dataTableList: getDataTableList(this.props.pageName),
          });
          break;
        case PageList.GSTTreatment:
          this.setState({
            firstColumn: "GST Treatment",
            secondColumn: "",
            dataTableList: getDataTableList(this.props.pageName),
          });
          break;
        default:
          this.setState({
            firstColumn: "",
            secondColumn: "",
            dataTableList: [],
          });
          break;
      }
    }
  }
}

const mapStateToProps = (states: IAppRootState): ICBulkDataTableStateProps => ({
  appCommonState: states.rootState.appCommonState,
});

interface DispatchProps {}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>
): DispatchProps => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CBulkDataTable);
