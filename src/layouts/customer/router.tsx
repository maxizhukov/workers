import React from "react";
import { Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import CustomerHeader from "../../components/Headers/CustomerHeader";
import CreateOrderPage from "./pages/CreateOrderPage";

export default function CustomerRouter() {
  return(
    <>
      <CustomerHeader />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/createOrder" element={<CreateOrderPage />} />
        </Routes>
      </main>
    </>
  );
}
