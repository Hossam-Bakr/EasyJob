import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import styles from "./JobsOnMap.module.css";
import JobsLocation from "../Maps/JobsLocation";
import { useQuery } from "@tanstack/react-query";
import { getJobOnMap } from "../../util/Http";
import Loading from "../Ui/Loading";
import { getUserLocation } from "../logic/Logic";

const JobsOnMapModal = ({ show, onHide }) => {
  const [currentLocation, setCurrentLocation] = useState([0, 0]);

  let { data } = useQuery({
    queryKey: ["companies"],
    queryFn: getJobOnMap,
  });


  useEffect(() => {
    getUserLocation(setCurrentLocation);
  }, []);

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="fullscreen"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className={styles.modal_header} closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Discover Jobs Around You
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modal_body}>
        {data ? (
          <JobsLocation jobs={data.data?.jobs} myPosition={currentLocation} />
        ) : (
          <Loading />
        )}
      </Modal.Body>
    </Modal>
  );
};

export default JobsOnMapModal;
