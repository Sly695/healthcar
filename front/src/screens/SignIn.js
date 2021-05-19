import "../App.less";
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

  // Pour le signin
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
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

  async function signIn() {
    var request = await fetch("/users/sign-in", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `email=${signInEmail}&password=${signInPassword}`,
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
        <div className="contentForm">
          <div className="top">
            <img src="../images/Logo.svg" />
            <h1 style={{ color: "#6793FF" }}>Bienvenue sur HealthCar</h1>
            <h2 style={{ color: "#B170FF" }}>
              Réservez votre ambulance ou trouvez des patients à transporter.
            </h2>
          </div>
          <center>
            <Form
              {...layout}
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label="E-mail"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Veuillez entrer votre email!",
                  },
                ]}
              >
                <Input
                  onChange={(e) => setSignInEmail(e.target.value)}
                  style={styleInput}
                />
              </Form.Item>

              <Form.Item
                label="Mot de passe"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Veuillez entrer votre mot de passe!",
                  },
                ]}
              >
                <Input.Password
                  onChange={(e) => setSignInPassword(e.target.value)}
                  style={styleInput}
                />
              </Form.Item>

              <Form.Item
                {...tailLayout}
                name="remember"
                valuePropName="checked"
              >
                <span>
                  <u>Mot de passe oublié</u>
                </span>
                <Checkbox style={{ marginLeft: "30px" }}>Remember me</Checkbox>{" "}
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Button
                  type="primary"
                  onClick={() => setVisible(true)}
                  style={{
                    borderRadius: "10px",
                    background: "#FFAE80",
                    borderColor: "#FFAE80",
                    fontSize: "15px",
                    height: "40px",
                  }}
                >
                  Créer un compte
                </Button>
                <Button
                  onClick={() => signIn()}
                  type="primary"
                  htmlType="submit"
                  style={{
                    fontSize: "15px",
                    height: "40px",
                    borderRadius: "10px",
                    marginLeft: "20px",
                  }}
                >
                  Connexion
                </Button>
              </Form.Item>
            </Form>
          </center>
          <div className="buttonSignUp"></div>
          <div className="terms">Terms and conditions</div>
        </div>
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
              className="form"
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
                <Input
                  style={styleInput}
                  onChange={(e) => setSignUpNameS(e.target.value)}
                />
              </Form.Item>
              <Form.Item label="Prénom">
                <Input
                  style={styleInput}
                  onChange={(e) => setSignUpPrenomS(e.target.value)}
                />
              </Form.Item>
              <Form.Item label="Téléphone">
                <Input
                  style={styleInput}
                  onChange={(e) => setSignUpPhoneS(e.target.value)}
                />
              </Form.Item>
              <Form.Item label="E-mail">
                <Input
                  style={styleInput}
                  onChange={(e) => setSignUpemailS(e.target.value)}
                />
              </Form.Item>
              <Form.Item label="Mot de passe">
                <Input
                  style={styleInput}
                  onChange={(e) => setSignUpPasswordS(e.target.value)}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  onClick={() => signUpSoignant()}
                  style={{
                    fontSize: "17px",
                    height: "40px",
                    borderRadius: "10px",
                    marginLeft: "20px",
                  }}
                >
                  Valider
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
          <TabPane tab="Ambulances" key="2">
            <Form
              className="form"
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
                <Input
                  style={styleInput}
                  onChange={(e) => setSignUpNameA(e.target.value)}
                />
              </Form.Item>
              <Form.Item label="Siret">
                <Input
                  style={styleInput}
                  onChange={(e) => setSignUpSiretA(e.target.value)}
                />
              </Form.Item>
              <Form.Item label="Téléphone">
                <Input
                  style={styleInput}
                  onChange={(e) => setSignUpPhoneA(e.target.value)}
                />
              </Form.Item>
              <Form.Item label="E-mail">
                <Input
                  style={styleInput}
                  onChange={(e) => setSignUpemailA(e.target.value)}
                />
              </Form.Item>
              <Form.Item label="Mot de passe">
                <Input
                  style={styleInput}
                  onChange={(e) => setSignUpPasswordA(e.target.value)}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  style={{
                    fontSize: "17px",
                    height: "40px",
                    borderRadius: "10px",
                    marginLeft: "20px",
                  }}
                  type="primary"
                  onClick={() => signUpAmbulance()}
                >
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

const styleInput = {
  fontSize: "15px",
  color: "#B170FF",
  borderRadius: "2rem",
};
