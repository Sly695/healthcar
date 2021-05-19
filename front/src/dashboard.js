import "./App.css";
import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import { Avatar, List, Card, Layout, Row, Col, Image, Menu, Button, DatePicker } from "antd";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { CarOutlined, CheckOutlined, DashboardOutlined, UserOutlined, PieChartOutlined, LogoutOutlined, FileOutlined, TeamOutlined, DesktopOutlined, FieldTimeOutlined, ReloadOutlined, CheckCircleTwoTone, BellOutlined, CloseCircleOutlined } from '@ant-design/icons';

import logobleu from '../src/Logobleu.svg';
import googleplaylogo from '../src/Google Play Logo.svg';
import appstorelogo from '../src/App Store Logo.png';

function dashboard() {

    const { Meta } = Card;

    const { SubMenu } = Menu;

    const { Header, Footer, Sider, Content } = Layout;


    return (
        <Row>
            <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                <Menu style={{ width: "100%", height: "100vh", justifyContent: "space-between", }}>
                    <img style={{ width: "100%", padding: "10px" }} src={logobleu} alt="React Logo" />
                    <SubMenu style={{ borderBottom: "1px solid #F0F2F5", color: "orange" }} key="sub0" title="Username">
                    </SubMenu>
                    <SubMenu style={{ height: "15%" }} key="sub1" icon={<DashboardOutlined />} title="Tableau de bord">
                    </SubMenu>
                    <SubMenu style={{ height: "15%" }} key="sub2" icon={<CarOutlined />} title="Transports">
                    </SubMenu>
                    <SubMenu style={{ height: "15%", borderBottom: "1px solid #F0F2F5" }} key="sub3" icon={<UserOutlined />} title="Gestion du profil">
                    </SubMenu>
                    <SubMenu key="sub4" icon={<LogoutOutlined style={{ color: "orange" }} />} title="Deconnexion">
                    </SubMenu>
                </Menu>
            </Col>
            <Col xs={20} sm={20} md={20} lg={20} xl={20}>
                <Layout>
                    <Header style={{ height: "15vh", display: "flex", flexDirection: "row", justifyContent: "space-between", backgroundColor: "#F0F2F5", }} >
                        <Card style={{ width: "23%", height: "12vh", margin: "1%", borderRadius: "30px", border: "1px solid #52c41a" }}>
                            <Meta

                                avatar={<CheckOutlined style={{ fontSize: "200%", color: "#52c41a" }} />}
                                title="Prise en charge confirmée"
                                description="M.Robert"
                            />
                        </Card>
                        <BellOutlined style={{ color: "orange", height: "100vh", textAlign: "middle", display: "flex", justifyContent: "flex-end", marginRight: "10%", marginTop: "3%", fontSize: "300%" }} />
                    </Header>

                    <Header style={{ height: "20vh", display: "flex", flexDirection: "row", justifyContent: "center", backgroundColor: "#F0F2F5" }} >
                        <Card style={{ width: "25%", height: "12vh", margin: "1%", borderRadius: "30px" }}>
                            <Meta

                                avatar={<FieldTimeOutlined style={{ color: "blue", fontSize: "300%" }} />}
                                title="Transport en attente"
                                description="213"
                            />
                        </Card>
                        <Card style={{ width: "25%", height: "12vh", margin: "1%", borderRadius: "30px" }}>
                            <Meta

                                avatar={<ReloadOutlined style={{ color: "orange", fontSize: "300%" }} />}
                                title="Transport en cours"
                                description="24"
                            />
                        </Card>
                        <Card style={{ width: "25%", height: "12vh", margin: "1%", borderRadius: "30px", textAlign: "middle" }}>
                            <Meta

                                avatar={<CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: "300%" }} />}
                                title="Transports terminés"
                                description="104"
                            />
                        </Card>
                        <Card style={{ width: "25%", height: "12vh", margin: "1%", borderRadius: "30px" }}>
                            <Meta
                                avatar={<CloseCircleOutlined style={{ color: "red", fontSize: "300%" }} />}
                                title="Transports annulés"
                                description="105"

                            />
                        </Card>
                    </Header>
                    <Content style={{ height: "60vh", margin: "1%" }}>Content</Content>
                    <Footer style={{ height: "20vh", border: "1px solid white", backgroundColor: "white", display: "flex", flexDirection: "row" }}>
                        <Card title="Centre d'aide" style={{ width: "20%", border: "none", color: "#7B61FF" }}>
                            <p>Questions fréquentes</p>
                            <p>En savoir plus</p>
                            <p>Support</p>
                        </Card>
                        <Card title="HealthCar" style={{ width: "20%", border: "none", color: "#7B61FF" }}>
                            <p>C.G.U</p>
                            <p>Privacy</p>
                            <p>Presse</p>
                            <p>Partenaires</p>
                        </Card>
                        <Card title="Download the application" style={{ width: "20%", border: "none" }}>
                            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                <img style={{ width: "60%", padding: "10px" }} src={appstorelogo} alt="React Logo" />
                                <img style={{ width: "60%", padding: "10px" }} src={googleplaylogo} alt="React Logo" />
                            </div>
                        </Card>
                        <img style={{ width: "30%", padding: "10px" }} src={logobleu} alt="React Logo" />
                    </Footer>
                </Layout>
            </Col>
        </Row>
    )

    //     <Row>
    //         <Col xs={4} sm={4} md={4} lg={4} xl={4} style={{ height: "100vh", border: "1px solid black" }}>
    //             return (
    //   <div style={{ width: 256 }}>
    //                     <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
    //                         {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
    //                     </Button>
    //                     <Menu
    //                     defaultSelectedKeys={['1']}
    //                     defaultOpenKeys={['sub1']}
    //                     mode="inline"
    //                     theme="dark"
    //                     inlineCollapsed={this.state.collapsed}
    //                     >
    //                     <Menu.Item key="1" icon={<PieChartOutlined />}>
    //                         Option 1
    //                     </Menu.Item>
    //                     <Menu.Item key="2" icon={<DesktopOutlined />}>
    //                         Option 2
    //                     </Menu.Item>
    //                     <Menu.Item key="3" icon={<ContainerOutlined />}>
    //                         Option 3
    //                     </Menu.Item>
    //                     <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
    //                         <Menu.Item key="5">Option 5</Menu.Item>
    //                         <Menu.Item key="6">Option 6</Menu.Item>
    //                         <Menu.Item key="7">Option 7</Menu.Item>
    //                         <Menu.Item key="8">Option 8</Menu.Item>
    //                     </SubMenu>
    //                     <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
    //                         <Menu.Item key="9">Option 9</Menu.Item>
    //                         <Menu.Item key="10">Option 10</Menu.Item>
    //                         <SubMenu key="sub3" title="Submenu">
    //                             <Menu.Item key="11">Option 11</Menu.Item>
    //                             <Menu.Item key="12">Option 12</Menu.Item>
    //                         </SubMenu>
    //                     </SubMenu>
    //                 </Menu>
    //             </div>
    // );
    //         </Col>
    //         <Col xs={20} sm={20} md={20} lg={20} xl={20} style={{ height: "100vh", border: "1px solid black" }}>
    //             col
    //         </Col>
    //     </Row>
    // );
};


export default dashboard;


