import "../App";
import React from "react";

import Booking from "../component/Booking";

import { Layout } from "antd";

const { Content } = Layout;

export default function Dashboard(props) {
  return (
    <Layout>
      <Layout>
        <Content>
          <Booking />
        </Content>
      </Layout>
    </Layout>
  );
}