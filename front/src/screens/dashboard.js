import "../App";
import React, { useState } from "react";

import Nav from '../component/Nav'
import Header from "../component/Header";
import FooterDash from '../component/Footer';
import Profil from '../component/ScreenProfil'
import Booking from '../component/Booking'
import Map from '../component/Map'


import {
  Card,
  Layout,
  Menu,
  Affix,
} from "antd";

const { Meta } = Card;
const { SubMenu } = Menu;
const { Content } = Layout;

export default function Dashboard(props) {

  return (
    <Layout>
      <Layout>
<<<<<<< HEAD
        <Content>
          <Booking/>
        </Content>
=======
      <Content>
        <Booking/>
<<<<<<< HEAD
      </Content>     
=======
        <Map/>
      </Content>
>>>>>>> 72848e87101fd27724b04f1cf889e7b7ee953d91
>>>>>>> olivier
      </Layout>
    </Layout>
  );
}

