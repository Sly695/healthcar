import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import React, { useEffect, useState } from "react";
import 'leaflet/dist/leaflet.css';
import { icon, Icon, defaultMarker} from "leaflet";
import { DatePicker } from 'antd';

function Map(props) {

    const [courseList, setCourseList] = useState([]);

    useEffect(() => {
        async function listCourse(){
            var rawResponse = await fetch('/course-list');
            var response = await rawResponse.json();
            setCourseList(response.courseList);
            
        }

        listCourse();
        
    }, []);

    
    var markerList = courseList.map(function (marker, i) {
        return (
            <Marker position={[marker.latitude, marker.longitude]} marker={Icon}>
                <Popup>
                    {marker.departureLocation}
                    {marker.addressDeparture.address}
                    {marker.addressDeparture.postalCode}
                    {marker.addressDeparture.city}
                </Popup>
            </Marker>
        )
    })

    return (
        <div >
            <MapContainer style={{ height: "100vh", width: "100vw", padding : "1%"}} center={[45.764043, 4.835659]} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[45.764043, 4.835659]}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
                {markerList}
            </MapContainer>
        </div>
    )
}

export default Map;