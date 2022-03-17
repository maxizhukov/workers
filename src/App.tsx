import "./App.css";
import React, {useLayoutEffect, useState} from "react";
import { connect, useDispatch } from "react-redux";
import { Routes, Route, Router} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Modal from "react-modal";
import CustomerRouter from "./layouts/customer/router";
import "antd/dist/antd.css";
import ContractorRouter from "./layouts/contractor/contractor.router";
import customHistory from "./customHistory";

function App() {
  // Language changing for all pages
  const dispatch = useDispatch();

  // Setup for modal
  if (process.env.NODE_ENV !== "test") Modal.setAppElement("#root");

  const CustomRouter = ({ history, ...props }:any) => {
    const [state, setState] = useState({
      action: history.action,
      location: history.location
    });

    useLayoutEffect(() => history.listen(setState), [history]);

    return (
      <Router
        {...props}
        location={state.location}
        navigationType={state.action}
        navigator={history}
      />
    );
  };

  return (
    <div>
      <ToastContainer />
      <CustomRouter history={customHistory}>
        <Routes>
          <Route path="/*" element={<CustomerRouter />} />
          <Route path="/contractor/*" element={<ContractorRouter />} />
          {/*<Route path="/general" element={<GeneralRouter />} />*/}
          {/*<Route path="/admin" element={<AdminRouter />} />*/}
        </Routes>
      </CustomRouter>
    </div>
  );
}

export default connect(null, null)(App);
