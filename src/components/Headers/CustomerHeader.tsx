import React, {useEffect, useState} from "react";
import "./styles.css";
import logo from "../../assets/images/logo.png";
import HeaderCustomerWorkSearch from "../Search/HeaderCustomerWorkSearch";
import Button from "../Button/Button";

export default function CustomerHeader() {
  const [navbar, setNavbar] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 60) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    changeBackground();
    // adding the event when scroll change background
    window.addEventListener("scroll", changeBackground);
  });

  return(
    <header style={navbar ? {
      backgroundColor: "#ffffff",
      boxShadow: "0px 2px 6px -5px #000000"
    } : {
      backgroundColor: "transparent"
    }}>
      <img src={logo} alt="logo"/>
      <div className="header_search_box">
        <Button type="primary" text="Create New Contract" />
      </div>
      <div className="row">
        <Button type="secondary" text="Log in" />
        <p className="header_worker_btn">Be as worker</p>
      </div>
    </header>
  );
}
