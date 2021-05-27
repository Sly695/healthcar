import React, { useState, useEffect } from "react";
import {
  CheckCircleOutlined,
  HistoryOutlined,
  CloseCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import "../App.less";
import moment from "moment";
import "moment/locale/fr";
import {
  Layout,
  Modal,
  Table,
  Space,
  Button,
  Rate,
  Affix,
  notification,
  Typography,
  Tabs,
} from "antd";
import Nav from "../component/Nav";
import Profil from "../component/ScreenProfil";
import Header from "../component/Header";
import FooterDash from "../component/Footer";
import { useSelector } from "react-redux";
import socketIOClient from "socket.io-client";
import { SmileOutlined } from "@ant-design/icons";

var socket = socketIOClient("https://healthcar31.herokuapp.com/");

const { Content } = Layout;
const { Title } = Typography;
const { TabPane } = Tabs;

export default function ScreenListSoignants(props) {
  const [list, setList] = useState([]);
  const [listEnAttente, setListEnAttente] = useState([]);
  const [listEnCours, setListEnCours] = useState([]);
  const [listEnd, setListEnd] = useState([]);
  const [listCancel, setListCancel] = useState([]);

  const [visible, setVisible] = useState(false);
  const [dataModal, setDataModal] = useState({ idpro: "Fake" });
  const [note, setNote] = useState(Number);
  const [notificationMessage, setNotificationMessage] = useState();

  const { Column, ColumnGroup } = Table;
  const iduser = useSelector((state) => state.iduser);
  const userData = useSelector((state) => state.userData);

  useEffect(() => {
    const findList = async () => {
      const data = await fetch(`/course-list`);
      const body = await data.json();
      const filtre = body.courseList.filter((id) => id.idUser == iduser);

      setList(filtre);
      const filtreEnAttente = body.courseList.filter(
        (id) => id.idUser == iduser && id.status === "dispo"
      );
      setListEnAttente(filtreEnAttente);
      const filtreEnCours = body.courseList.filter(
        (id) => id.idUser == iduser && id.status === "encours"
      );
      setListEnCours(filtreEnCours);
      const filtreEnd = body.courseList.filter(
        (id) => id.idUser == iduser && id.status === "cloturé"
      );
      setListEnd(filtreEnd);
      const filtreCancel = body.courseList.filter(
        (id) => id.idUser == iduser && id.status === "annulé"
      );
      setListCancel(filtreCancel);
    };

    findList();
  }, [visible]);

  useEffect(() => {
    async function receivedNotification() {
      await socket.on("sendValidationBack", (message) => {
        setNotificationMessage(message);
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

  const notation = async (idpro, idtransport) => {
    var rawResponse = await fetch(
      `/feedback?idpro=${idpro}&alreadynote=${idtransport}&note=${note}`
    );
    var response = await rawResponse.json();
    setVisible(false);
  };

  function noteChange(value) {
    setNote(value);
  }
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
          <Title level={2}>Vos réservations</Title>
          <Table dataSource={list}>
            <Column
              title="Status"
              key="status"
              render={(text, record) => (
                <Space size="middle">
                  {record.status === "annulé" ? (
                    <CloseCircleOutlined
                      style={{ color: "red", fontSize: "22px" }}
                    />
                  ) : record.status === "dispo" ? (
                    <HistoryOutlined
                      style={{ color: "blue", fontSize: "22px" }}
                    />
                  ) : record.status === "cloturé" ? (
                    <CheckCircleOutlined
                      style={{ color: "green", fontSize: "22px" }}
                    />
                  ) : (
                    <SyncOutlined
                      style={{ color: "orange", fontSize: "22px" }}
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
                <Space
                  size="middle"
                  hidden={
                    record.status == "cloturé" && record.alreadyNote == false
                      ? false
                      : true
                  }
                >
                  <a
                    onClick={() => {
                      setDataModal(record);
                      setVisible(true);
                    }}
                  >
                    Noter ce transport
                  </a>
                </Space>
              )}
            />
          </Table>

          <Modal
            title="Feedback"
            centered
            visible={visible}
            footer={null}
            onCancel={() => setVisible(false)}
          >
            <center>
              <p>Comment a été le transport ?</p>
              <Rate onChange={noteChange} />
              <br />

              <br />
              <Button
                type="primary"
                onClick={() => notation(dataModal.idPro, dataModal._id)}
              >
                Valider ma note
              </Button>
            </center>
          </Modal>
        </Content>
        <FooterDash />
      </Layout>
    </Layout>
  );
}

const styleInput = {
  fontSize: "15px",
  color: "#B170FF",
  borderRadius: "2rem",
};
