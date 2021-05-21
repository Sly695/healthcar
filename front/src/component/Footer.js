import React, { useState } from "react";

import {
  Layout,
  List,
  Image,
  Typography,
} from "antd";
import "antd/dist/antd.css"; 

const { Title } = Typography;


export default function FooterDash() {

  const { Footer } = Layout;
  return (
    <Footer 
    className="ant-row">
      <List className="ant-col ant-col-xs-24 ant-col-xl-8">
              <Title level={4}>Centre d’aide</Title>
              <List.Item>
                <Typography.Text href="#">Questions fréquentes</Typography.Text>
              </List.Item>
              <List.Item>
                <Typography.Text href="#">En savoir plus </Typography.Text>
              </List.Item>
              <List.Item>
                <Typography.Text href="#">Support</Typography.Text>
            </List.Item>
      </List>

      <List className="ant-col ant-col-xs-24 ant-col-xl-8">
              <Title level={4}>HealthCar</Title>
              <List.Item>
                <Typography.Text href="#">C.G.U</Typography.Text>
              </List.Item>
              <List.Item>
                <Typography.Text href="#">Privacy</Typography.Text>
              </List.Item>
              <List.Item>
                <Typography.Text href="#">Presse</Typography.Text>
              </List.Item>
              <List.Item>
                <Typography.Text href="#">Partenaires</Typography.Text>
            </List.Item>
      </List>

      <List className="ant-col ant-col-xs-24 ant-col-xl-8">
              <Title level={4}>Download the application</Title>
              <List.Item>
                <Image 
                className="logo" 
                src='../../public/images/logo.svg'
                />
                <Image 
                  className="logo" 
                  src='../../public/images/logo.svg'
                  />       
              </List.Item>
        
      </List>
      <Image className="ant-col ant-col-xs-24 ant-col-xl-8"
              className="logo" 
              src='../../public/images/logo.svg'
              />
    </Footer>
    
  )
}
