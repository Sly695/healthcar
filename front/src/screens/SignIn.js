import React from 'react';
import "../App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Row, Col, Form, Input, Button, Checkbox } from "antd";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'

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
          <Button shape="round" type="primary" htmlType="submit">
            Créer un compte
          </Button>
        </div>
        <div className="terms">Terms and conditions</div>
      </Col>
    </Row>
  );
}

export default SignIn;
