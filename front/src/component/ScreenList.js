import React, { useState, useEffect } from "react";
import "../style/App.less";
import {
  CheckCircleOutlined,
  HistoryOutlined,
  CloseCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import moment from "moment";
import "moment/locale/fr";
import "../App.less";
import {
  Layout,
  Modal,
  Table,
  Space,
  Button,
  Affix,
  notification,
  Typography,
  Tabs,
} from "antd";
import { useSelector } from "react-redux";
import { SmileOutlined } from "@ant-design/icons";

import Nav from "../component/Nav";
import Header from "../component/Header";
import FooterDash from "../component/Footer";

import socketIOClient from "socket.io-client";

var socket = socketIOClient("https://healthcar31.herokuapp.com/");

const { Content } = Layout;
const { Title } = Typography;
const { TabPane } = Tabs;

export default function ScreenList(props) {
  const [list, setList] = useState([]);
  const [listEnAttente, setListEnAttente] = useState([]);
  const [listEnCours, setListEnCours] = useState([]);
  const [listEnd, setListEnd] = useState([]);
  const [listCancel, setListCancel] = useState([]);

  const [visible, setVisible] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState();
  const [dataModal, setDataModal] = useState({
    _id: "fake",
    ref: "4pMHc",
    departureLocation: "EHPAD des fleurs",
    addressDeparture: [
      {
        _id: "60a2dc6012e784be99f73b93",
        address: "34 chemin des fleurs",
        postalCode: "38000",
        city: "Grenoble",
      },
    ],
    arrivalLocation: "Lyon le Tonkin cardiologie",
    addressArrival: [
      {
        _id: "60a2dc6012e784be99f73b94",
        address: "46 Avenue Condorcet",
        postalCode: "69100",
        city: "Villeurbanne",
      },
    ],
    dateInitial: "2021-05-17T21:13:04.732Z",
    dateArrival: "2021-05-19T22:00:00.000Z",
    timeArrival: "11H30",
    type: true,
    message: "Oxygène pendant le transport",
    status: "annulé",
    idUser: "12345567899",
    patient: [
      {
        _id: "60a2dc6012e784be99f73b95",
        lastname: "Martin",
        firstname: "Lucette",
        sexe: "Femme",
        birthdate: "1940-02-07T00:00:00.000Z",
        secu: 9865426372926352,
      },
    ],
  });

  const { Column, ColumnGroup } = Table;

  const iduser = useSelector((state) => state.iduser);

  useEffect(() => {
    const findList = async () => {
      const data = await fetch(`/course-list`);
      const body = await data.json();
      const filtre = body.courseList.filter(
        (id) => id.idPro === iduser || id.status === "dispo"
      );
      setList(filtre);
      const filtreEnAttente = body.courseList.filter(
        (id) => id.status === "dispo"
      );
      setListEnAttente(filtreEnAttente);
      const filtreEnCours = body.courseList.filter(
        (id) => id.idPro === iduser && id.status === "encours"
      );
      setListEnCours(filtreEnCours);
      const filtreEnd = body.courseList.filter(
        (id) => id.idPro === iduser && id.status === "cloturé"
      );
      setListEnd(filtreEnd);
      const filtreCancel = body.courseList.filter(
        (id) => id.idPro === iduser && id.status === "annulé"
      );
      setListCancel(filtreCancel);

      if (dataModal._id === "fake") {
        setDataModal(body.courseList[0]);
      }
    };

    findList();
  }, [visible]);

  useEffect(() => {
    async function receivedNotification() {
      await socket.on("sendAddCourseBack", (message) => {
        setNotificationMessage(message);
        console.log(message);
      });
    }
    receivedNotification();

    //Pour que la notification ne se répête pas quand on navigue sur les différents screens
    if (notificationMessage) {
      openNotification();
    }
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

  const validation = async (id, status) => {
    const result = await fetch(
      `/transport-validation?_id=${id}&status=${status}&iduser=${iduser}`
    );
    const body = await result.json();
  };

  function callback(key) {
    console.log(key);
    if (key == "1") {
      setList(listEnAttente);
    }
    if (key == "2") {
      setList(listEnCours);
    }
    if (key == "3") {
      setList(listEnd);
    }
    if (key == "4") {
      setList(listCancel);
    }
  }

  return (
    <Layout>
      <Affix>
        <Nav />
      </Affix>

      <Layout>
        <Header />
        <Content className="site-layout-background">
          <Tabs onChange={callback} type="card">
            <TabPane tab="Transports en attente" key="1"></TabPane>
            <TabPane tab="Transports en cours" key="2"></TabPane>
            <TabPane tab="Transports terminés" key="3"></TabPane>
            <TabPane tab="Transports annulés" key="4"></TabPane>
          </Tabs>
          <Title level={2}>Liste des transports</Title>
          <Table dataSource={list}>
            <Column
              title="Status"
              key="status"
              render={(text, record) => (
                <Space size="middle">
                  {record.status === "annulé" ? (
                    <CloseCircleOutlined
                      style={{ color: "#EE7D52", borderBlockColor: "none" }}
                    />
                  ) : record.status === "dispo" ? (
                    <HistoryOutlined
                      style={{ color: "#6793FF", borderBlockColor: "none" }}
                    />
                  ) : record.status === "cloturé" ? (
                    <CheckCircleOutlined
                      style={{ color: "#5CC689", borderBlockColor: "none" }}
                    />
                  ) : (
                    <SyncOutlined
                      style={{ color: "#FFAE80", borderBlockColor: "none" }}
                    />
                  )}
                </Space>
              )}
            />
            <Column
              title="Nom"
              key="lastname"
              render={(text, record) => (
                <Space size="middle">{record.patient[0].lastname}</Space>
              )}
            />
            <Column
              title="Prénom"
              dataIndex=""
              key="firstname"
              render={(text, record) => (
                <Space size="middle">{record.patient[0].firstname}</Space>
              )}
            />
            <Column
              title="Type de transport"
              dataIndex=""
              key="firstname"
              render={(text, record) => (
                <Space size="middle">
                  {record.type === true ? "Ambulance" : "VSL"}
                </Space>
              )}
            />
            <Column
              title="Départ"
              dataIndex="departureLocation"
              key="departure"
            />

            <Column title="Arrivée" dataIndex="arrivalLocation" key="arrival" />

            <Column
              title="Date et heure"
              key="status"
              render={(text, record) => (
                <Space size="middle">
                  {moment(record.dateArrival).locale("fr").format("L")}
                  {moment(record.timeArrival).locale("fr").format("LT")}
                </Space>
              )}
            />

            <Column
              title="Action"
              key="action"
              render={(text, record) => (
                <Space size="middle">
                  {record.status === "annulé" ? (
                    <Button
                      type="primary"
                      onClick={() => {
                        setDataModal(record);
                        setVisible(true);
                      }}
                      style={{ backgroundColor: "#EE7D52" }}
                    >
                      Détails{" "}
                    </Button>
                  ) : record.status === "dispo" ? (
                    <Button
                      type="primary"
                      onClick={() => {
                        setDataModal(record);
                        setVisible(true);
                      }}
                      style={{ backgroundColor: "#6793FF" }}
                    >
                      Détails{" "}
                    </Button>
                  ) : record.status === "cloturé" ? (
                    <Button
                      type="primary"
                      onClick={() => {
                        setDataModal(record);
                        setVisible(true);
                      }}
                      style={{
                        backgroundColor: "#5CC689",
                        borderColor: "#5CC689",
                      }}
                    >
                      Détails{" "}
                    </Button>
                  ) : (
                    <Button
                      value="large"
                      type="primary"
                      onClick={() => {
                        setDataModal(record);
                        setVisible(true);
                      }}
                      style={{ backgroundColor: "#FFAE80" }}
                    >
                      Détails{" "}
                    </Button>
                  )}
                </Space>
              )}
            />
          </Table>
          <Modal
            title="Détails du transport"
            centered
            visible={visible}
            width={1000}
            footer={null}
            onCancel={() => setVisible(false)}
          >
            <p>Référence : {dataModal.ref}</p>
            <p>Nom : {dataModal.patient[0].lastname}</p>
            <p>Prénom : {dataModal.patient[0].firstname}</p>
            <p>
              Départ de {dataModal.departureLocation} à déstination de{" "}
              {dataModal.arrivalLocation}
            </p>
            <p>
              Date du RDV :{" "}
              {moment(dataModal.dateArrival).locale("fr").format("L")}
            </p>
            <p>
              Heure du RDV prévue :{" "}
              {moment(dataModal.timeArrival).locale("fr").format("LT")}
            </p>

            <p>
              Note de course : {dataModal.message ? dataModal.message : "Vide"}
            </p>
            <p>
              Status :{" "}
              {dataModal.status === "annulé"
                ? "Annulé"
                : dataModal.status === "dispo"
                ? "Disponible"
                : dataModal.status === "cloturé"
                ? "Transport effectué"
                : "Transport accepté (en cours)"}
            </p>

            <p>
              Type de transport :{" "}
              {dataModal.type === true ? "Ambulance" : "VSL"}
            </p>

            <p>
              Adresse de départ : {dataModal.addressDeparture[0].address},{" "}
              {dataModal.addressDeparture[0].postalCode},{" "}
              {dataModal.addressDeparture[0].city}
            </p>
            <p>
              Adresse de départ : {dataModal.addressArrival[0].address},{" "}
              {dataModal.addressArrival[0].postalCode},{" "}
              {dataModal.addressArrival[0].city}
            </p>
            <Button
              onClick={() => {
                validation(dataModal._id, "encours");
                setVisible(false);
                socket.emit(
                  "sendValidation",
                  "Votre course a été prise en charge !"
                );
              }}
              type="primary"
              hidden={
                dataModal.status === "encours"
                  ? true
                  : dataModal.status === "annulé"
                  ? false
                  : dataModal.status === "dispo"
                  ? false
                  : true
              }
            >
              Accepter
            </Button>
            <Button
              onClick={() => {
                validation(dataModal._id, "annulé");
                setVisible(false);
                socket.emit("sendValidation", "Votre course a été annulé !");
              }}
              type="primary"
              hidden={
                dataModal.status === "encours"
                  ? false
                  : dataModal.status === "annulé"
                  ? true
                  : dataModal.status === "dispo"
                  ? true
                  : true
              }
            >
              Annuler
            </Button>
            <Button
              onClick={() => {
                validation(dataModal._id, "cloturé");
                setVisible(false);
                socket.emit("sendValidation", "Votre course a été clôturé !");
              }}
              type="primary"
              hidden={dataModal.status === "encours" ? false : true}
            >
              Fin de mission
            </Button>
          </Modal>
        </Content>
        <FooterDash />
      </Layout>
    </Layout>
  );
}
