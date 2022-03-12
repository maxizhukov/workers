import React, {useState} from "react";
import "./styles.css";
import { Tabs } from "antd";
import OrderLogin from "./OrderLogin";
import OrderRegister from "./OrderRegister";
const { TabPane } = Tabs;

interface IProps {
	open: boolean;
	goNext: (values:any) => void;
}

export default function OrderAuthentication(props:IProps) {

  const [completed, setCompleted] = useState(false);

  return(
    <div className="order_info_box">
      {props.open
        ? <Tabs defaultActiveKey="1" >
          <TabPane tab="Register" key="1">
            <OrderRegister
              goNext={props.goNext}
            />
          </TabPane>
          <TabPane tab="Login" key="2">
            <OrderLogin
              goNext={props.goNext}
            />
          </TabPane>
        </Tabs>
        : completed
          ? <></>
          : <div className="row">
            <h3 style={{margin: 0}}>Authenticate</h3>
            <p className="order_time_badge">
              1 min
            </p>
          </div>
      }
    </div>
  );
}
