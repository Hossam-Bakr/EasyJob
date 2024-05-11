import { icon } from 'leaflet'
import React from 'react'
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet"
import marker from "../../images/marker.png";

const EasyJobLocation = ({myPosition}) => {
    const position = myPosition
   
    const myIcon=new icon({
        iconUrl:marker,
        iconSize:[38,38]
    })

  return (
    <MapContainer center={position} zoom={5} scrollWheelZoom={true}>
    <TileLayer
      attribution='EasyJob Group'
      url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}.png"
    />
    <Marker position={position} icon={myIcon}>
      <Popup>
        Easy Job Company Location.
      </Popup>
    </Marker>
  </MapContainer>
  )
}

export default EasyJobLocation
