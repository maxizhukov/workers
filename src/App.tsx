import "./App.css";
import React from "react";
import { connect, useDispatch } from "react-redux";
import { Routes, Route, BrowserRouter} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Modal from "react-modal";
import CustomerRouter from "./layouts/customer/router";
import "antd/dist/antd.css";

function App() {
  // Language changing for all pages
  const dispatch = useDispatch();

  // Setup for modal
  if (process.env.NODE_ENV !== "test") Modal.setAppElement("#root");

  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<CustomerRouter />} />
          {/*<Route path="/contractor" element={<ContractorRouter />} />*/}
          {/*<Route path="/general" element={<GeneralRouter />} />*/}
          {/*<Route path="/admin" element={<AdminRouter />} />*/}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default connect(null, null)(App);
