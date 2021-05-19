import React, { useState } from "react";

import {
  Card,
  Layout,
  Menu,
  Row,
} from "antd";
import "antd/dist/antd.css"; 
import {
  FieldTimeOutlined,
  ReloadOutlined,
  CheckCircleTwoTone,
  BellOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";


function Header() {
  const { Meta } = Card;


  const { Header } = Layout;
  return (
      <Header
        style={{
          height: "15vh",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: "#F0F2F5",
        }}
      >
        <Row>
        <Card
          style={{
            width: "23%",
            height: "12vh",
            margin: "1%",
            borderRadius: "30px",
            border: "1px solid #52c41a",
          }}
        >
          <Meta
            avatar={
              <CheckCircleTwoTone style={{ fontSize: "200%", color: "#52c41a" }} />
            }
            title="Prise en charge confirmée"
            description="M.Robert"
          />
        </Card>
        <BellOutlined
          style={{
            color: "orange",
            height: "100vh",
            textAlign: "middle",
            display: "flex",
            justifyContent: "flex-end",
            marginRight: "10%",
            marginTop: "3%",
            fontSize: "300%",
          }}
        />
        </Row>

        <Row
          style={{
          height: "20vh",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          backgroundColor: "#F0F2F5",
        }} >
        <Card
          style={{
            width: "25%",
            height: "12vh",
            margin: "1%",
            borderRadius: "30px",
          }}
        >
          <Meta
            avatar={
              <FieldTimeOutlined style={{ color: "blue", fontSize: "300%" }} />
            }
            title="Transport en attente"
            description="213"
          />
        </Card>
        <Card
          style={{
            width: "25%",
            height: "12vh",
            margin: "1%",
            borderRadius: "30px",
          }}
        >
          <Meta
            avatar={
              <ReloadOutlined style={{ color: "orange", fontSize: "300%" }} />
            }
            title="Transport en cours"
            description="24"
          />
        </Card>
        <Card
          style={{
            width: "25%",
            height: "12vh",
            margin: "1%",
            borderRadius: "30px",
            textAlign: "middle",
          }}
        >
          <Meta
            avatar={
              <CheckCircleTwoTone
                twoToneColor="#52c41a"
                style={{ fontSize: "300%" }}
              />
            }
            title="Transports terminés"
            description="104"
          />
        </Card>
        <Card
          style={{
            width: "25%",
            height: "12vh",
            margin: "1%",
            borderRadius: "30px",
          }}
        >
          <Meta
            avatar={
              <CloseCircleOutlined style={{ color: "red", fontSize: "300%" }} />
            }
            title="Transports annulés"
            description="105"
          />
        </Card>
        </Row>
        
      </Header>
  );
}

export default Header;
