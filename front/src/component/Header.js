import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Card, PageHeader, List } from "antd";
import "antd/dist/antd.css";
import {
  FieldTimeOutlined,
  ReloadOutlined,
  CheckCircleOutlined,
  BellOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

export default function Header() {
  const [list, setList] = useState([]);
  const [waitingTransport, setWaitingTransport] = useState();
  const [processTransport, setProcessTransport] = useState(0);
  const [endTransport, setEndTransport] = useState(0);
  const [cancelTransport, setCancelTransport] = useState(0);

  const userData = useSelector((state) => state.userData);
  const iduser = useSelector((state) => state.iduser);

  useEffect(() => {
    async function findList() {
      const data = await fetch(`/course-list`);
      const body = await data.json();

      const filtreDispo = body.courseList.filter((id) => id.status == "dispo");
      setWaitingTransport(filtreDispo.length);
      const filtreEncours = body.courseList.filter(
        (id) => id.status == "encours"
      );
      setProcessTransport(filtreEncours.length);
      const filtreEnd = body.courseList.filter((id) => id.status == "cloturé");
      setEndTransport(filtreEnd.length);
      const filtreCancel = body.courseList.filter(
        (id) => id.status == "annulé"
      );
      setCancelTransport(filtreCancel.length);
    }
    findList();
  }, []);

  console.log(list[0]);

  //   let counterByTyppe = list.map(function (course, i) {
  //     return course.status === "encours" ? setWaitingTransport(+1) : 0;
  //     return course.status === "encours" ? setWaitingTransport(+1) : 0;
  //     return course.status === "encours" ? setWaitingTransport(+1) : 0;
  //     return course.status === "encours" ? setWaitingTransport(+1) : 0;
  // });

  // list == 'attente' ? setWaitingTransport(+1) : 0;
  // list == 'encours' ? setProcessTransport(+1) : 0;
  // list == 'end' ? setEndTransport(+1) : 0;
  // list == 'cancel' ? setCancelTransport(+1) : 0;

  // for (let i = 0; i < list.length; i++){
  //   if (list[0].status == 'dispo'){
  //     setWaitingTransport(waitingTransport+1)
  //   }
  //   if (list[0].status == 'encours'){
  //     setProcessTransport(processTransport+1)
  //   }
  //   if (list[0].status == 'cancel'){
  //     setCancelTransport(cancelTransport+1)
  //   }
  //   if (list[0].status == 'end'){
  //       setEndTransport(endTransport+1)
  //   } else {
  //     return 0
  //   }
  // }

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
