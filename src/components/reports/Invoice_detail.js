import React, { useState, useEffect, useRef } from "react";
import GetCompany from "./GetCompany";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import TableToExcel from "react-html-table-to-excel";
import { getOneWeekAgoDate,getCurrentDate } from "./CommonFunction";
import logo from "../../assets/img/logo.jpeg";

const Invoice_detail = () => {
  let userName = process.env.REACT_APP_API_USERNAME;
  let passWord = process.env.REACT_APP_API_PASSORD;
  const companies = GetCompany();
  const [selectedComp, setSelectedComp] = useState("");
  const [compId, setCompId] = useState("");
  const [showDiv, setShowDiv] = useState(false);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTill, setDateTill] = useState("");
  const [isDataPresent, setIsDataPresent] = useState(false);
  const [userData, setUserData]= useState([]);
  const pdfRef = useRef();
  const d = new Date();
  const currentTime = d.toLocaleTimeString();
  const hour = currentTime.slice(0, 2);
  const minute = currentTime.slice(3, 5);
  const today = getCurrentDate();
  const prevDate = dateFrom.slice(-2);
  const prevMonth = dateFrom.slice(-5, -3);
  const prevYear = dateFrom.slice(0, 4);
  const currenDate = dateTill.slice(-2);
  const currentMonth = dateTill.slice(-5, -3);
  const currentyear = dateTill.slice(0, 4);

  useEffect(() => {
    setDateTill(getCurrentDate());
    setDateFrom(getOneWeekAgoDate());
  }, []);

  useEffect(() => {
    getCompanyId();
  }, [selectedComp]);

  function handleSelectChange(e) {
    setSelectedComp(e.target.value);
  }
  async function getCompanyId() {
    const id = companies.find((company) => company.compname === selectedComp);
    if (id) {
      setCompId(id.compid);
    }
  }

  function handleDate(e) {
    // console.log(e.target.value);
    if (e.target.name === "startDate") {
      setDateFrom(e.target.value);
    } else if (e.target.name === "endDate") {
      setDateTill(e.target.value);
    }
  }

  async function getInvDetails() {
    if (!dateFrom || !dateTill) {
      alert("Please Enter Start and End dates");
      return;
    }
    if (!selectedComp) {
      alert("Please provide company details");
      return;
    }
    try {
      const response = await axios.get(
        `http://knowforth.online:8003/api/GetInvDetails/${compId}?startDate=${dateFrom}&endDate=${dateTill}`,
        {
          auth: {
            username: userName,
            password: passWord,
          },
        }
      );
      if(response.data){
        setUserData(response.data);
      }
      if(response.data.length>0){
        setIsDataPresent(true)
      }
    } catch (error) {
      console.log(error);
    }
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
        pdf.save(`InvDetails${dateTill}|${hour}:${minute}.pdf`);
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

  return (
    <div>
      <div className="card-body">
        <div className="row ">
          <div className="col-lg-6 col-12 col-sm-6 col-md-6 ">
            <div className="input-group-my pt-2">
              <div className="group1 mb-2">
                <input
                  type="date"
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
                  value={selectedComp}
                  onChange={handleSelectChange}
                  type="text"
                  className="input"
                  required
                >
                  <option disabled hidden></option>
                  {companies.map((item, index) => {
                    return <option key={item.compid}>{item.compname}</option>;
                  })}
                </select>
                <label className="label">Company</label>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-12 col-sm-12 col-md-12 ">
            <div className="row">
              <div className="col-lg-12 col-12 col-sm-12 col-md-12 text-right">
                <div className="dropdown mx-2 d-flex justify-content-end">
                  <button
                    type="button"
                    onClick={getInvDetails}
                    className="btn btn-kec mx-1"
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
                    data-toggle="dropdown"
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
                    {/* <a className="dropdown-item" href="#">
                      Excel
                    </a> */}
                    <TableToExcel
                      id="test-table"
                      table="mainTable"
                      className="dropdown-item"
                      filename={`InvDetails${dateTill}|${hour}:${minute}`}
                      sheet="sheet 1"
                      buttonText="Export to Excel"
                    />
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
          <div className="body-table height-400" id="tableParent">
          <div id="printLabel">
              <h5>
                Invoice Details of {selectedComp} from {prevDate}-{prevMonth}-
                {prevYear} to {currenDate}-{currentMonth}-{currentyear}
              </h5>
            </div>
            <table id="mainTable" className="table table-striped table-bordered table-hover ">
            <thead
                className="table-dark text-center header-fixed"
                style={{ display: "none" }}
              >
                <tr>
                  <th className="text-center" scope="col">
                    Invoice Details of
                  </th>
                  <th>{selectedComp}</th>
                  <th>from {prevDate}-{prevMonth}-{prevYear}</th>
                  <th>to {currenDate}-{currentMonth}-{currentyear}</th>
                </tr>
              </thead>
              <thead className="table-dark text-center header-fixed">
                <tr>
                  <th className="text-center" scope="col">
                    Status{" "}
                  </th>
                  <th className="text-center" scope="col">
                    Invoice Date
                  </th>
                  <th className="text-center" scope="col">
                    Due Date
                  </th>
                  <th className="text-center" scope="col">
                    Invoice #
                  </th>
                  <th className="text-center" scope="col">
                    Order #
                  </th>
                  <th className="text-center" scope="col">
                    Customer Name
                  </th>
                  <th className="text-center" scope="col">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className={isDataPresent?"d-visible":"d-none"} >
                {userData.map((item,index)=>{
                  return (<tr key={index}>
                  <th scope="row">{item["Status"]}</th>
                  <td>{item["invdate"].slice(0,10)}</td>
                  <td>{item["duedate"].slice(0,10)}</td>
                  <td>{item["invno"]}</td>
                  <td>{item["ordno"]}</td>
                  <td>{item["custname"]}</td>
                  <td>{item["total"]}</td>
                </tr>)
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
      </div>
    </div>
  );
};

export default Invoice_detail;
