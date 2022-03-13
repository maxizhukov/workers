import React, {useEffect} from "react";
import "./auth.styles.css";
import { Spin } from "antd";
import queryString from "query-string";
import {customerAuthenticationService} from "../../../../../services/customer.authentication.service";

export default function ActivateCustomerPage () {

  useEffect(() => {
    const getToken = async () => {
      const parsed = queryString.parse(location.search);
      if (Object.keys(parsed).length && parsed.token) {
        const activated = await new customerAuthenticationService().activate({
          token: parsed.token
        });
        if (activated && activated.status) {
          // TODO LOGIN USER
        }
      }
    };
    getToken();
  }, []);


  return(
    <div className="center" style={{
    	height: "100vh"
    }}>
      <Spin size={"large"} />
    </div>
  );
}
