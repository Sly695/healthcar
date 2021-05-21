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



export default function Header() {

  const [list, setList] = useState([]);
  const [waitingTransport, setWaitingTransport] = useState(0);
  const [processTransport, setProcessTransport] = useState(0);
  const [endTransport, setEndTransport] = useState(0);
  const [cancelTransport, setCancelTransport] = useState(0);


  useEffect(() => {
    const findList = async () => {
      const data = await fetch(`/course-list`);
      const body = await data.json();
<<<<<<< HEAD
      console.log(body.courseList);
      setList(body.courseList);

=======
      setList(body);
>>>>>>> 72848e87101fd27724b04f1cf889e7b7ee953d91
    };

    findList();


  }, []);

  let  counter = list.map(function(course, i){
    return course.status === 'dispo' ? setWaitingTransport(+1) : 0;
  })

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
        title: 'Transports en attente',
        status: waitingTransport,
      },
      {
        title: 'Transport en cours',
        status: processTransport,
      },
      {
        title: 'Transports terminés',
        status: endTransport,
      },
      {
        title: 'Transports annulés',
        status: cancelTransport,
      },
    
    ];

  

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

                {item.status}</Card>
              
            </List.Item>
          )}
        />

  </PageHeader>
  );
}