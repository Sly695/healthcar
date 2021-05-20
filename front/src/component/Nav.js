import React, { useState } from "react";

import {
  Card,
  Layout,
  Image,
  Menu,
  Divider,
  Typography,
} from "antd";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import {
  UserOutlined,
  CheckCircleTwoTone,
} from "@ant-design/icons";

// import logobleu from "../../public/images/Logobleu.svg";


export default function Nav() {

  const { Meta } = Card;
  const { SubMenu } = Menu;
  const { Sider } = Layout;
  const {Title} = Typography;

  return (

    <Sider 
    theme="light"
    breakpoint="lg"
    collapsedWidth="0"
    onBreakpoint={broken => {
      console.log(broken);
    }}
    onCollapse={(collapsed, type) => {
      console.log(collapsed, type);
    }}
    style={{
      width: "100%",
      height: "100vh",
      justifyContent: "space-between",
    }}>

      <Image 
      className="logo" 
      src='../../public/images/logo.svg'
      preview='false'
      />

      <Title level={5}>Nom entreprise</Title>

      <Divider/>

        <Menu  mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              nav 1
            </Menu.Item>
            <Menu.Item key="2" icon={<CheckCircleTwoTone />}>
              nav 2
            </Menu.Item>
            <Menu.Item key="3" icon={<CheckCircleTwoTone />}>
              nav 3
            </Menu.Item>
          </Menu>      

          <Divider/>    

      </Sider>

  )
}
