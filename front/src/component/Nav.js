import React, { useState } from "react";

import {
  Avatar,
  List,
  Card,
  Layout,
  Row,
  Col,
  Image,
  Menu,
  Button,
  DatePicker,
} from "antd";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import {
  CarOutlined,
  CheckOutlined,
  DashboardOutlined,
  UserOutlined,
  PieChartOutlined,
  LogoutOutlined,
  FileOutlined,
  TeamOutlined,
  DesktopOutlined,
  FieldTimeOutlined,
  ReloadOutlined,
  CheckCircleTwoTone,
  BellOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

import logobleu from "../Logobleu.svg";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";

function Nav() {
  const { Meta } = Card;

  const { SubMenu } = Menu;

  const { Header, Footer, Sider, Content } = Layout;
  return (
    <Col xs={4} sm={4} md={4} lg={4} xl={4}>
      <Menu
        style={{
          width: "100%",
          height: "100vh",
          justifyContent: "space-between",
        }}
      >
        <img
          style={{ width: "100%", padding: "10px" }}
          src={logobleu}
          alt="React Logo"
        />
        <SubMenu
          style={{ borderBottom: "1px solid #F0F2F5", color: "orange" }}
          key="sub0"
          title="Username"
        ></SubMenu>
        <SubMenu
          style={{ height: "15%" }}
          key="sub1"
          icon={<DashboardOutlined />}
          title="Tableau de bord"
        ></SubMenu>
        <SubMenu
          style={{ height: "15%" }}
          key="sub2"
          icon={<CarOutlined />}
          title="Transports"
        ></SubMenu>
        <SubMenu
          style={{ height: "15%", borderBottom: "1px solid #F0F2F5" }}
          key="sub3"
          icon={<UserOutlined />}
          title="Gestion du profil"
        ></SubMenu>
        <SubMenu
          key="sub4"
          icon={<LogoutOutlined style={{ color: "orange" }} />}
          title="Deconnexion"
        ></SubMenu>
      </Menu>
    </Col>
  );
}

export default Nav;
