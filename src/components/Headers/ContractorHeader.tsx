import React from "react";
import "./styles.css";
import {MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import {Layout} from "antd";
const { Header } = Layout;

interface IProps {
	collapsed: boolean;
	toggle: () => void;
}

export default function ContractorHeader(props:IProps) {
  return(
    <Header className="site-layout-background" style={{ padding: 0 }}>
      {React.createElement(props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: "trigger",
        onClick: props.toggle,
      })}
    </Header>
  );
}
