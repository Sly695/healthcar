import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom';


import {
  Card,
  Layout,
  Image,
  Menu,
  Divider,
  Typography,
  Rate,
} from "antd";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import {
  UserOutlined,
  CheckCircleTwoTone,
  LogoutOutlined,
  EnvironmentOutlined,
  UnorderedListOutlined
} from "@ant-design/icons";

// import logobleu from "../../public/images/Logobleu.svg";
const { Meta } = Card;
const { Sider } = Layout;
const {Title, Text} = Typography;

const users = {
    lastname: 'Michou',
    firstname: 'Robert'
}

export default function Nav(props) {



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
      src='./img/logo.svg'
      preview='false'
      />

      <Title level={5}>{users.firstname} {users.lastname}</Title>

      <Divider/>

        <Menu  mode="inline" defaultSelectedKeys={['1']}>

              <Menu.Item
                key="1" 
                icon={<CheckCircleTwoTone />}>
                <Link to="/dashboard/booking">Réservation</Link>
              </Menu.Item>
              <Menu.Item
                key="2" 
                icon={<EnvironmentOutlined />}>
                <Link to="/dashboard/map">Map</Link>
              </Menu.Item>
            <Menu.Item key="3" icon={<UnorderedListOutlined />}>
              <Link to="/dashboard/list">List transport</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<UserOutlined />}>
              <Link to="/dashboard/account-edit-client">Profil</Link>
            </Menu.Item>
         
          </Menu>      

          <Divider/>    

          <Rate allowHalf defaultValue={2.5} />

          <Divider/>    
          <Menu>  
            <Menu.Item
                key="1" 
                icon={<LogoutOutlined />}>
                <Link to="/dashboard/booking">Deconnexion</Link>
              </Menu.Item>
          
              </Menu>    

      </Sider>

  )
}
