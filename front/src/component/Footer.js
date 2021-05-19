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
import googleplaylogo from "../Google Play Logo.svg";
import appstorelogo from "../App Store Logo.png";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";

function Footer() {
  const { Meta } = Card;

  const { SubMenu } = Menu;

  const { Header, Footer, Sider, Content } = Layout;
  return (
    <Footer
      style={{
        height: "20vh",
        border: "1px solid white",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Card
        title="Centre d'aide"
        style={{ width: "20%", border: "none", color: "#7B61FF" }}
      >
        <p>Questions fréquentes</p>
        <p>En savoir plus</p>
        <p>Support</p>
      </Card>
      <Card
        title="HealthCar"
        style={{ width: "20%", border: "none", color: "#7B61FF" }}
      >
        <p>C.G.U</p>
        <p>Privacy</p>
        <p>Presse</p>
        <p>Partenaires</p>
      </Card>
      <Card
        title="Download the application"
        style={{ width: "20%", border: "none" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <img
            style={{ width: "60%", padding: "10px" }}
            src={appstorelogo}
            alt="React Logo"
          />
          <img
            style={{ width: "60%", padding: "10px" }}
            src={googleplaylogo}
            alt="React Logo"
          />
        </div>
      </Card>
      <img
        style={{ width: "30%", padding: "10px" }}
        src={logobleu}
        alt="React Logo"
      />
    </Footer>
  );
}

export default Footer;
