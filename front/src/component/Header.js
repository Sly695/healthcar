import React, { useState, useEffect } from "react";
import { Card, PageHeader, List } from "antd";
import { useSelector } from "react-redux";
import {
  CheckCircleOutlined,
  HistoryOutlined,
  SyncOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

export default function Header() {
  const [waitingTransport, setWaitingTransport] = useState(0);
  const [processTransport, setProcessTransport] = useState(0);
  const [endTransport, setEndTransport] = useState(0);
  const [cancelTransport, setCancelTransport] = useState(0);
  const iduser = useSelector((state) => state.iduser);
  useEffect(() => {
    async function findList() {
      const data = await fetch(`/course-list`);
      const body = await data.json();

      // setList(body);
      const filtreDispo = body.courseList.filter(
        (id) =>
          (id.idPro === iduser || id.idUser === iduser) && id.status === "dispo"
      );
      setWaitingTransport(filtreDispo.length);
      const filtreEncours = body.courseList.filter(
        (id) =>
          (id.idPro === iduser || id.idUser === iduser) &&
          id.status === "encours"
      );
      setProcessTransport(filtreEncours.length);
      const filtreEnd = body.courseList.filter(
        (id) =>
          (id.idPro === iduser || id.idUser === iduser) &&
          id.status === "cloturé"
      );
      setEndTransport(filtreEnd.length);
      const filtreCancel = body.courseList.filter(
        (id) =>
          (id.idPro === iduser || id.idUser === iduser) &&
          id.status === "annulé"
      );
      setCancelTransport(filtreCancel.length);
    }
    findList();
  }, []);

  const data = [
    {
      title: "Transports en attente",
      status: waitingTransport,
    },
    {
      title: "Transports en cours",
      status: processTransport,
    },
    {
      title: "Transports terminés",
      status: endTransport,
    },
    {
      title: "Transports annulés",
      status: cancelTransport,
    },
  ];

  return (
    <PageHeader className="site-page-header-responsive">
      <List
        grid={{
          gutter: 10,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 4,
          xl: 4,
          xxl: 4,
        }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Card title={item.title}>
              <Card.Meta
                avatar={
                  item.title === "Transports annulés" ? (
                    <CloseCircleOutlined style={{ color: "#EE7D52" }} />
                  ) : item.title === "Transports en attente" ? (
                    <HistoryOutlined style={{ color: "#6793FF" }} />
                  ) : item.title === "Transports terminés" ? (
                    <CheckCircleOutlined style={{ color: "#5CC689" }} />
                  ) : (
                    <SyncOutlined style={{ color: "#FFAE80" }} />
                  )
                }
              />
              <h3>{item.status}</h3>
            </Card>
          </List.Item>
        )}
      />
    </PageHeader>
  );
}
