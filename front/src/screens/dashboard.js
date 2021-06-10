import "../App";
import React from "react";
import { useSelector } from "react-redux";

import Booking from "../component/Booking";

import { Layout } from "antd";

const { Content } = Layout;



export default function Dashboard(props) {
  const userData = useSelector((state) => state.userData);

  return (
    <Layout>
      <Layout
      style={userData.role === "soignant" ? {backgroundColor: '9FB2E3'} : {backgroundColor: 'F6F8FB'} }>
        <Content>
          <Booking />
        </Content>
      </Layout>
    </Layout>
  );
}