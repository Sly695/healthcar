import "../App";
import React, { useState, useEffect } from "react";

import Nav from '../component/Nav'
import Profil from '../component/ScreenProfil'
import Header from "../component/Header";
import FooterDash from '../component/Footer';
import Map from '../component/Map';


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
      <Nav />

      <Affix>
        <Nav/>
      </Affix>
      <Layout>
        <Header />
        <Content>
          <Profil />
          <Map />
        </Content>

        <FooterDash />

      </Layout>

    </Layout>
  );
}

export default Dashboard;
