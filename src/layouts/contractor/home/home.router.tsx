import React, {useEffect, useState} from "react";
import { Routes, Route} from "react-router-dom";
import {contractorContractorService} from "../../../services/contractor/contractor.service";
import ContractorOnboardingRouter from "../onboarding/contractor.onboarding.router";
import "./styles.css";
import { Layout } from "antd";
import ContractorSidebar from "../../../components/Sidebars/contractor/contractor.sidebar";
import ContractorHeader from "../../../components/Headers/ContractorHeader";
import {useDispatch} from "react-redux";
import {setUser} from "../../../redux/actions/userActions";

const { Content } = Layout;

export default function ContractorHomeRouter() {
  const dispatch = useDispatch();

  const [showRouterLoading, setShowRouterLoading] = useState(true);
  const [contractorApproved, setContractorApproved] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const validateAndGetInfo = async () => {
    await new contractorContractorService().getInfoByToken()
      .then((res:any) => {
        // Save to redux contractor
        dispatch(setUser(res.data));
        // Navigate onboarding / dashboard
        setContractorApproved(res.data.approved);
        setTimeout(() => {
          setShowRouterLoading(false);
        }, 50);
      })
      .catch((e:any) => {
        console.log("Error");
        console.log(e);
      })
      .finally();
  };

  // Validate user session
  useEffect(() => {
    validateAndGetInfo();
  }, []);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return(
    <Layout>
      <ContractorSidebar collapsed={collapsed} />
      <Layout className="site-layout">
        <ContractorHeader collapsed={collapsed} toggle={toggle} />
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          {showRouterLoading
            ? <h3>Loading</h3>
            : <Routes>
              {contractorApproved
                ? <>
                  {/*<Route path="/*" element={<CustomerHomeRouter />} />*/}
                </>
                : <>
                  <Route path="/*" element={<ContractorOnboardingRouter />} />
                </>
              }
            </Routes>
          }
        </Content>
      </Layout>
    </Layout>
  );
}
