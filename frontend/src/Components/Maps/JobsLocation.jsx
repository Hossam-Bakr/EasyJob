import { icon } from "leaflet";
import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  Tooltip,
} from "react-leaflet";
import marker from "../../images/svg/Location.svg";
import myLocationIcon from "../../images/svg/MyLocation.svg";
import { Link } from "react-router-dom";

const calculateDistance = (coords1, coords2) => {
  const toRadians = (degrees) => (degrees * Math.PI) / 180;
  const R = 6371;
  const [lat1, lon1] = coords1;
  const [lat2, lon2] = coords2;

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance.toFixed(2);
};

const JobsLocation = ({ jobs, myPosition }) => {
  const [selectedJob, setSelectedJob] = useState(null);

  const position = myPosition;

  const jobIcon = new icon({
    iconUrl: marker,
    iconSize: [60, 60],
  });

  const currentPositionIcon = new icon({
    iconUrl: myLocationIcon,
    iconSize: [60, 60],
  });

  const handleMarkerClick = (job) => {
    setSelectedJob(job);
  };

  return (
    <MapContainer center={position} zoom={12} scrollWheelZoom={true}>
      <TileLayer
        attribution="EasyJob Group"
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}.png"
      />
      <>
        <Marker position={position} icon={currentPositionIcon}>
          <Popup>You are here</Popup>
        </Marker>
        {jobs &&
          jobs.map((job) => (
            <Marker
              position={[job.latitude, job.longitude]}
              icon={jobIcon}
              eventHandlers={{
                click: () => handleMarkerClick(job),
              }}
            >
              <Popup>
                <div className="text-center">
                <h4>{job.title}</h4>
                <span>
                  {" "}
                  for more details click{" "}
                  <Link target="_blank" to={`/job-details/${job.id}`}>
                    here
                  </Link>
                </span>
                </div>
              
              </Popup>
            </Marker>
          ))}

        {selectedJob && (
          <Polyline
            positions={[
              position,
              [selectedJob.latitude, selectedJob.longitude],
            ]}
            color="rgb(0, 110, 255)"
            dashArray="10,10"
          >
            <Tooltip permanent>
              {`Distance: ${calculateDistance(position, [
                selectedJob.latitude,
                selectedJob.longitude,
              ])} km`}
            </Tooltip>
          </Polyline>
        )}
      </>
    </MapContainer>
  );
};

export default JobsLocation;
