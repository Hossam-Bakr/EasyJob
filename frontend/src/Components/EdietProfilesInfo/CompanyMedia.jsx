import React, {useRef, useState } from "react";
import styles from "./CompanyMedia.module.css";
import SectionMainTitle from "../Ui/SectionMainTitle";
import noLogo from "../../images/noLogo.jpg";
import noCover from "../../images/noCover.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import CropLogo from "../CropImages/CropLogo";
import CropCover from "../CropImages/CropCover";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const CompanyMedia = ({ logo, cover }) => {
  const [modalShow, setModalShow] = useState(false);
  const [imgFile, setImgFile] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);

  const [coverModal, setCoverModal] = useState(false);
  const [coverFile, setCoverFile] = useState(null);
  const [coverUrl, setCoverUrl] = useState(null);

  const inputRef = useRef(null);
  const coverRef = useRef(null);
  const companyToken = useSelector((state) => state.userInfo.token);
  const navigate=useNavigate();

  const profileLogo = logo ? logo : noLogo;
  const profileCover = cover ? cover : noCover;

  const coverClasses = (cover||coverUrl)
    ? styles.company_old_cover
    : styles.company_no_cover;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImgFile(file);
      const url = URL.createObjectURL(file);
      setImgUrl(url);
    }
    console.log("Inside handleImageChange - imgFile:", imgFile);
    setModalShow(true);
  };

  
  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverFile(file);
      const url = URL.createObjectURL(file);
      setCoverUrl(url);
    }
    console.log("Inside handleCoverChange - coverFile:", coverFile);
    setCoverModal(true);
  };



  const handleClickLogoInput = () => {
    inputRef.current.click();
  };

  const handleClickCoverInput = () => {
    coverRef.current.click();
  };


  const handleSave = async (e) => {
    e.preventDefault();
    if (imgFile && coverFile) {
      console.log("Inside handleSave - imgFile:", imgFile);
      console.log("Inside handleSave - coverFile:", coverFile);

      const formData = new FormData();
      formData.append('logo', imgFile);
      formData.append('coverPhoto', coverFile);
      console.log("Inside handleSave - formData:", formData);

      try {
        const response = await axios.patch(
          'http://127.0.0.1:3000/api/v1/companies/profile/media',
          formData,
          {
            headers: {
              Authorization: `Bearer ${companyToken}`,
              'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
            },
          }
        );
        console.log(response);
        navigate("/company-profile")
      } catch (error) {
        if (error.response) {
          throw error.response;
        } else if (error.request) {
          throw error.request;
        }
        throw error.message;
      }
    }
  };


  return (
    <>
    <form onSubmit={handleSave}>
    <div
        className={`${styles.logo_section} d-flex flex-column align-items-center my-5 `}
      >
        <SectionMainTitle title="Company Logo" />
        <div className={styles.company_old_logo}>
          <label htmlFor="profileLogo">
            <img src={imgUrl ? imgUrl : profileLogo} alt="logo" />
          </label>
          <input
            accept="image/*"
            type="file"
            id="profileLogo"
            className="d-none"
            onChange={handleImageChange}
            ref={inputRef}
          />
        </div>
        <div className="d-flex mt-4">
          <button className={`${styles.delete_btn}  me-4`}>
            <FontAwesomeIcon icon={faTrash} /> Delete
          </button>
          <button
            className={`${styles.change_logo_btn}`}
            onClick={handleClickLogoInput}
          >
            Changes Logo
          </button>
        </div>
        <span className="mini_word mt-4">
          maximum size of 5 MB. Logo Recommended aspect ratio of 1:1
        </span>
      </div>

      <div
        className={`${styles.cover_section} d-flex flex-column align-items-center my-5`}
      >
        <SectionMainTitle title="Company Cover" />
        <div className={coverClasses}>
          <label htmlFor="profileCover">
            <img src={coverUrl ? coverUrl : profileCover} alt="Cover" />
          </label>
          <input
            accept="image/*"
            type="file"
            id="profileCover"
            className="d-none"
            onChange={handleCoverChange}
            ref={coverRef}
          />
        </div>
        <div className="d-flex mt-4">
          <button className={`${styles.delete_btn}  me-4`}>
            <FontAwesomeIcon icon={faTrash} /> Delete
          </button>
          <button
            className={`${styles.change_logo_btn}`}
            onClick={handleClickCoverInput}
          >
            Change Cover
          </button>
        </div>
        <span className="mini_word mt-4 text-center px-5">
          By selecting and submitting a cover photo, you confirm that you
          possess the necessary rights to distribute this image and that it
          complies with the terms outlined in the user agreement. Uploading a
          cover photo plays a crucial role in establishing and differentiating
          your brand.
        </span>
      </div>

      <div className="d-flex justify-content-end align-items-center my-5 px-2">
            <button className={styles.save_btn} type="submit">
              Save Changes
            </button>
        </div>
    </form>

        
        {modalShow && (
        <CropLogo
          show={modalShow}
          onHide={() => setModalShow(false)}
          imgUrl={imgUrl}
          setImgUrl={setImgUrl}
          setImgFile={setImgFile}
        />
      )}

      <CropCover
        show={coverModal}
        onHide={() => setCoverModal(false)}
        imgUrl={coverUrl}
        setImgUrl={setCoverUrl}
        setImgFile={setCoverFile}
      />
    </>
  );
};

export default CompanyMedia;