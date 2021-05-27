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
  Typography
} from "antd";
import Nav from "../component/Nav";
import Profil from "../component/ScreenProfil";
import Header from "../component/Header";
import FooterDash from "../component/Footer";
import { useSelector } from "react-redux";
import socketIOClient from "socket.io-client";
import { SmileOutlined } from "@ant-design/icons";

var socket = socketIOClient("http://5.51.124.2:3000");

const { Content } = Layout;
const { Title } = Typography;

export default function ScreenListSoignants(props) {
  const [list, setList] = useState([]);
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

  return (
    <Layout>
      <Affix>
        <Nav />
      </Affix>

      <Layout>
        <Header />
        <Content className="site-layout-background" >
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
              dataIndex=""
              key="dateArrival"
              render={(text, record) => (
                <Space size="middle">
                  {moment(record.dateArrival).locale("fr").format("LLL")}
                </Space>
              )}
            />
            <Column
              title="Date et heure"
              key="status"
              render={(text, record) => (
                <Space size="middle">
                  {record.status === "annulé"
                    ? "Annulé"
                    : record.status === "dispo"
                    ? "Disponible"
                    : record.status === "cloturé"
                    ? "Transport effectué"
                    : "Transport accepté (en cours)"}
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
              <h4>Comment a été le transport ?</h4>
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
