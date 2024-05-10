import React, { useEffect, useState } from "react";
import styles from "./JobPost.module.css";
import Col from "react-bootstrap/esm/Col";
import AOS from "aos";
import "aos/dist/aos.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faBookmark,
  faEdit,
  faEye,
  faLocationDot,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import ApplyBtn from "./ApplyBtn";
import { useDispatch, useSelector } from "react-redux";
import LoginAlertModal from "./LoginAlertModal";
import { formatedTimeHandler } from "../logic/Logic";
import noLogo from "../../images/noLogo.jpg";
import { getSavedJobsHandler } from "../../Store/savedJobs-actions";
import { saveJobsHandler } from "../../util/Http";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "./ConfirmModal";

const JobPost = ({
  id,
  logo,
  name,
  jobTitle,
  desc,
  country,
  city,
  type,
  workplace,
  time,
  maxSalary,
  hideSalary,
  grid,
  profile,
  isMyProfile,
  refetch,
  setShowResponse,
  setResponseMessage,
  setSuccessResponse
}) => {
  const [modalShow, setModalShow] = useState(false);
  const [confirmModalShow, setConfirmModalShow] = useState(false);
  const [jobCompanyLogo, setJobCompanyLogo] = useState(null);
  const [formatedTime, setFormatedTime] = useState("");
  const isLogin = useSelector((state) => state.userInfo.isLogin);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.userInfo.token);
  const navigate = useNavigate();

  const checkToNavigateJobDetails = () => {
    if (isLogin) {
      navigate(`/job-details/${id}`);
    } else {
      setModalShow(true);
    }
  };

  const saveJobPost = async () => {
    if (token && isLogin) {
      const res = await saveJobsHandler({ jobId: id, token: token });
      if (res.status === "success") {
        setResponseMessage({
          title: "Saved Successfully",
          content: "Your Job Added To Saved Jobs successfully",
        });
        setSuccessResponse(true);
        setShowResponse(true);
      } else if (res === "Job already saved") {
        setResponseMessage({
          title: "Job Already Saved",
          content: "Your Job Already Added To Saved Jobs",
        });
        setSuccessResponse(false);
        setShowResponse(true);
      } else {
        setResponseMessage({
          title: "Faild to Save job",
          content: "Your Job Did not Add To Saved Jobs Please try again later",
        });
        setSuccessResponse(false);
        setShowResponse(true);
      }
      dispatch(getSavedJobsHandler(token));
    } else {
      setModalShow(true);
    }
  };

  const navigateToApplicationFormPage = () => {
    navigate(`/job-application-form/${id}`);
  };

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    setJobCompanyLogo(null);
    if (logo) {
      const compLogo = `http://127.0.0.1:3000/companies/${logo}`;
      setJobCompanyLogo(compLogo);
    }
  }, [logo]);

  useEffect(() => {
    if (time) {
      formatedTimeHandler(time, setFormatedTime);
    }
  }, [time]);

  let xlSize = grid ? 4 : 12;
  let lgSize = grid ? 6 : 12;

  return (
    <>
      <Col lg={lgSize} xl={xlSize} className={styles.job_container}>
        <div data-aos="zoom-in-up" data-aos-duration="1000">
          <div
            className={`${styles.job} ${profile ? styles.job_profile : ""} ${
              grid ? "" : styles.job_profile
            }`}
          >
            <div className={styles.job_icons}>
              {profile ? (
                <>
                  {isMyProfile && (
                    <FontAwesomeIcon
                      onClick={checkToNavigateJobDetails}
                      icon={faEdit}
                      title="ediet post"
                      className={`${styles.bookmark_icon} mx-2`}
                    />
                  )}

                  <FontAwesomeIcon
                    onClick={checkToNavigateJobDetails}
                    icon={faArrowRight}
                    title="preview"
                    className={`${styles.eye_icon} mx-2`}
                  />
                </>
              ) : (
                <>
                  <FontAwesomeIcon
                    onClick={saveJobPost}
                    icon={faBookmark}
                    title="save job"
                    className={`${styles.bookmark_icon} mx-2`}
                  />
                  <FontAwesomeIcon
                    onClick={checkToNavigateJobDetails}
                    icon={faEye}
                    title="view"
                    className={`${styles.eye_icon} mx-2`}
                  />
                </>
              )}
            </div>

            <div className={styles.header_container}>
              <div className={styles.logo_div}>
                <img
                  src={jobCompanyLogo ? jobCompanyLogo : noLogo}
                  alt="company logo"
                  className={styles.company_logo}
                />
              </div>

              <div className="d-flex flex-column ms-3 mt-1">
                <span className={styles.job_name}>
                  {name ? name : "Hidden Name"}
                </span>
                <span className="mini_word">{formatedTime}</span>
              </div>
            </div>
            <h4>{jobTitle}</h4>
            <p>{desc}</p>
            <div
              className={`${styles.info} d-flex justify-content-evenly align-items-center`}
            >
              {workplace && <span>{workplace}</span>}
              {type && <span>{type}</span>}
              {profile ? (
                <>
                  {isMyProfile ? (
                    <span
                      className={styles.delete_post}
                      onClick={() => setConfirmModalShow(true)}
                    >
                      <FontAwesomeIcon icon={faTrash} /> Delete
                    </span>
                  ) : (
                    <span>
                      <FontAwesomeIcon
                        icon={faLocationDot}
                        className={styles.location_icon}
                      />{" "}
                      {city}, {country}
                    </span>
                  )}
                </>
              ) : (
                <span>
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className={styles.location_icon}
                  />{" "}
                  {city}, {country}
                </span>
              )}
            </div>

            {profile ? (
              ""
            ) : (
              <>
                {isLogin && (
                  <div
                    className={`${styles.job_footer} d-flex justify-content-between align-items-center pt-3`}
                  >
                    {hideSalary ? (
                      ""
                    ) : (
                      <h6>
                        ${maxSalary}
                        <span className={styles.salary_per_h}>/M</span>
                      </h6>
                    )}
                    <div className="text-end w-100">
                      <ApplyBtn
                        onClick={navigateToApplicationFormPage}
                        type="white"
                        text="Apply Now"
                      />
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </Col>
      <LoginAlertModal show={modalShow} onHide={() => setModalShow(false)} />
      <ConfirmModal
        show={confirmModalShow}
        onHide={() => setConfirmModalShow(false)}
        jobId={id}
        btnText="Delete"
        text="Are you sure you want to delete this job"
        type="deleteJob"
        refetch={refetch}
        setShowResponse={setShowResponse}
        setResponseMessage={setResponseMessage}
        setSuccessResponse={setSuccessResponse}
      />
    </>
  );
};

export default JobPost;
