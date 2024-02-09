import React, { useState} from "react";
import styles from "./CompanyMedia.module.css";
import SectionMainTitle from "../Ui/SectionMainTitle";
import logo from "../../images/noLogo.jpg";
import cover from "../../images/companyCover.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import CropLogo from "../CropImages/CropLogo";


const CompanyMedia = () => {
  const [modalShow, setModalShow] = useState(false);
  const [imgFile, setImgFile] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);

  const handleOpeningModal = () => {
    setModalShow(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImgFile(file);
      const url = URL.createObjectURL(file);
      setImgUrl(url);
    }
    setModalShow(true);
  };

  return (
    <>
      <>
        <div
          className={`${styles.logo_section} d-flex flex-column align-items-center my-5 `}
        >
          <SectionMainTitle title="Company Logo" />
          <div className={styles.company_old_logo}>
            <label htmlFor="profileLogo">
              <img src={imgUrl ? imgUrl : logo} alt="logo" />
            </label>
            <input
              accept="image/*"
              type="file"
              id="profileLogo"
              className="d-none"
              onChange={handleImageChange}
            />
          </div>
          <div className="d-flex mt-4">
            <button className={`${styles.delete_btn}  me-4`}>
              <FontAwesomeIcon icon={faTrash} /> Delete
            </button>
            <button
              className={`${styles.change_logo_btn}`}
              onClick={handleOpeningModal}
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
          <div className={styles.company_old_cover}>
            <img src={cover} alt="company cover" />
          </div>
          <div className="d-flex mt-4">
            <button className={`${styles.delete_btn}  me-4`}>
              <FontAwesomeIcon icon={faTrash} /> Delete
            </button>
            <button className={`${styles.change_logo_btn}`}>
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
      </>
      {modalShow && (
        <CropLogo
          show={modalShow}
          onHide={() => setModalShow(false)}
          imgUrl={imgUrl}
          setImgUrl={setImgUrl}
          setImgFile={setImgFile}
        />
      )}
    </>
  );
};

export default CompanyMedia;

// const [file, setFile] = useState(null);
// const [photoURL, setPhotoURL] = useState(null);
// const [data, setData] = useState("");
// const [profileImage, setProfileImage] = useState(logo); // Initial profile image

// const handleImageChange = (e) => {
//   const file = e.target.files[0];
//   if (file) {
//     setFile(file);
//     setPhotoURL(URL.createObjectURL(file));
//     setModalShow(true);
//   }
// };

// const handleImageSave = async () => {
//   // Save the cropped image and update the profile image URL
//   try {
//     // Make a GET request to fetch the updated profile image URL
//     const response = await axios.get('http://127.0.0.1:3000/api/v1/companies/profile/media');

//     // Update the profile image URL
//     setProfileImage(response.data.url);
//   } catch (error) {
//     console.error('Error fetching updated profile image:', error);
//   }
// };
// Update the profileLogo variable to use the updated profile image URL

// const profileLogo = photoURL !== null ? photoURL : profileImage;
