import "../App";
import React, { useState } from "react";

import Nav from '../component/Nav'
import Profil from '../component/ScreenProfil'
import Header from "../component/Header";
import FooterDash from '../component/Footer';


import {
  Card,
  Layout,
  Menu,
  Affix,
} from "antd";

const { Meta } = Card;
const { SubMenu } = Menu;
const { Content } = Layout;

function Dashboard(props) {


  return (
    <Layout>

      <Affix>
        <Nav/>
      </Affix>
      <Layout>
        <Header/>
      <Content>
        <Profil/>
      </Content>

      <FooterDash/>

      </Layout>

    </Layout>
  );
}

export default Dashboard;
