import React, { useEffect, useState, useRef } from "react";
import GetCompany from "./GetCompany";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import TableToExcel from "react-html-table-to-excel";
import logo from "../../assets/img/logo.jpeg";
import { dateOptions, getCurrentDate, options, timeOptions } from "./CommonFunction";

const Customer_balc = () => {
  let userName = process.env.REACT_APP_API_USERNAME;
  let passWord = process.env.REACT_APP_API_PASSORD;
  const companies = GetCompany();
  const [selectedComp, setSelectedComp] = useState("");
  const [compId, setCompId] = useState("");
  const [showDiv, setShowDiv] = useState(false);
  const [isDataPresent, setIsDataPresent] = useState(false);
  const [userData, setUserData]= useState([]);
  const pdfRef = useRef();
  const d = new Date();
  const currentTime = d.toLocaleTimeString('en-IN',timeOptions);
  const hour = currentTime.slice(0, 2);
  const minute = currentTime.slice(3, 5);
  const today = getCurrentDate();
  const date= d.getDate();
  const month= (d.getMonth()+1);
  const year= d.getFullYear();
  const formattedDate= d.toLocaleDateString('en-IN',dateOptions);

  
  useEffect(() => {
    getCompanyId();
  }, [selectedComp]);

  function handleSelectChange(e) {
    setSelectedComp(e.target.value);
    // console.log(e.target.value)
  }
  async function getCompanyId() {
    const id = companies.find((company) => company.compname === selectedComp);
    if (id) {
      // console.log(id.compid)
      setCompId(id.compid);
    }
  }

  const getCustBalc = async () => {
    if(!selectedComp){
      alert("Enter company details ")
      return;
    }
    try {
      const response = await axios.get(
        `http://knowforth.online:8003/api/GetCustBalance/${compId}`,
        {
          auth: {
            username: userName,
            password: passWord,
          },
        }
      );
      if(response.data){
        setUserData(response.data);
        // console.log(response.data)
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
    setTimeout(()=>{
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
        pdf.save(`CustBalc_${year}${month}${date}${hour}${minute}.pdf`);
      });
      printLabel.classList.remove("showLabel");
      printDate.classList.remove("showLabel");
      printLogo.classList.remove("showLabel");
    },50)
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
          <div className="col-lg-6 col-12 col-sm-6 col-md-6 ">
            <div className="row">
              <div className="col-lg-12 col-12 col-sm-12 col-md-12 text-right">
                <div className="dropdown mx-2 d-flex justify-content-end ">
                  <button
                    onClick={getCustBalc}
                    type="button"
                    className="btn btn-kec m-1"
                  >
                    Run Report
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary m-1"
                    onClick={print}
                  >
                    Print
                  </button>
                  <button
                    type="button"
                    className="btn btn-success dropdown-tog m-1"
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
                      filename={`CustBalc_${year}${month}${date}${hour}${minute}`}
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
        <h4 className="text-center w-100 m-4">
          Customer Balance for {selectedComp?selectedComp:"xxxx"} as on {date}/{month}/{year}
        </h4>
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
                Customer Balance of {selectedComp} on {today}
              </h5>
            </div>
            <table id="mainTable" className="table table-striped table-bordered table-hover ">
            <thead
                className="table-dark text-center header-fixed"
                style={{ display: "none" }}
              >
                <tr>
                  <th className="text-center" scope="col">
                  Customer Balance of
                  </th>
                  <th>{selectedComp}</th>
                  <th>on {today}</th>
                </tr>
              </thead>
              <thead className="table-dark text-center header-fixed">
                <tr>
                  <th style={{textAlign:"left"}} className="" scope="col">
                    Customer Name{" "}
                  </th>
                  <th style={{textAlign:"right"}} className="" scope="col">
                    Invoice Balance (FCY){" "}
                  </th>
                  <th style={{textAlign:"right"}} className="" scope="col">
                    Available Credit (FCY)
                  </th>
                  <th style={{textAlign:"right"}} className="" scope="col">
                    Balance (FCY)
                  </th>
                  <th style={{textAlign:"right"}} className="" scope="col">
                    Balance (BCY)
                  </th>
                </tr>
              </thead>
              <tbody className={isDataPresent ? "d-visible" : "d-none"}>
              {userData.map((item,index)=>{
                return (<tr key={index}>
                  <th style={{textAlign:"left"}} scope="row">{item.custname}</th>
                  <td style={{textAlign:"right"}} >{parseFloat(item["invbalance (FCY)"]).toLocaleString('en-IN',options)}</td>
                  <td style={{textAlign:"right"}} >{parseFloat(item["AvailableCredit (FCY)"]).toLocaleString('en-IN',options)}</td>
                  <td style={{textAlign:"right"}} >{parseFloat(item["Balance (FCY)"]).toLocaleString('en-IN',options)}</td>
                  <td style={{textAlign:"right"}} >{parseFloat(item["Balance (BCY)"]).toLocaleString('en-IN',options)}</td>
                </tr>)
              })}
                
              </tbody>
            </table>
            <div id="printDate">
              <p>
                Date-{formattedDate} || {hour}:{minute}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customer_balc;
