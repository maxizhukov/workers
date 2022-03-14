import React, {useEffect} from "react";
import { Spin } from "antd";
import queryString from "query-string";
// eslint-disable-next-line max-len
import {contractorAuthenticationService} from "../../../services/contractor/contractors.authentication.service";
import {useNavigate} from "react-router-dom";

export default function ActivateContractorPage () {
  const navigate = useNavigate();

  useEffect(() => {
    const getToken = async () => {
      const parsed = queryString.parse(location.search);
      if (Object.keys(parsed).length && parsed.token) {
        const activated = await new contractorAuthenticationService().activate({
          token: parsed.token
        });
        if (activated && activated.status) {
          if (activated.data && activated.data.token) {
            const loginResponse = await new contractorAuthenticationService()
              .tokenLogin(activated.data.token);
            if (loginResponse && loginResponse.status) {
              navigate("/contractor");
            }
          } else {
            navigate("/contractor/auth/login");
          }
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
