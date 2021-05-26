import "../App.js";
import React, { useState } from "react";
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Checkbox,
  Modal,
  Tabs,
  Alert,
  message,
  Typography,
} from "antd";
import { useDispatch } from "react-redux";

const { TabPane } = Tabs;
const { Title } = Typography;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8, offset: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16, offset: 4 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 4,
    },
  },
};

function SignIn(props) {
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
  const [signUpAdresse, setSignUpAdresse] = useState("");
  const [signUpCodePostal, setSignUpCodePostal] = useState("");
  const [signUpCity, setSignUpCity] = useState("");
  const [signUpSiretA, setSignUpSiretA] = useState("");
  const [signUpPhoneA, setSignUpPhoneA] = useState("");
  const [signUpemailA, setSignUpemailA] = useState("");
  const [signUpPasswordA, setSignUpPasswordA] = useState("");

  const dispatch = useDispatch();

  async function signUpSoignant() {
    var request = await fetch("users/sign-up-nurse", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `lastnameFromFront=${signUpNameS}&firstnameFromFront=${signUpPrenomS}&emailFromFront=${signUpemailS}&phoneFromFront=${signUpPhoneS}&passwordFromFront=${signUpPasswordS}`,
    });
    let response = await request.json();
    console.log(response);
    if (response.result == true) {
      successSignUp();
      setVisible(false);
    } else {
      errorSignUp();
    }
  }

  async function signUpAmbulance() {
    var request = await fetch("users/sign-up-ambulance", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `nomEntrepriseFromFront=${signUpNameA}&siretFromFront=${signUpSiretA}&emailFromFront=${signUpemailA}&phoneFromFront=${signUpPhoneA}&passwordFromFront=${signUpPasswordA}&addressFromFront=${signUpAdresse}&postalCodeFromFront=${signUpCodePostal}&cityFromFront=${signUpCity}`,
    });
    let response = await request.json();

    console.log(response);
    if (response.result == true) {
      successSignUp();
      setVisible(false);
    } else {
      errorSignUp();
    }
  }

  async function signIn() {
    var request = await fetch("/users/sign-in", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `email=${signInEmail}&password=${signInPassword}`,
    });
    let response = await request.json();
    if (response.result == false) {
      errorSignUp();
    } else {
      console.log(response);
      dispatch({ type: "addToken", token: response.token });
      dispatch({ type: "addRole", role: response.role });
      dispatch({ type: "addIduser", iduser: response.iduser });
      dispatch({ type: "addUserData", userData: response.userData });

      if (response.role == "soignant") {
        return props.history.push("/dashboard/booking");
      } else if (response.role == "ambulance") {
        return props.history.push("/dashboard/list");
      }
    }
  }

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const successSignUp = () => {
    message.success({
      content: "Bravo ! Vous pouvez maintenant vous connecter.",
      className: "custom-class",
      style: {
        marginTop: "20vh",
      },
    });
  };
  const errorSignUp = () => {
    message.error({
      content: "Il y a eu un problème, vérifiez et réessayez...",
      className: "custom-class",
      style: {
        marginTop: "20vh",
      },
    });
  };

  return (
    <Row className="screenSignIn">
      <Col md={16} xs={24} className="bgsignin"></Col>
      <Col md={8} xs={24} className="blocform">
        <div
          className="contentForm"
          type="flex"
          justify="center"
          align="middle"
          style={{ minHeight: "100vh" }}
        >
          <div className="top">
            <img src="../images/Logo.svg" style={{ width: "15rem" }} />
            <Title level={1}>Bienvenue sur HealthCar</Title>
            <h2>
              Réservez votre ambulance ou trouvez des patients à transporter.
            </h2>
          </div>
          <Form
            layout="vertical"
            {...formItemLayout}
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
              {...tailFormItemLayout}
              name="remember"
              valuePropName="checked"
            >
              <span>
                <u>Mot de passe oublié</u>
              </span>
              <Checkbox style={{ marginLeft: "30px" }}>
                Se souvenir de moi
              </Checkbox>{" "}
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button
                onClick={() => signIn()}
                type="primary"
                block
                htmlType="submit"
                style={{
                  fontSize: "15px",
                  height: "40px",
                  borderRadius: "15px",
                }}
              >
                Connexion
              </Button>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button
                type="primary"
                block
                onClick={() => setVisible(true)}
                style={{
                  borderRadius: "15px",
                  background: "#FFAE80",
                  borderColor: "#FFAE80",
                  fontSize: "15px",
                  height: "40px",
                }}
              >
                Créer un compte
              </Button>
            </Form.Item>
          </Form>
          <div className="buttonSignUp"></div>
          <div className="terms">Mentions légales</div>
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
              <Form.Item label="Adresse">
                <Input
                  style={styleInput}
                  onChange={(e) => setSignUpAdresse(e.target.value)}
                />
              </Form.Item>
              <Form.Item label="Code Postal">
                <Input
                  style={styleInput}
                  onChange={(e) => setSignUpCodePostal(e.target.value)}
                />
              </Form.Item>
              <Form.Item label="Ville">
                <Input
                  style={styleInput}
                  onChange={(e) => setSignUpCity(e.target.value)}
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
  color: "#B170FF",
  borderRadius: "15px",
};
