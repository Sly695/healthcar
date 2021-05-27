import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import "../App.less";
import imgLogo from "../img/Logo.svg";

import { Layout, Image, Menu, Divider, Typography, Rate, Space } from "antd";
import {
  UserOutlined,
  CheckCircleTwoTone,
  LogoutOutlined,
  EnvironmentOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

// import logobleu from "../../public/images/Logobleu.svg";
const { Sider } = Layout;
const { Title } = Typography;

export default function Nav(props) {
  const [rate, setRate] = useState();
  const userData = useSelector((state) => state.userData);

  useEffect(() => {
    moyenne();
  }, [rate]);

  function moyenne() {
    var n = userData.note.length;
    var somme = 0;
    for (let i = 0; i < n; i++) {
      somme = somme + Number(userData.note[i]);
      console.log(somme);
    }
    var resultatMoyenne = somme / n;
    console.log(resultatMoyenne);
    setRate(resultatMoyenne);
  }

  if (userData.role == "soignant") {
    var users = {
      lastname: userData.lastname,
      firstname: userData.firstname,
    };
  } else {
    var users = {
      lastname: userData.nomEntreprise,
      firstname: "",
    };
  }

  return (
    <Sider

      theme="light"
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
      align="middle" 
    >
      <Space direction="vertical" size={20}>
        <Image className="logo" preview={false}  src={imgLogo} width={150}/>

        <Title level={5} type="warning">
          {users.firstname} {users.lastname}
        </Title>
      </Space>
      

      <Divider />

      <Menu mode="inline" defaultSelectedKeys={["1"]}>
        <Menu.Item
          hidden={userData.role === "soignant" ? false : true}
          key="1"
          icon={<CheckCircleTwoTone />}
        >
          <Link to="/dashboard/booking">Réservation</Link>
        </Menu.Item>
        <Menu.Item
          hidden={userData.role === "soignant" ? false : true}
          key="2"
          icon={<UnorderedListOutlined />}
        >
          <Link to="/list-soignants">Commandes</Link>
        </Menu.Item>

        <Menu.Item
          hidden={userData.role === "ambulance" ? false : true}
          key="3"
          icon={<EnvironmentOutlined />}
        >
          <Link to="/dashboard/map">Map</Link>
        </Menu.Item>
        <Menu.Item
          hidden={userData.role === "ambulance" ? false : true}
          key="4"
          icon={<UnorderedListOutlined />}
        >
          <Link to="/dashboard/list">Transports</Link>
        </Menu.Item>

        <Menu.Item key="5" icon={<UserOutlined />}>
          <Link to="/dashboard/account-edit-client">Profil</Link>
        </Menu.Item>
      </Menu>

      <Divider />
        <Rate
          hidden={userData.role === "ambulance" ? false : true}
          allowHalf
          disabled
          value={rate}
        />

      <Divider />
      <Menu>
        <Menu.Item key="1" icon={<LogoutOutlined />}>
          <Link to="/">Deconnexion</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}


