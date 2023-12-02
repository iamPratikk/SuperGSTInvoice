import React, { useEffect, useState } from 'react'
import axios from 'axios';


const GetCompany = () => {

  let userName = process.env.REACT_APP_API_USERNAME;
  let passWord = process.env.REACT_APP_API_PASSORD;
const [companies,setCompanies]=useState([]);

useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://knowforth.online:8003/api/GetCompanyList", {
          auth: {
            username: userName,
            password: passWord
          }
        });
        // console.log("fetching comapnies")
        setCompanies(response.data);
      } catch (error) {
        console.error("Error fetching company list:", error);
      }
    };

    fetchData();
  }, []);

  return companies;
};



export default GetCompany