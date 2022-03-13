import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/customer/HomePage";
import CreateOrderPage from "../pages/customer/CreateOrderPage";
import CustomerHeader from "../../../components/Headers/CustomerHeader";

export default function CustomerHomeRouter() {
  return(
  	<>
      <CustomerHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/createOrder" element={<CreateOrderPage />} />
      </Routes>
    </>
  );
}
