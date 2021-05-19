import "./App.css";
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

import logobleu from "../src/Logobleu.svg";
import googleplaylogo from "../src/Google Play Logo.svg";
import appstorelogo from "../src/App Store Logo.png";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";
import TestDashboard from "./component/Nav";

import Nav from "./component/Nav";
import Header from "./component/Header";
import Footer from "./component/Footer";

function Dashboard() {
  const { Meta } = Card;

  const { SubMenu } = Menu;

  const { Header, Footer, Sider, Content } = Layout;

  return (
    <Row>
      <Nav />
      <Col xs={4} sm={4} md={4} lg={4} xl={4}></Col>
      <Col xs={20} sm={20} md={20} lg={20} xl={20}>
        <Layout>
          <Header />
          <Content style={{ height: "60vh", margin: "1%" }}>Content</Content>
          <Footer />
        </Layout>
      </Col>
    </Row>
  );
}

export default Dashboard;
