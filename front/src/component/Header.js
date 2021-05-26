import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Card, PageHeader, List } from "antd";
import {
  FieldTimeOutlined,
  ReloadOutlined,
  CheckCircleOutlined,
  BellOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

export default function Header() {
<<<<<<< HEAD
  const [waitingTransport, setWaitingTransport] = useState();
=======
  const [list, setList] = useState([]);
  const [waitingTransport, setWaitingTransport] = useState(0);
>>>>>>> 5002894ad0c5511eb5df4bcd43a3d418e394324f
  const [processTransport, setProcessTransport] = useState(0);
  const [endTransport, setEndTransport] = useState(0);
  const [cancelTransport, setCancelTransport] = useState(0);
  const [courseList, setCourseList] = useState([]);

  const userData = useSelector((state) => state.userData);
  const iduser = useSelector((state) => state.iduser);

  useEffect(() => {
    async function findList() {
      const data = await fetch(`/course-list`);
      const body = await data.json();
<<<<<<< HEAD
=======
      // setList(body);
>>>>>>> 5002894ad0c5511eb5df4bcd43a3d418e394324f
      const filtreDispo = body.courseList.filter((id) => id.status == "dispo");
      setWaitingTransport(filtreDispo.length);
      const filtreEncours = body.courseList.filter((id) => id.status == "encours");
      setProcessTransport(filtreEncours.length);
      const filtreEnd = body.courseList.filter((id) => id.status == "cloturé");
      setEndTransport(filtreEnd.length);
      const filtreCancel = body.courseList.filter((id) => id.status == "annulé");
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
      title: "Transport en cours",
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
              <Card.Meta avatar={<CheckCircleOutlined />} />

              {item.status}
            </Card>
          </List.Item>
        )}
      />
    </PageHeader>
  );
}
