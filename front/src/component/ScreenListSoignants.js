import React, { useState, useEffect } from "react";
import "../App.less";
import { Layout, Modal, Table, Space, Button, Rate, Affix } from "antd";
import Nav from "../component/Nav";
import Profil from "../component/ScreenProfil";
import Header from "../component/Header";
import FooterDash from "../component/Footer";
import { useSelector } from "react-redux";
const { Content } = Layout;

export default function ScreenListSoignants(props) {
  const [list, setList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [dataModal, setDataModal] = useState({ idpro: "Fake" });
  const [note, setNote] = useState(Number);

  const { Column, ColumnGroup } = Table;
  const iduser = useSelector((state) => state.iduser);
  const userData = useSelector((state) => state.userData);

  useEffect(() => {
    const findList = async () => {
      const data = await fetch(`/course-list`);
      const body = await data.json();

      const filtre = body.courseList.filter((id) => id.idUser == iduser);
      console.log(filtre);
      setList(filtre);
    };

    findList();
  }, [visible]);

  const notation = async (idpro, idtransport) => {
    var rawResponse = await fetch(
      `/feedback?idpro=${idpro}&alreadynote=${idtransport}&note=${note}`
    );
    var response = await rawResponse.json();
    console.log(response);
    setVisible(false);
  };

  function noteChange(value) {
    setNote(value);
    console.log(note);
  }

  return (
    <Layout>
      <Affix>
        <Nav />
      </Affix>

      <Layout>
        <Header />
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <Table dataSource={list}>
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
              dataIndex="dateArrival"
              key="dateArrival"
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
