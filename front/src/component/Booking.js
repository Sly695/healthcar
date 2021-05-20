import React, { useState, useEffect } from "react";
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
  InputNumber,
  TreeSelect,
  Switch,
  Space,
} from "antd";
import moment from "moment";

const { Content } = Layout;

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
  const [message, setMessage] = useState("");

  const format = "HH:mm";

  async function booking() {
    var request = await fetch("/booking", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `departureName=${nameDeparture}&addressDeparture=${streetDeparture}&postalCodeDeparture=${zipDeparture}&cityDeparture=${cityDeparture}&arrivalLocationName=${nameArrival}&addressArrival=${streetArrival}&postalCodeArrival=${zipArrival}&cityArrival=${cityArrival}&dateArrival=${date}&timeArrival=${time}&type=${type}&message=${message}&_id=${"ID-FAKE"}&lastnamePatient=${lastname}&firstnamePatient=${firstname}&sexePatient=${sexe}&birthdate=${naissance}&secu=${secu}`,
    });
    let response = await request.json();
    console.log(response);
  }

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
    console.log(time, timeString);
    setTime(time, timeString);
  }

  return (
    <Content
      className="site-layout-background"
      style={{
        margin: "24px 16px",
        padding: 24,
        minHeight: 280,
      }}
    >
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues="default"
        size="default"
      >
        <Form.Item label="Type de transport" name="size">
          <Radio.Group onChange={(e) => setType(e.target.value)}>
            <Radio.Button value={true}>Ambulance</Radio.Button>
            <Radio.Button value={false}>VSL</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Le patient">
          <Input
            style={{ width: 100 }}
            placeholder="Nom"
            onChange={(e) => setLastname(e.target.value)}
          />{" "}
          <Input
            style={{ width: 100 }}
            placeholder="Prénom"
            onChange={(e) => setFirstname(e.target.value)}
          />{" "}
          <Select
            style={{ width: 100 }}
            placeholder="Sexe"
            onChange={handleChangeSexe}
          >
            <Select.Option value="Homme">Homme</Select.Option>
            <Select.Option value="Femme">Femme</Select.Option>
          </Select>{" "}
          <DatePicker
            placeholder="Date de naissance"
            onChange={onChangeDateNaissance}
          />{" "}
          <Input
            style={{ width: 200 }}
            placeholder="Numéro de sécurité sociale"
            onChange={(e) => setSecu(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Lieu de prise en charge">
          <Input
            style={{ width: 150 }}
            placeholder="Domicile / EHPAD"
            onChange={(e) => setNameDeparture(e.target.value)}
          />{" "}
          <Input
            style={{ width: 200 }}
            placeholder="Rue"
            onChange={(e) => setStreetDeparture(e.target.value)}
          />{" "}
          <Input
            style={{ width: 100 }}
            placeholder="Code postal"
            onChange={(e) => setZipDeparture(e.target.value)}
          />{" "}
          <Input
            style={{ width: 100 }}
            placeholder="Ville"
            onChange={(e) => setCityDeparture(e.target.value)}
          />{" "}
        </Form.Item>
        <Form.Item label="Lieu de la consultation">
          <Input
            style={{ width: 150 }}
            placeholder="Etablissement"
            onChange={(e) => setNameArrival(e.target.value)}
          />{" "}
          <Input
            style={{ width: 200 }}
            placeholder="Rue"
            onChange={(e) => setStreetArrival(e.target.value)}
          />{" "}
          <Input
            style={{ width: 100 }}
            placeholder="Code postal"
            onChange={(e) => setZipArrival(e.target.value)}
          />{" "}
          <Input
            style={{ width: 100 }}
            placeholder="Ville"
            onChange={(e) => setCityArrival(e.target.value)}
          />{" "}
        </Form.Item>
        <Form.Item label="Note à faire passer aux ambulanciers">
          <Input.TextArea
            style={{ width: 300 }}
            onChange={(e) => setMessage(e.target.value)}
          />{" "}
        </Form.Item>
        <Form.Item label="Date et heure du RDV">
          <DatePicker placeholder="Date" onChange={onChangeDateTransport} />{" "}
          <TimePicker
            defaultValue={moment("12:08", format)}
            format={format}
            placeholder="Heure"
            onChange={onChangeTime}
          />{" "}
          <Button onClick={() => booking()}>Valider la réservation</Button>
        </Form.Item>
      </Form>
    </Content>
  );
}

const styleInput = {
  fontSize: "15px",
  color: "#B170FF",
  borderRadius: "2rem",
};
