import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Card, PageHeader, List, Button } from "antd";
import "antd/dist/antd.css";
import {
  FieldTimeOutlined,
  ReloadOutlined,
  CheckCircleOutlined,
  BellOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import Title from "antd/lib/skeleton/Title";

const { Meta } = Card;

export default function Header() {
  const [list, setList] = useState([]);
  const [waitingTransport, setWaitingTransport] = useState(0);
  const [processTransport, setProcessTransport] = useState(0);
  const [endTransport, setEndTransport] = useState(0);
  const [cancelTransport, setCancelTransport] = useState(0);

  const userData = useSelector((state) => state.userData);

  useEffect(() => {
    const findList = async () => {
      const data = await fetch(`/course-list`);
      const body = await data.json();

    };

    findList();
  }, []);

  let counter = list.map(function (course, i) {
    return course.status === "dispo" ? setWaitingTransport(+1) : 0;
  });

  // list == 'attente' ? setWaitingTransport(+1) : 0;
  // list == 'en cours' ? setProcessTransport(+1) : 0;
  // list == 'end' ? setEndTransport(+1) : 0;
  // list == 'cancel' ? setCancelTransport(+1) : 0;

  // if (list[0].status == 'dispo'){
  //   setWaitingTransport(waitingTransport+1)
  // } if (list.status == 'dispo'){
  //   setWaitingTransport(+1)

  // }
  // if (list.status == 'dispo'){
  //   setWaitingTransport(+1)

  //   }
  //   if (list.status == 'dispo'){
  //     setWaitingTransport(+1)

  //   }

  console.log(list);

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
        hidden={userData.role == "ambulance" ? false : true}
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
      <p hidden={userData.role == "soignant" ? false : true}>
        Bienvenue sur HealthCar, vous pouvez maintenant réserver votre transport
        ou consulter vos commandes. // c'est le header du soignant
      </p>
    </PageHeader>
  );
}
