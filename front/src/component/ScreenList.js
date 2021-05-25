import React, { useState, useEffect } from "react";
import "../style/App.less";

import "../App.less";
import { Layout, Modal, Table, Space, Button, Affix } from "antd";
import { useSelector } from "react-redux";

import Nav from "../component/Nav";
import Header from "../component/Header";
import FooterDash from "../component/Footer";

const { Content } = Layout;

export default function ScreenList(props) {
  const [list, setList] = useState([]);
  const [visible, setVisible] = useState(false);
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
        (id) => id.idPro == iduser || id.status == "dispo"
      );
      setList(filtre);
      if (dataModal._id == "fake") {
        setDataModal(body.courseList[0]);
      }
    };

    findList();
  }, [visible]);

  const validation = async (id, status) => {
    const result = await fetch(
      `/transport-validation?_id=${id}&status=${status}&iduser=${iduser}`
    );
    const body = await result.json();
    //setSourceList(body.result);
  };

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
                <Space size="middle">
                  <a
                    onClick={() => {
                      setDataModal(record);
                      setVisible(true);
                    }}
                  >
                    Détails de la course
                    {/* {record.patient[0].lastname}{" "}
                    {record.patient[0].firstname} */}
                  </a>
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
            <p>Heure du RDV prévue : {dataModal.timeArrival}</p>
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
              }}
              type="primary"
              hidden={
                dataModal.status == "encours"
                  ? true
                  : dataModal.status == "annulé"
                  ? false
                  : dataModal.status == "dispo"
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
              }}
              type="primary"
              hidden={
                dataModal.status == "encours"
                  ? false
                  : dataModal.status == "annulé"
                  ? true
                  : dataModal.status == "dispo"
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
              }}
              type="primary"
              hidden={dataModal.status == "encours" ? false : true}
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

const styleInput = {
  fontSize: "15px",
  color: "#B170FF",
  borderRadius: "2rem",
};
