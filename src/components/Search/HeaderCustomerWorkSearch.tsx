import React from "react";
import "./styles.css";
import { SearchOutlined } from "@ant-design/icons";

export default function HeaderCustomerWorkSearch() {
  return (
    <div className="header_search_container">
      <div className="header_search">
		  <form className="header_search_form">
			  <input type="text"/>
			  <button type="submit">
				  <SearchOutlined
					  style={{
					  	color:"#ffffff"
					  }}
				  />
			  </button>
		  </form>
      </div>
    </div>
  );
}
