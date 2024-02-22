import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Cropper from "react-easy-crop";
import styles from "./CropLogo.module.css";
import Form from "react-bootstrap/Form";
import { faCrop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import getCroppedImg from "./CropImage";
import logo from "../../images/noLogo.jpg";
import LoadingTwo from "../Ui/LoadingTwo";

const CropEasyModal = ({ onHide, show, imgUrl, setImgUrl, setImgFile }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixeles, setCroppedAreaPixeles] = useState(null);
  const [loading,setLoading]=useState(false);

  const cropComplete = (croppedArea, croppedAreaPixeles) => {
    setCroppedAreaPixeles(croppedAreaPixeles);
  };

  const cropImage = async () => {
    setLoading(true)
    const { file, url } = await getCroppedImg(
      imgUrl,
      croppedAreaPixeles,
      rotation
    );
    setImgUrl(url);
    setImgFile(file);

    setLoading(false)
    onHide();
  };
  
  return (
    <Modal
      onHide={onHide}
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className={styles.modal_container}
    >
      <Modal.Header closeButton className={styles.modal_header}>
        <Modal.Title id="contained-modal-title-vcenter">
          <h2 className={styles.title}>Ediet Your Profile Logo</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modal_body}>
        {loading&&<LoadingTwo/>}
        <Cropper
          image={imgUrl ? imgUrl : logo}
          crop={crop}
          rotation={rotation}
          zoom={zoom}
          aspect={1333 / 1333}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onRotationChange={setRotation}
          onCropComplete={cropComplete}
        />
      </Modal.Body>
      <Modal.Footer className={styles.modal_footer}>
        <div className={styles.range_field}>
          <Form.Label htmlFor="zoom">Zoom: {zoom}</Form.Label>
          <Form.Range
            step={0.1}
            min={1}
            max={3}
            id="zoom"
            value={zoom}
            onChange={(e) => setZoom(e.target.value)}
          />
        </div>
        <div className={styles.range_field}>
          <Form.Label htmlFor="rotation">Rotation: {rotation}</Form.Label>
          <Form.Range
            min={0}
            max={360}
            id="rotation"
            value={rotation}
            onChange={(e) => setRotation(e.target.value)}
          />
        </div>
        <div className="d-flex justify-content-end w-100">
          <Button
            className="mx-2 me-auto"
            variant="outline-secondary"
            size="sm"
            onClick={onHide}
          >
            Cancel
          </Button>
          <Button className="mx-2" variant="outline-primary" size="sm">
            Change Photo
          </Button>
          <Button
            className="mx-2"
            variant="primary"
            size="sm"
            onClick={cropImage}
          >
            <FontAwesomeIcon icon={faCrop} /> Crop
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default CropEasyModal;

