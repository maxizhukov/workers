import React from "react";
import { Routes, Route, Navigate} from "react-router-dom";
import CustomerLogin from "../pages/customer/authentication/login.page";
import ActivateCustomerPage from "../pages/customer/authentication/activate.page";

export default function CustomerAuthRouter() {
  return(
    <Routes>
      <Route path="/" element={<Navigate to={"/login"} />} />
      <Route path="/login" element={<CustomerLogin />} />
      <Route path="/activate" element={<ActivateCustomerPage />} />
    </Routes>
  );
}
