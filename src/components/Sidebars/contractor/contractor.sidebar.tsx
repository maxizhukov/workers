import React from "react";
import "./styles.css";
import {Layout, Menu} from "antd";
import {UploadOutlined, UserOutlined, VideoCameraOutlined} from "@ant-design/icons";
import logo from "../../../assets/images/logo.png";
import {useTranslation} from "react-i18next";

const { Sider } = Layout;

interface IProps {
	collapsed: boolean;
}

export default function ContractorSidebar(props:IProps) {
  const { t } = useTranslation();

  return(
    <Sider trigger={null} collapsible collapsed={props.collapsed}>
      <img src={logo} alt="worket_logo" className="contractor_sidebar_logo" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["dashboard"]}>
        <Menu.Item key="dashboard" icon={<UserOutlined />}>
          {t("contractor.home.sidebar.tabs.dashboard")}
        </Menu.Item>
      </Menu>
    </Sider>
  );
}
