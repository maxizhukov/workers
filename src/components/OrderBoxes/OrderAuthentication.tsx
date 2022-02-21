import React from "react";
import "./styles.css";
import { Tabs } from "antd";
import OrderLogin from "./OrderLogin";
import OrderRegister from "./OrderRegister";
const { TabPane } = Tabs;

interface IProps {
	open: boolean;
}

export default function OrderAuthentication(props:IProps) {

  return(
    <div className="order_info_box">
      <Tabs defaultActiveKey="1" >
        <TabPane tab="Register" key="1">
          <OrderRegister />
        </TabPane>
        <TabPane tab="Login" key="2">
          <OrderLogin />
        </TabPane>
      </Tabs>
    </div>
  );
}
