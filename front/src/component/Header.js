import React, { useState, useEffect } from "react";

import {
  Card,
  PageHeader,
  List, 
  Button

} from "antd";
import "antd/dist/antd.css"; 
import {
  FieldTimeOutlined,
  ReloadOutlined,
  CheckCircleOutlined,
  BellOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

const { Meta } = Card;

const data = [
  {
    title: 'Transports en attente',
  },
  {
    title: 'Transport en cours',
  },
  {
    title: 'Transports terminés',
  },
  {
    title: 'Transports annulés',
  },

];

export default function Header() {

  const [list, setList] = useState([]);


  useEffect(() => {
    const findList = async () => {
      const data = await fetch(`/course-list`);
      const body = await data.json();
      setList(body);
    };

    findList();
  }, []);

  return (
    <PageHeader
    className="site-page-header-responsive" >

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
          renderItem={item => (
            <List.Item>
              <Card title={item.title} >
                <Card.Meta avatar={<CheckCircleOutlined />}/>

                 Card content</Card>
              
            </List.Item>
          )}
        />

  </PageHeader>
  );
}