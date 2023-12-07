import { useState, useEffect, useRef } from "react";
import GetCompany from "./GetCompany";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import TableToExcel from "react-html-table-to-excel";
import { getOneWeekAgoDate, getCurrentDate } from "./CommonFunction";
import axios from "axios";
import logo from "../../assets/img/logo.jpeg";

const UserLog = () => {
  let userName = process.env.REACT_APP_API_USERNAME;
  let passWord = process.env.REACT_APP_API_PASSORD;
  const companies = GetCompany();
  const [compId, setCompId] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTill, setDateTill] = useState("");
  const [showDiv, setShowDiv] = useState(false);
  const [isDataPresent, setIsDataPresent] = useState(false);
  const pdfRef = useRef();
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentpage] = useState(1);
  const itemsPerPage = 7;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageItems = userData.slice(startIndex, endIndex);
  const d = new Date();
  const prevDate = dateFrom.slice(-2);
  const prevMonth = dateFrom.slice(-5, -3);
  const prevYear = dateFrom.slice(0, 4);
  const currenDate = dateTill.slice(-2);
  const currentMonth = dateTill.slice(-5, -3);
  const currentyear = dateTill.slice(0, 4);
  const currentTime = d.toLocaleTimeString();
  const hour = currentTime.slice(0, 2);
  const minute = currentTime.slice(3, 5);
  const today = getCurrentDate();

  // console.log(prevYear)

  useEffect(() => {
    setDateTill(getCurrentDate());
    setDateFrom(getOneWeekAgoDate());
  }, []);

  useEffect(() => {
    getCompanyId();
  }, [selectedCompany]);

  async function getCompanyId() {
    const id = companies.find(
      (company) => company.compname === selectedCompany
    );
    if (id) {
      setCompId(id.compid);
    }
  }

  function handleSelectChange(e) {
    setSelectedCompany(e.target.value);
  }

  function handleDate(e) {
    // console.log(e.target.value);
    if (e.target.name === "startDate") {
      setDateFrom(e.target.value);
    } else if (e.target.name === "endDate") {
      setDateTill(e.target.value);
    }
  }

  const getUserLog = async () => {
    if (!dateFrom || !dateTill) {
      alert("Please Enter Start and End dates");
      return;
    }
    axios
      .get(
        `http://knowforth.online:8003/api/GetUserLog?compid=${compId}&startDate=${dateFrom}&endDate=${dateTill}`,
        {
          auth: {
            username: userName,
            password: passWord,
          },
        }
      )
      .then((res) => {
        if (res.data) {
          setUserData(res.data);
        }
        if (res.data.length == 0) {
          setIsDataPresent(false);
        }
        if (res.data.length > 0) {
          setIsDataPresent(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const downloadPdf = async () => {
    const printLabel = document.getElementById("printLabel");
    const printDate = document.getElementById("printDate");
    const printLogo = document.getElementById("pdfLogo");
    printLabel.classList.add("showLabel");
    printLogo.classList.add("showLabel");
    printDate.classList.add("showLabel");
    setTimeout(() => {
      const input = pdfRef.current;
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4", true);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        const imgY = 30;
        pdf.addImage(
          imgData,
          "PNG",
          imgX,
          imgY,
          imgWidth * ratio,
          imgHeight * ratio
        );
        pdf.save(`UserLog${dateTill}|${hour}:${minute}.pdf`);
      });
      printLabel.classList.remove("showLabel");
      printDate.classList.remove("showLabel");
      printLogo.classList.remove("showLabel");
    }, 50);
  };

  const print = () => {
    const printLabel = document.getElementById("printLabel");
    printLabel.classList.add("showLabel");
    window.print();
    printLabel.classList.remove("showLabel");
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(userData.length / itemsPerPage)) {
      setCurrentpage((prev) => prev + 1);
    }
  };
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentpage((prev) => prev - 1);
    }
  };

  return (
    <div>
      <div className="card-body">
        <div className="row ">
          <div className="col-lg-6 col-12 col-sm-6 col-md-6 ">
            <div className="input-group-my pt-2">
              <div className="group1 mb-2">
                <input
                  type="date"
                  placeholder=""
                  value={dateFrom}
                  name="startDate"
                  onChange={handleDate}
                  className="input1"
                  id="input1"
                  required
                />
                <label className="label1">Date From </label>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-12 col-sm-6 col-md-6 ">
            <div className="input-group-my pt-2">
              <div className="group1 mb-2">
                <input
                  type="date"
                  placeholder=""
                  value={dateTill}
                  name="endDate"
                  onChange={handleDate}
                  className="input1"
                  id="input"
                  required
                />
                <label className="label1">Date Till </label>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6 col-12 col-sm-6 col-md-6">
            <div className="input-group-my pt-2">
              <div className="group mb-2">
                <select
                  value={selectedCompany}
                  onChange={handleSelectChange}
                  type="text"
                  className="input"
                  required
                >
                  <option disabled hidden></option>
                  {companies.map((item, index) => {
                    return <option key={index}>{item.compname}</option>;
                  })}
                </select>
                <label className="label">Company</label>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-12 col-sm-6 col-md-6 ">
            <div className="row">
              <div className="col-lg-12 col-12 col-sm-12 col-md-12 text-right">
                <div className="dropdown mx-2 d-flex justify-content-end ">
                  <button
                    type="button"
                    onClick={getUserLog}
                    className="btn btn-kec mx-1 "
                  >
                    Run Report
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary mx-1"
                    onClick={print}
                  >
                    Print
                  </button>
                  <button
                    type="button"
                    className="btn btn-success dropdown-tog mx-1"
                    onFocus={() => setShowDiv(true)}
                    onBlur={() => setShowDiv(false)}
                  >
                    Download
                  </button>
                  <div
                    className={
                      showDiv
                        ? "dropdown-menu col-3 show"
                        : "dropdown-menu col-3"
                    }
                    style={{ top: "58px", right: "0px" }}
                  >
                    <TableToExcel
                      id="test-table"
                      table="mainTable"
                      className="dropdown-item"
                      filename={`UserLog${dateTill}|${hour}:${minute}`}
                      sheet="sheet 1"
                      buttonText="Export to Excel"
                    />
                    {/* // /> <a className="dropdown-item" href="#"> */}
                    {/* //   Excel */}
                    {/* // </a> */}

                    <a className="dropdown-item" onClick={downloadPdf}>
                      PDF
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row" ref={pdfRef}>
          <div className="sidebar-header forPdf" id="pdfLogo">
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

          <div
            className="body-table height-400"
            id="tableParent"
            style={{ minHeight: "170px" }}
          >
            <div id="printLabel" className="">
              <h5>
                User Log of {selectedCompany} from {prevDate}-{prevMonth}-
                {prevYear} to {currenDate}-{currentMonth}-{currentyear}
              </h5>
            </div>
            <table
              id="mainTable"
              className="table table-striped table-bordered table-hover "
            >
              <thead
                className="table-dark text-center header-fixed"
                style={{ display: "none" }}
              >
                <tr>
                  <th className="text-center" scope="col">
                    User Log of
                  </th>
                  <td>{selectedCompany}</td>
                  <td>from {dateFrom}</td>
                  <td>to {dateTill}</td>
                </tr>
              </thead>
              <thead className="table-dark text-center header-fixed">
                <tr>
                  <th className="text-center" scope="col">
                    User Name
                  </th>
                  <th className="text-center" scope="col">
                    User Type
                  </th>
                  <th className="text-center" scope="col">
                    Action
                  </th>
                  <th className="text-center" scope="col">
                    Transacted at
                  </th>
                  <th className="text-center" scope="col">
                    Transacted From
                  </th>
                </tr>
              </thead>
              <tbody className={isDataPresent ? "d-visible" : "d-none"}>
                {currentPageItems.map((item, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{item.fullname}</th>
                      <td>{item.usertype}</td>
                      <td>{item.logaction}</td>
                      <td>{item.logdate.slice(0, 10)}</td>
                      <td>{item.workedon}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div id="printDate">
              <p>
                Date-{today} || {hour}:{minute}
              </p>
            </div>
          </div>
        </div>
        {isDataPresent ? (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginRight: "50px",
            }}
          >
            <button
              type="button"
              className="btn btn-primary mx-1"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              prev
            </button>
            <button
              type="button"
              className="btn btn-primary mx-1"
              onClick={handleNextPage}
              disabled={
                currentPage === Math.ceil(userData.length / itemsPerPage)
              }
            >
              Next
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default UserLog;
