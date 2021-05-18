import React from 'react';
import "../App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Row, Col, Form, Input, Button, Checkbox, Modal, Tabs } from "antd";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'

const { TabPane } = Tabs;

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 15,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 1,
    span: 16,
  },
};

function SignIn() {
  const [visible, setVisible] = useState(false);

  // Pour le signup soignant
  const [signUpNameS, setSignUpNameS] = useState("");
  const [signUpPrenomS, setSignUpPrenomS] = useState("");
  const [signUpPhoneS, setSignUpPhoneS] = useState("");
  const [signUpemailS, setSignUpemailS] = useState("");
  const [signUpPasswordS, setSignUpPasswordS] = useState("");
  // pour le signup ambulance
  const [signUpNameA, setSignUpNameA] = useState("");
  const [signUpSiretA, setSignUpSiretA] = useState("");
  const [signUpPhoneA, setSignUpPhoneA] = useState("");
  const [signUpemailA, setSignUpemailA] = useState("");
  const [signUpPasswordA, setSignUpPasswordA] = useState("");

  async function signUpSoignant() {
    var request = await fetch("users/sign-up-nurse", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `lastnameFromFront=${signUpNameS}&firstnameFromFront=${signUpPrenomS}&emailFromFront=${signUpemailS}&phoneFromFront=${signUpPhoneS}&passwordFromFront=${signUpPasswordS}`,
    });
    let response = await request.json();
    console.log(response);
  }

  async function signUpAmbulance() {
    var request = await fetch("users/sign-up-ambulance", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `nomEntrepriseFromFront=${signUpNameA}&siretFromFront=${signUpSiretA}&emailFromFront=${signUpemailA}&phoneFromFront=${signUpPhoneA}&passwordFromFront=${signUpPasswordA}`,
    });
    let response = await request.json();
    console.log(response);
  }

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Row className="screenSignIn">
      <Col md={16} xs={24} className="bgsignin"></Col>
      <Col md={8} xs={24} className="blocform">
        <div className="top">
          <img src="../images/Logo.svg" />
          <h1 style={{ color: "#6793FF" }}>Bienvenue sur HealthCar</h1>
          <h2 style={{ color: "#B170FF" }}>
            Réservez votre ambulance ou trouvez des patients à transporter.
          </h2>
        </div>
        <center>
          <Form
            className="form"
            {...layout}
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item {...tailLayout}>
              <span style={{ marginRight: "20px" }}>
                <u>Mot de passe oublié</u>
              </span>
              <Button shape="round" type="primary" htmlType="submit">
                Connexion
              </Button>
            </Form.Item>
          </Form>
        </center>
        <div className="buttonSignUp">
          <Button
            shape="round"
            type="primary"
            htmlType="submit"
            onClick={() => setVisible(true)}
          >
            Créer un compte
          </Button>
        </div>
        <div className="terms">Terms and conditions</div>
      </Col>
      <Modal
        title="Inscription à HealthCar"
        centered
        visible={visible}
        width={1000}
        footer={null}
        onCancel={() => setVisible(false)}
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab="Personnel soignant" key="1">
            <Form
              labelCol={{
                span: 4,
              }}
              wrapperCol={{
                span: 14,
              }}
              layout="horizontal"
              initialValues={{
                size: "large",
              }}
              size="large"
            >
              <Form.Item label="Nom">
                <Input onChange={(e) => setSignUpNameS(e.target.value)} />
              </Form.Item>
              <Form.Item label="Prénom">
                <Input onChange={(e) => setSignUpPrenomS(e.target.value)} />
              </Form.Item>
              <Form.Item label="Téléphone">
                <Input onChange={(e) => setSignUpPhoneS(e.target.value)} />
              </Form.Item>
              <Form.Item label="E-mail">
                <Input onChange={(e) => setSignUpemailS(e.target.value)} />
              </Form.Item>
              <Form.Item label="Mot de passe">
                <Input onChange={(e) => setSignUpPasswordS(e.target.value)} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" onClick={() => signUpSoignant()}>
                  Valider
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
          <TabPane tab="Ambulances" key="2">
            <Form
              labelCol={{
                span: 4,
              }}
              wrapperCol={{
                span: 14,
              }}
              layout="horizontal"
              initialValues={{
                size: "large",
              }}
              size="large"
            >
              <Form.Item label="Nom de la société">
                <Input onChange={(e) => setSignUpNameA(e.target.value)} />
              </Form.Item>
              <Form.Item label="Siret">
                <Input onChange={(e) => setSignUpSiretA(e.target.value)} />
              </Form.Item>
              <Form.Item label="Téléphone">
                <Input onChange={(e) => setSignUpPhoneA(e.target.value)} />
              </Form.Item>
              <Form.Item label="E-mail">
                <Input onChange={(e) => setSignUpemailA(e.target.value)} />
              </Form.Item>
              <Form.Item label="Mot de passe">
                <Input onChange={(e) => setSignUpPasswordA(e.target.value)} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" onClick={() => signUpAmbulance()}>
                  Valider
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>
      </Modal>
    </Row>
  );
}

export default SignIn;
