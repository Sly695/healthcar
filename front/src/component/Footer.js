import React from "react";
import { Layout, List, Image, Typography } from "antd";
import "antd/dist/antd.css";

import imgGoogle from "../img/google-play-logo.svg";
import imgApple from "../img/app-store-logo.png";
import imgLogo from "../img/Logo.svg";

const { Title, Text } = Typography;

export default function FooterDash() {
  const { Footer } = Layout;
  return (
    <Footer className="ant-row">
      <List className="ant-col ant-col-xs-24 ant-col-xl-6">
        <Title level={4}>Centre d’aide</Title>
        <List.Item>
          <Text href="#">Questions fréquentes</Text>
        </List.Item>
        <List.Item>
          <Text href="#">En savoir plus </Text>
        </List.Item>
        <List.Item>
          <Text href="#">Support</Text>
        </List.Item>
      </List>

      <List className="ant-col ant-col-xs-24 ant-col-xl-6">
        <Title level={4}>HealthCar</Title>
        <List.Item>
          <Text href="#">C.G.U</Text>
        </List.Item>
        <List.Item>
          <Text href="#">Mentions légales</Text>
        </List.Item>
        <List.Item>
          <Text href="#">Presse</Text>
        </List.Item>
        <List.Item>
          <Text href="#">Partenaires</Text>
        </List.Item>
      </List>

      <Image
        preview={false}
        className="ant-col ant-col-xs-24 ant-col-xl-12"
        src={imgLogo}
      />
    </Footer>
  );
}
