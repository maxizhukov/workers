import React from "react";
import "./Footer.css";
import logo from "../../assets/images/logo.png";

export default function Footer() {
  return(
    <footer>
      <div>
		  <img className="footer_logo" src={logo} alt="worket"/>
      </div>
      <div>
        <h4>Navigation</h4>
      </div>
      <div>
        <h4>About Worket</h4>
      </div>
      <div>
        <h4>For jobbers</h4>
      </div>
    </footer>
  );
}
