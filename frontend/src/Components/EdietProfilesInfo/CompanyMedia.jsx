import React, { useEffect, useRef, useState } from "react";
import styles from "./CompanyMedia.module.css";
import SectionMainTitle from "../Ui/SectionMainTitle";
import noLogo from "../../images/noLogo.jpg";
import noCover from "../../images/noCover.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faYinYang } from "@fortawesome/free-solid-svg-icons";
import CropLogo from "../CropImages/CropLogo";
import CropCover from "../CropImages/CropCover";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import FloatingPopup from "../Ui/FloatingPopup";
import fetchProfileData from "../../Store/profileInfo-actions";

const CompanyMedia = ({ logo, cover }) => {
  const [modalShow, setModalShow] = useState(false);
  const [imgFile, setImgFile] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);

  const [coverModal, setCoverModal] = useState(false);
  const [coverFile, setCoverFile] = useState(null);
  const [coverUrl, setCoverUrl] = useState(null);

  const [profileLogo, setProfileLogo] = useState(null);
  const [profileCover, setProfileCover] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [responseMessage, setResponseMessage] = useState({
    title: "",
    content: "",
  });
  const [successResponse, setSuccessResponse] = useState(true);

  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const coverRef = useRef(null);

  const companyToken = useSelector((state) => state.userInfo.token);
  const companyProfileData = useSelector((state) => state.profileInfo.data);
  const role = useSelector((state) => state.userInfo.role);

  const coverClasses =
    cover || coverUrl ? styles.company_old_cover : styles.company_no_cover;

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImgFile(file);
      const url = URL.createObjectURL(file);
      setImgUrl(url);
    }
    setModalShow(true);
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setCoverFile(file);
      const url = URL.createObjectURL(file);
      setCoverUrl(url);
    }
    setCoverModal(true);
  };

  const handleClickLogoInput = () => {
    inputRef.current.click();
  };

  const handleClickCoverInput = () => {
    coverRef.current.click();
  };

  useEffect(() => {
    if (companyProfileData?.coverPhoto) {
      const profileCoverURL = `http://127.0.0.1:3000/companies/${companyProfileData.coverPhoto}`;
      setProfileCover(profileCoverURL);
    }
    if (companyProfileData?.logo) {
      const profileLogoUrl = `http://127.0.0.1:3000/companies/${companyProfileData.logo}`;
      setProfileLogo(profileLogoUrl);
    }
  }, [companyProfileData]);

  const handleSave = async (e) => {
    e.preventDefault();
    if (imgFile || coverFile) {
      const formData = new FormData();
      formData.append("logo", imgFile);
      formData.append("coverPhoto", coverFile);
      setIsLoading(true);

      try {
        const response = await axios.patch(
          "http://127.0.0.1:3000/api/v1/companies/profile/media",
          formData,
          {
            headers: {
              Authorization: `Bearer ${companyToken}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(response);

        if (role && companyToken) {
          dispatch(fetchProfileData(companyToken, role));
        }
        setResponseMessage({
          title: "Edieted Successfully",
          content: "your logo and cover updated successfully",
        });
        setSuccessResponse(true);
        setShowResponse(true);
      } catch (error) {
        console.error(error);
        setResponseMessage({
          title: "Request Faild",
          content: "your logo and cover faild to be uploaded please try again",
        });
        setSuccessResponse(false);
        setShowResponse(true);
      }
      setIsLoading(false);
    }
  };

  const edietedImgLogo = imgUrl ? imgUrl : profileLogo ? profileLogo : noLogo;
  const edietedImgCover = coverUrl
    ? coverUrl
    : profileCover
    ? profileCover
    : noCover;

  return (
    <>
      <form onSubmit={handleSave}>
        <div
          className={`${styles.logo_section} d-flex flex-column align-items-center my-5 `}
        >
          <SectionMainTitle title="Company Logo" />
          <div className={styles.company_old_logo}>
            <label htmlFor="profileLogo">
              <img src={edietedImgLogo} alt="logo" />
            </label>
            <input
              accept="image/*"
              type="file"
              id="profileLogo"
              className="d-none"
              onChange={handleImageChange}
              name="logo"
              ref={inputRef}
            />
          </div>
          <div className={` ${styles.btns} d-flex mt-4`}>
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
          <span className="mini_word mt-4 text-center">
            maximum size of 10 MB. Logo Recommended aspect ratio of 1:1
          </span>
        </div>

        <div
          className={`${styles.cover_section} d-flex flex-column align-items-center my-5`}
        >
          <SectionMainTitle title="Company Cover" />
          <div className={coverClasses}>
            <label htmlFor="profileCover">
              <img src={edietedImgCover} alt="Cover" />
            </label>
            <input
              accept="image/*"
              type="file"
              id="profileCover"
              className="d-none"
              name="coverPhoto"
              onChange={handleCoverChange}
              ref={coverRef}
            />
          </div>
          <div className={` ${styles.btns} d-flex mt-4`}>
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
          {isLoading ? (
            <button className={styles.save_btn} type="submit">
              <FontAwesomeIcon className="fa-spin" icon={faYinYang} />
            </button>
          ) : (
            <button className={styles.save_btn} type="submit">
              Save Changes
            </button>
          )}
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
      <FloatingPopup
        showResponse={showResponse}
        setShowResponse={setShowResponse}
        message={responseMessage}
        success={successResponse}
      />
    </>
  );
};

export default CompanyMedia;
