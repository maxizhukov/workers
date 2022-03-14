import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ContractorLoginPage from "./contractor.login.page";
import "./styles.css";
import logo from "../../../assets/images/logo.png";
import ContractorRegisterPage from "./contractor.register.page";
import ContractorForgetPage from "./contractor.forget.page";
import ActivateContractorPage from "./contractor.activate.page";

export default function ContractorAuthRouter() {
  return(
    <main className="contractor_auth_page">
      <div className="contractor_auth_page_content">
        <Routes>
          <Route path="/" element={<Navigate to={"/contractor/auth/login"} />} />
          <Route path="/login" element={<ContractorLoginPage />} />
          <Route path="/register" element={<ContractorRegisterPage />} />
          <Route path="/forgot" element={<ContractorForgetPage />} />
          <Route path="/activate" element={<ActivateContractorPage />} />
        </Routes>
      </div>
      <div className="contractor_auth_page_banner">
        <div className="contractor_auth_page_banner_box">
          <img src={logo} alt="worket"/>
          <h2>Easiest way to find new customers</h2>
          <p>And make money with things that you love</p>
        </div>
      </div>
    </main>
  );
}
