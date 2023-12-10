import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import GetCompany from "./GetCompany";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import TableToExcel from "react-html-table-to-excel";
import logo from "../../assets/img/logo.jpeg";
import { getCurrentDate } from "./CommonFunction";

const Customers_list = () => {
  let userName = process.env.REACT_APP_API_USERNAME;
  let passWord = process.env.REACT_APP_API_PASSORD;
  const companies = GetCompany();
  const [compId, setCompId] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [showDiv, setShowDiv] = useState(false);
  const [isDataPresent, setIsDataPresent] = useState(false);
  const [userData, setUserData] = useState([]);
  const [cityNames, setCityNames] = useState([]);
  const [companyData, setCompanyData] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [stateId, setStateId] = useState("");
  const pdfRef = useRef();
  const d = new Date();
  const currentTime = d.toLocaleTimeString();
  const hour = currentTime.slice(0, 2);
  const minute = currentTime.slice(3, 5);
  const today = getCurrentDate();
  useEffect(() => {
    getStates();
  }, []);
  useEffect(() => {
    getStateId();
  }, [selectedState]);

  useEffect(() => {
    getCustomerList(setCompanyData);
  }, [compId]);

  useEffect(() => {
    getCityNames(companyData);
  }, [companyData]);

  useEffect(() => {
    getCompanyId();
  }, [selectedCompany]);

  async function getCompanyId() {
    const id = companies.find(
      (company) => company.compname === selectedCompany
    );
    if (id) {
      setCompId(id.compid);
      // console.log(id.compid);
    }
  }

  function getStateId() {
    if(selectedState=="All"){
      setStateId("");
      return;
    }
    const id = states.find((state) => state.statename === selectedState);
    if (id) {
      setStateId(id.stateid);
      // console.log(id.stateid)
    }
  }
  const getStates = async () => {
    try {
      const response = await axios.get(
        "http://knowforth.online:8003/api/GetAllStates",
        {
          auth: {
            username: userName,
            password: passWord,
          },
        }
      );
      // console.log(response.data);
      setStates(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getCityNames = (arr) => {
    const cities = arr.map((item, index) => {
      return item["billcity"];
    });
    const uniqueCities = new Set(cities);
    const uniqueCityArr = Array.from(uniqueCities);
    setCityNames(uniqueCityArr);
  };

  function handleSelectChange(e) {
    setSelectedCompany(e.target.value);
  }

  const getCustomerList = async (dataSetter) => {
    try {
      const reponse = await axios.get(
        `
      http://knowforth.online:8003/api/GetCustomerList?compid=${compId}`,
        {
          auth: {
            username: userName,
            password: passWord,
          },
        }
      );
      dataSetter(reponse.data);
    } catch (err) {
      console.log(err);
    }
  };

  const runReport = async () => {
    try {
      const reponse = await axios.get(
        `
        http://knowforth.online:8003/api/GetCustomerList?compid=${compId}&billcity=${selectedCity}&billstateid=${stateId}`,
        {
          auth: {
            username: userName,
            password: passWord,
          },
        }
      );
      // console.log(reponse.data)
      setUserData(reponse.data);
      if (reponse.data.length > 0) {
        setIsDataPresent(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  function handleStateChange(e) {
    // if(e.target.value=="All"){
    //   setSel
    // }
    setSelectedState(e.target.value);
  }

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
        pdf.save(`CustList${today}|${hour}:${minute}.pdf`);
      });
      printLabel.classList.remove("showLabel");
      printDate.classList.remove("showLabel");
      printLogo.classList.remove("showLabel");
    }, 50);
  };

  const print = (e) => {
    const printLabel = document.getElementById("printLabel");
    const PrintDate= document.getElementById("printDate")
    printLabel.classList.add("showLabel");
    PrintDate.classList.add("showLabel");
    window.print();
    printLabel.classList.remove("showLabel");
    PrintDate.classList.remove("showLabel");
  };

  return (
    <div>
      <div className="card-body">
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
          <div className="col-lg-6 col-12 col-sm-6 col-md-6">
            <div className="input-group-my pt-2">
              <div className="group mb-2">
                <input
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  type="text"
                  className="input"
                  required
                >
                  {/* <option disabled hidden></option>
                  <option value="All">All</option>
                  {cityNames.map((item, index) => {
                    return <option key={index}>{item}</option>;
                  })} */}
                </input>
                <label className="label">City</label>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-12 col-sm-6 col-md-6">
            <div className="input-group-my pt-2">
              <div className="group mb-2">
                <select
                  value={selectedState}
                  onChange={handleStateChange}
                  type="text"
                  className="input"
                  required
                >
                  <option value="All">All</option>
                  <option disabled hidden></option>
                  {states.map((item, index) => {
                    return <option key={item.stateid}>{item.statename}</option>;
                  })}
                </select>
                <label className="label">State</label>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-12 col-sm-6 col-md-6 ">
            <div className="row">
              <div className="col-lg-12 col-12 col-sm-12 col-md-12 text-right">
                <div className="dropdown mx-2 d-flex justify-content-end">
                  <button
                    type="button"
                    onClick={runReport}
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
                      filename={`CustList${today}|${hour}:${minute}`}
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
                Customer List of {selectedCompany} on {today}
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
                    Customer List of {selectedCompany} on {today}
                  </th>
                </tr>
              </thead>
              <thead className="table-dark text-center header-fixed">
                <tr>
                  <th style={{textAlign:"left"}} className="" scope="col">
                    Customer Name{" "}
                  </th>
                  <th className="text-center" scope="col">
                    Company Name{" "}
                  </th>
                  <th className="text-center" scope="col">
                    Bill City
                  </th>
                  <th className="text-center" scope="col">
                    Bill State
                  </th>
                  <th className="text-center" scope="col">
                    Phone No.
                  </th>
                  <th className="text-center" scope="col">
                    Email ID
                  </th>
                  <th className="text-center" scope="col">
                    GST No.
                  </th>
                  <th className="text-center" scope="col">
                    PAN No.
                  </th>
                  <th className="text-center" scope="col">
                    Last Tran. Date
                  </th>
                </tr>
              </thead>
              <tbody className={isDataPresent ? "d-visible" : "d-none"}>
                {userData.map((item, index) => {
                  return (
                    <tr key={index}>
                      <th style={{textAlign:"left"}} scope="row">{item["custname"]}</th>
                      <td>{item["compname"]}</td>
                      <td>{item["billcity"]}</td>
                      <td>{item["statename"]}</td>
                      <td>{item["phone"]}</td>
                      <td>{item["email"]}</td>
                      <td>{item["gstno"]}</td>
                      <td>{item["panno"]}</td>
                      <td>{item["lasttrandate"]?.slice(0, 10)}</td>
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
      </div>
    </div>
  );
};

export default Customers_list;
