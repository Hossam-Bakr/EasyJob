import React, { useState } from "react";
import styles from "./GridButtons.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faListUl,
  faMapLocationDot,
  faTableCellsLarge,
} from "@fortawesome/free-solid-svg-icons";
import JobsOnMapModal from "../JobsOnMap/JobsOnMapModal";

const GridButtons = ({ gridView, setGrid, setList, isJobs }) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <div className={styles.veiw_controllers}>
        {isJobs && (
          <FontAwesomeIcon
            className={styles.location_icon}
            icon={faMapLocationDot}
            title="show jobs on map"
            onClick={() => setModalShow(true)}
          />
        )}
        <FontAwesomeIcon
          className={gridView ? styles.active_icon : ""}
          onClick={setGrid}
          icon={faTableCellsLarge}
          title="grid"
        />
        <FontAwesomeIcon
          className={!gridView ? styles.active_icon : ""}
          onClick={setList}
          icon={faListUl}
          title="list"
        />
      </div>
      <JobsOnMapModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
};

export default GridButtons;
