import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import React, { useEffect, useState } from "react";
import 'leaflet/dist/leaflet.css';

function Map(props) {
    const [courseList, setCourseList] = useState([]);
    const [listLatCoords, setListLatCoords] = useState([]);
    const [listLonCoords, setListLonCoords] = useState([]);
    const [listCoords, setListCoords] = useState([]);


    useEffect(() => {
        

    }, []);


    console.log(listCoords);

    var markerList = listCoords.map(function (marker, i) {
        return (
            <Marker position={[marker.latitude, marker.longitude]}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
            </Marker>
        )
    })



    return (
        <div >
            <MapContainer style={{ height: "100vh"}} center={[45.764043, 4.835659]} zoom={13} scrollWheelZoom={false}>
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