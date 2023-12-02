import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import GetCompany from "./GetCompany";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import TableToExcel from "react-html-table-to-excel";
import logo from "../../assets/img/logo.jpeg";
import { async } from "q";
import { getCurrentDate } from "./CommonFunction";
import Swal from "sweetalert2"

const UserList = () => {
  let userName = process.env.REACT_APP_API_USERNAME;
  let passWord = process.env.REACT_APP_API_PASSORD;
  const companies = GetCompany();
  const [compId, setCompId] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [showDiv, setShowDiv] = useState(false);
  const [isDataPresent, setIsDataPresent] = useState(false);
  const pdfRef = useRef();
  const [userData, setUserData] = useState([]);
  const d = new Date();
  const currentTime = d.toLocaleTimeString();
  const hour = currentTime.slice(0, 2);
  const minute = currentTime.slice(3, 5);
  const today = getCurrentDate();
  const [changeStatus,setChangeStatus]= useState(false)
  // const date = d.getDate();

  useEffect(() => {
    getCompanyId();
  }, [selectedCompany]);
  useEffect(()=>{
    getUserListRep();
  },[changeStatus])

  async function getCompanyId() {
    const id = companies.find(
      (company) => company.compname === selectedCompany
    );
    if (id) {
      setCompId(id.compid);
      console.log(id.compid);
    }
  }

  function handleSelectChange(e) {
    setSelectedCompany(e.target.value);
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
        const imgY = 10;
        pdf.addImage(
          imgData,
          "PNG",
          imgX,
          imgY,
          imgWidth * ratio,
          imgHeight * ratio
        );
        pdf.save(`UserList${today}|${hour}:${minute}.pdf`);
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

  async function updateUserStat(userid) {
    try {
      const response = await axios.put(
        "http://knowforth.online:8003/api/UpdateUserStat",
        {
          userid: userid,
        },
        {
          auth: {
            username: userName,
            password: passWord,
          },
        }
      );
      // console.log(response)
      if (response.data) {
        setChangeStatus(!changeStatus);
        // alert(response.data.message);
        Swal.fire(response.data.message);
        
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getUserListRep = async () => {
    if (!companies) {
      alert("Please Enter Start and End dates");
      return;
    }
    axios
      .get(`http://knowforth.online:8003/api/GetUserListRep?compid=${compId}`, {
        auth: {
          username: userName,
          password: passWord,
        },
      })
      .then((res) => {
        if (res.data.length > 0) {
          setIsDataPresent(true);
          setUserData(res.data);
          // console.log(res.data)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="card-body">
        <div className="row ">
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
                <div className="dropdown mx-2 d-flex justify-content-end">
                  <button
                    type="button"
                    onClick={getUserListRep}
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
                      filename={`UserList${today}|${hour}:${minute}`}
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
          <div
            className="body-table height-400"
            id="tableParent"
            style={{ minHeight: "170px" }}
          >
            <div id="printLabel">
              <h5>
                User List of {selectedCompany} on {today} 
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
                    User List of {selectedCompany} on {today}
                  </th>
                </tr>
              </thead>
              <thead className="table-dark text-center header-fixed">
                <tr>
                  <th
                    className="text-center"
                    scope="col"
                    style={{ position: "relative" }}
                  >
                    User Name
                  </th>
                  <th className="text-center" scope="col">
                    User Type
                  </th>
                  <th className="text-center" scope="col">
                    Joined On
                  </th>
                  <th className="text-center" scope="col">
                    User Status
                  </th>
                  <th className="text-center" scope="col">
                    Change Status
                  </th>
                </tr>
              </thead>
              <tbody className={isDataPresent ? "d-visible" : "d-none"}>
                {userData.map((item, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{item.fullname}</th>
                      <td>{item.usertype}</td>
                      <td>{item.updon}</td>
                      <td>{item.status}</td>
                      <td>
                        <button className="btn btn-primary" onClick={() => {
                          updateUserStat(item.userid);
                          
                          }}>
                          Change
                        </button>
                      </td>
                      {/* <td>{item.workedon}</td> */}
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

export default UserList;
