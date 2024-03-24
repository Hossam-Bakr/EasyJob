import { icon } from "leaflet";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import marker from "../../images/marker.png";

const CompanyLocation = ({ setPostionHandler, currentLocation }) => {
  const [draggable, setDraggable] = useState(false);
  const [position, setPosition] = useState({lat:0,lng:0});

  const center = {
    lat: currentLocation ? currentLocation[0] : 30.033333,
    lng: currentLocation ? currentLocation[1] : 31.233334,
  };

  useEffect(() => {
    if (currentLocation) {
      setPosition({
        lat: currentLocation[0],
        lng: currentLocation[1],
      });
    } else {
      setPosition({lat:30.033333, lng:31.233334 });
    }
  }, [currentLocation]);

  const myIcon = new icon({
    iconUrl: marker,
    iconSize: [38, 38],
  });

  function DraggableMarker() {
    const markerRef = useRef(null);
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current;
          if (marker != null) {
            setPosition(marker.getLatLng());
          }
        },
      }),
      []
    );
    const toggleDraggable = useCallback(() => {
      setDraggable((d) => !d);
    }, []);

    return (
      <Marker
        draggable={draggable}
        eventHandlers={eventHandlers}
        position={position}
        ref={markerRef}
        icon={myIcon}
      >
        <Popup minWidth={90}>
          <span onClick={toggleDraggable}>
            {draggable
              ? "Choose Your Location"
              : "Click here to set your location"}
          </span>
        </Popup>
      </Marker>
    );
  }

  useEffect(() => {
    setPostionHandler(position);
  }, [position, setPostionHandler]);

  return (
    <MapContainer center={center} zoom={3} scrollWheelZoom={true}>
      <TileLayer
        attribution="EasyJob Group"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <DraggableMarker />
    </MapContainer>
  );
};

export default CompanyLocation;
