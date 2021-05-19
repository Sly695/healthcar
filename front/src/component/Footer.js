import React, { useState } from "react";

import {
  Card,
  Layout,
  Menu,
} from "antd";
import "antd/dist/antd.css"; 

export default function FooterDash() {

  const { Footer } = Layout;
  return (
    <Footer
      style={{
        height: "20vh",
        border: "1px solid white",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Card
        
        title="Centre d'aide"
        style={{border: "none", color: "#7B61FF" }}
      >
        <p>Questions fréquentes</p>
        <p>En savoir plus</p>
        <p>Support</p>
      </Card>
      <Card
        title="HealthCar"
        style={{}}
      >
        <p>C.G.U</p>
        <p>Privacy</p>
        <p>Presse</p>
        <p>Partenaires</p>
      </Card>
      <Card
        title="Download the application"
        style={{ width: "20%", border: "none" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <img
            style={{ width: "60%", padding: "10px" }}
            // src={appstorelogo}
            alt="React Logo"
          />
          <img
            style={{ width: "60%", padding: "10px" }}
            // src={googleplaylogo}
            alt="React Logo"
          />
        </div>
      </Card>
      <img
        style={{ width: "30%", padding: "10px" }}
        src='../../public/images/logo.svg'
        alt="React Logo"
      />
    </Footer>
  );
}
