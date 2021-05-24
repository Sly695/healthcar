import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import React, { useEffect, useState, } from "react";
import { useSelector } from "react-redux";
import 'leaflet/dist/leaflet.css';
import { Icon, icon } from "leaflet";
import { DatePicker, Layout, Affix, Card, Button, Typography, Space } from 'antd';
import { EnvironmentOutlined, LogoutOutlined } from '@ant-design/icons'
//import * as Gp from "chemin/vers/GpServices.js";
import Nav from './Nav'
import FooterDash from "./Footer";
import Header from "./Header";


const { Content } = Layout;

const { Text, Link } = Typography;

function Map(props) {

    const [courseList, setCourseList] = useState([]);
    const [userList, setUserList] = useState([]);

    const [coordsRouteDeparture, setCoordsRouteDeparture] = useState([]);
    const [totalTimeDeparture, setTotalTimeDeparture] = useState([]);
    const [totalDistanceDeparture, setTotalDistanceDeparture] = useState([]);

    const [addressArrival, setAddressArrival] = useState([])
    const [coordsRouteArrival, setCoordsRouteArrival] = useState([]);
    const [totalTimeArrival, setTotalTimeArrival] = useState([]);
    const [totalDistanceArrival, setTotalDistanceArrival] = useState([]);

    const userData = useSelector((state) => state.userData.nomEntreprise);

    useEffect(() => {
        async function listCourse() {
            var rawResponse = await fetch('/course-list');
            var response = await rawResponse.json();
            setCourseList(response.courseList);

        }

        async function listUser() {
            var rawResponse = await fetch(`/users/user-list?userData=${userData}`);
            var response = await rawResponse.json();
            setUserList([{ latitude: response.user.adresse[0].latitude, longitude: response.user.adresse[0].longitude }])
        }

        listCourse();
        listUser();

    }, []);


    //Route vers le back qui va requêter une API afin d'avoir des infos sur un trajet
    async function getRoute(latitude, longitude, marker) {

        //Récupère des infos sur le trajet entre la société et l'adresse departure
        var rawResponseDeparture = await fetch(`/getRoute?latitudeEndPoint=${latitude}&longitudeEndPoint=${longitude}&latitudeStartPoint=${userList[0].latitude}&longitudeStartPoint=${userList[0].longitude}`);
        var responseDeparture = await rawResponseDeparture.json();
        setCoordsRouteDeparture(responseDeparture.result);
        setTotalTimeDeparture(responseDeparture.totalTime);
        setTotalDistanceDeparture(responseDeparture.totalDistance)

        //Récupère des infos sur le trajet entre la société et l'adresse departure
        setAddressArrival([marker])
        var rawResponseArrival = await fetch(`/getRoute?latitudeEndPoint=${marker.addressArrival[0].latitude}&longitudeEndPoint=${marker.addressArrival[0].longitude}&latitudeStartPoint=${latitude}&longitudeStartPoint=${longitude}`)
        var responseArrival = await rawResponseArrival.json();
        setCoordsRouteArrival(responseArrival.result);
        setTotalTimeArrival(responseArrival.totalTime)
        setTotalDistanceArrival(responseArrival.totalDistance)

    }

    var markerUser = userList.map(function (marker, i) {
        return (
            <Marker position={[marker.latitude, marker.longitude]} icon={location}>
                <Popup>
                    Vous êtes là
                </Popup>
            </Marker>

        )
    })


    var markerArrival = courseList.map(function (marker, i) {

        var type = "";

        if (marker.type) {
            type = ("Ambulance")
        } else {
            type = ("Véhicule semi allongé")
        }

        return (
            <Marker position={[marker.addressDeparture[0].latitude, marker.addressDeparture[0].longitude]} icon={location}  >
                <Popup>
                    <Card size="Default size card" title={<Text style={{ color: "#FFAE80" }} type="success">Détail - {marker.patient[0].lastname} {marker.patient[0].firstname}</Text>} extra={<a onClick={() => getRoute(marker.addressDeparture[0].latitude, marker.addressDeparture[0].longitude, marker)} href="#">Itinéraire</a>} style={{ width: 300 }}>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <Text type="warning">Lieu de prise en charge : </Text>
                            {marker.departureLocation}<br />
                            {marker.addressDeparture[0].address} {marker.addressDeparture[0].postalCode} {marker.addressDeparture[0].city}
                        </div >
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <Text type="warning">Date de Naissance : </Text>
                            {marker.patient[0].birthdate}
                        </div>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <Text type="warning">Type de transport : </Text><Text>{type}</Text>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <Text type="warning">Temps de trajet : </Text><Text>{totalTimeDeparture / 60} minutes</Text>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <Text type="warning">Distance : </Text><Text>{totalDistanceDeparture}</Text>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <Text type="warning">Message : </Text><Text>{marker.message}</Text>
                        </div><br />
                        <Button style={{ color: "#6693fe" }} danger>Accepter cette course</Button>
                    </Card>
                </Popup>
            </Marker>

        )
    })

    var markerFinal = addressArrival.map(function (marker, i) {
        return (
            <Marker position={[marker.addressArrival[0].latitude, marker.addressArrival[0].longitude]} icon={location}>
                <Popup>
                    <Card size="Default size card" title={<Text style={{ color: "#FFAE80" }} type="success">Détail - Lieu d'arrivé</Text>} extra={<a href="#">Itinéraire</a>}>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <Text type="warning">Lieu de prise en charge : </Text>
                            {marker.arrivalLocation}<br />
                            {marker.addressArrival[0].address}
                        </div >
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <Text type="warning">Temps de trajet: </Text>
                            {totalTimeArrival / 60} minutes
                        </div >
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <Text type="warning">Distance: </Text>
                            {totalDistanceArrival}
                        </div>
                    </Card>
                </Popup>
            </Marker>

        )
    })

    return (
        <Layout >

            <Affix>
                <Nav />
            </Affix>
            <Layout >
                <Header />
                <Content>
                    <MapContainer style={{ height: "70vh", margin: "1%", border: "1px solid #FFAE80" }} center={[45.764043, 4.835659]} zoom={11} scrollWheelZoom={false}>
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {markerUser}
                        {markerArrival}
                        {markerFinal}
                        <Polyline pathOptions={LinesOptionsBlue} positions={coordsRouteDeparture} />
                        <Polyline pathOptions={LinesOptionsGreen} positions={coordsRouteArrival} />
                    </MapContainer>
                </Content>
                <FooterDash />
            </Layout>
        </Layout>
    )
}

const location = new Icon({
    iconUrl: ("../Images/Logo.svg"),
    iconSize: [50, 50],
});

const LinesOptionsBlue = {
    color: "#6693fe"
}

const LinesOptionsGreen = {
    color: "#b170ff",
}


export default Map;