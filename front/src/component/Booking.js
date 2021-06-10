import React, { useEffect, useState } from "react";
import "../App.less";
import {
  Layout,
  Form,
  Input,
  Button,
  Radio,
  Select,
  TimePicker,
  DatePicker,
  Affix,
  message,
  notification,
  Typography,
  Col,
  Row,
} from "antd";
import moment from "moment";
import { useSelector } from "react-redux";

import Nav from "../component/Nav";

import Header from "../component/Header";
import FooterDash from "../component/Footer";

import socketIOClient from "socket.io-client";

import { SmileOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { Title } = Typography;

export default function Booking(props) {
  const [type, setType] = useState(Boolean);
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [sexe, setSexe] = useState("");
  const [naissance, setNaissance] = useState("");
  const [secu, setSecu] = useState("");
  const [nameDeparture, setNameDeparture] = useState("");
  const [streetDeparture, setStreetDeparture] = useState("");
  const [zipDeparture, setZipDeparture] = useState("");
  const [cityDeparture, setCityDeparture] = useState("");
  const [nameArrival, setNameArrival] = useState("");
  const [streetArrival, setStreetArrival] = useState("");
  const [zipArrival, setZipArrival] = useState("");
  const [cityArrival, setCityArrival] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [messageR, setMessageR] = useState("");
  const [notificationMessage, setNotificationMessage] = useState();

  const data = useSelector((state) => state.iduser);

  const format = "HH:mm";

  var socket = socketIOClient("https://healthcar-31.herokuapp.com/");

  useEffect(() => {
    async function receivedNotification() {
      await socket.on("sendValidationBack", (message) => {
        setNotificationMessage(message);
      });
    }

    if (notificationMessage) {
      openNotification();
    }

    receivedNotification();
  }, [notificationMessage]);

  const openNotification = () => {
    const args = {
      message: "Notification",
      description: notificationMessage,
      duration: 0,
      icon: <SmileOutlined style={{ color: "green" }} />,
    };

    notification.open(args);
  };

  async function booking() {
    var request = await fetch("/booking", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `departureName=${nameDeparture}&addressDeparture=${streetDeparture}&postalCodeDeparture=${zipDeparture}&cityDeparture=${cityDeparture}&arrivalLocationName=${nameArrival}&addressArrival=${streetArrival}&postalCodeArrival=${zipArrival}&cityArrival=${cityArrival}&dateArrival=${date}&timeArrival=${time}&type=${type}&message=${messageR}&_id=${data}&lastnamePatient=${lastname}&firstnamePatient=${firstname}&sexePatient=${sexe}&birthdate=${naissance}&secu=${secu}`,
    });
    let response = await request.json();
    if (response.result === true) {
      successSignUp();
      socket.emit("sendAddCourse", "Une nouvelle course est dispo");
      return props.history.push("/list-soignants");
    } else {
      errorSignUp();
    }
  }

  const successSignUp = () => {
    message.success({
      content:
        "Bravo ! Votre transport est réservé, vous êtes redirigé vers la liste de vos demandes de transport",
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

  function handleChangeSexe(value) {
    setSexe(value);
  }

  function onChangeDateNaissance(date, dateString) {
    // console.log(date, dateString);
    setNaissance(date, dateString);
  }

  function onChangeDateTransport(date, dateString) {
    // console.log(date, dateString);
    setDate(date, dateString);
  }

  function onChangeTime(time, timeString) {
    setTime(time, timeString);
  }

  return (
    <Layout>
      <Affix>
        <Nav />
      </Affix>

      <Layout>
        <Header />
        <Content className="site-layout-background">
          <Title level={2}>Réserver votre prochain transport</Title>
          <Form
            labelCol={{
              span: 12,
            }}
            wrapperCol={{
              span: 22,
            }}
            layout="vertical"
            initialValues="default"
            size="default"
          >
            <Row gutter={[8, 8]}>
              <Col md={8} xs={24}>
                <Form.Item label="Type de transport" name="size">
                  <Radio.Group onChange={(e) => setType(e.target.value)}>
                    <Radio.Button value={true}>Ambulance</Radio.Button>
                    <Radio.Button value={false}>VSL</Radio.Button>
                  </Radio.Group>
                </Form.Item>
                <Form.Item label="Nom du patient">
                  <Input
                    style={styleBooking.Input}
                    placeholder="Nom"
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </Form.Item>
                <Form.Item label="Prénom du patient">
                  <Input
                    style={styleBooking.Input}
                    placeholder="Prénom"
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                </Form.Item>
                <Form.Item label="Sexe">
                  <Select placeholder="Sexe" onChange={handleChangeSexe}>
                    <Select.Option value="Homme">Homme</Select.Option>
                    <Select.Option value="Femme">Femme</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item label="Date de naissance">
                  <DatePicker
                    placeholder="Date de naissance"
                    onChange={onChangeDateNaissance}
                  />
                </Form.Item>

                <Form.Item label="Numéro de sécurité sociale">
                  <Input
                    style={styleBooking.Input}
                    placeholder="1 XX XX XXX XXX XX"
                    onChange={(e) => setSecu(e.target.value)}
                  />
                </Form.Item>
              </Col>

              <Col md={8} xs={24}>
                <Form.Item label="Lieu de prise en charge">
                  <Input
                    style={styleBooking.Input}
                    placeholder="Domicile / EHPAD"
                    onChange={(e) => setNameDeparture(e.target.value)}
                  />
                </Form.Item>

                <Form.Item style={styleBooking.Label} label="Adresse">
                  <Input
                    style={styleBooking.Input}
                    placeholder="Rue"
                    onChange={(e) => setStreetDeparture(e.target.value)}
                  />
                </Form.Item>

                <Form.Item>
                  <Input
                    style={styleBooking.Input}
                    placeholder="Code postal"
                    onChange={(e) => setZipDeparture(e.target.value)}
                  />
                </Form.Item>
                <Form.Item>
                  <Input
                    style={styleBooking.Input}
                    placeholder="Ville"
                    onChange={(e) => setCityDeparture(e.target.value)}
                  />
                </Form.Item>
                <Form.Item label="Lieu de la consultation">
                  <Input
                    style={styleBooking.Input}
                    placeholder="Etablissement"
                    onChange={(e) => setNameArrival(e.target.value)}
                  />
                </Form.Item>
                <Form.Item label="Adresse">
                  <Input
                    style={styleBooking.Input}
                    placeholder="Rue"
                    onChange={(e) => setStreetArrival(e.target.value)}
                  />
                </Form.Item>
                <Form.Item>
                  <Input
                    style={styleBooking.Input}
                    placeholder="Code postal"
                    onChange={(e) => setZipArrival(e.target.value)}
                  />
                </Form.Item>
                <Form.Item>
                  <Input
                    style={styleBooking.Input}
                    placeholder="Ville"
                    onChange={(e) => setCityArrival(e.target.value)}
                  />
                </Form.Item>
              </Col>
              <Col md={8} xs={24}>
                <Form.Item label="Date et heure du RDV">
                  <DatePicker
                    placeholder="Date"
                    onChange={onChangeDateTransport}
                  />{" "}
                  <TimePicker
                    style={{ marginTop: "20px" }}
                    defaultValue={moment("12:08", format)}
                    format={format}
                    placeholder="Heure"
                    onChange={onChangeTime}
                  />
                </Form.Item>

                <Form.Item label="Note">
                  <Input.TextArea
                    rows={4}
                    onChange={(e) => setMessageR(e.target.value)}
                  />
                </Form.Item>

                <Button
                  type="primary"
                  style={{ 
                    backgroundColor: "#FFAE80", 
                    borderColor: "#FFAE80",
                    fontSize: "17px",
                    height: "40px",
                    borderRadius: "10px",
                    width: "100%" }}
                  onClick={() => booking()}
                >
                  Valider la réservation
                </Button>
              </Col>
            </Row>
          </Form>
        </Content>
        <FooterDash />
      </Layout>
    </Layout>
  );
}

const styleBooking = {
  Input: {
    fontSize: "15px",
    color: "#B170FF",
    borderRadius: "15px",
  },
  Label: {
    fontSize: "15px",
    color: "#190134",
  },
};
