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
  faLayerGroup,
  faLocationDot,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import ApplyBtn from "./ApplyBtn";
import { useDispatch, useSelector } from "react-redux";
import LoginAlertModal from "./LoginAlertModal";
import { formatedTimeHandler } from "../logic/Logic";
import noLogo from "../../images/noLogo.jpg";
import FloatingPopup from "./FloatingPopup";
import { getSavedJobsHandler } from "../../Store/savedJobs-actions";
import { saveJobsHandler } from "../../util/Http";
import { useNavigate } from "react-router-dom";

const JobPost = ({
  id,
  logo,
  name,
  jobTitle,
  req,
  country,
  city,
  type,
  workplace,
  time,
  maxSalary,
  hideSalary,
  grid,
  profile,
  shape
}) => {
  const [modalShow, setModalShow] = useState(false);
  const [jobCompanyLogo, setJobCompanyLogo] = useState(null);
  const [formatedTime, setFormatedTime] = useState("");
  const [showResponse, setShowResponse] = useState(false);
  const [responseMessage, setResponseMessage] = useState({
    title: "",
    content: "",
  });
  const [successResponse, setSuccessResponse] = useState(true);

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
      {shape === "table" ? (
          <tr>
          <td className={`${styles.info_table} ${styles.table_cell}`}>
            {name}
          </td>
          <td className={` ${styles.table_cell}`}>{jobTitle}</td>
          <td className={` ${styles.table_cell} ${styles.type}`}><span>{type} , {workplace}</span></td>
          <td className={` ${styles.table_cell}`}>{formatedTime}</td>
          <td className={` ${styles.table_btn}`}>
            <FontAwesomeIcon title="preview" icon={faArrowRight}/>
            <FontAwesomeIcon title="ediet" icon={faEdit}/>
            <FontAwesomeIcon title="stages" icon={faLayerGroup}/>
          </td>
        </tr>
      ) : (
        <>
          {" "}
          <Col lg={lgSize} xl={xlSize} className={styles.job_container}>
            <div data-aos="zoom-in-up" data-aos-duration="1000">
              <div className={styles.job}>
                <div className={styles.job_icons}>
                  {profile ? (
                    <>
                      <FontAwesomeIcon
                        onClick={checkToNavigateJobDetails}
                        icon={faEdit}
                        title="ediet post"
                        className={`${styles.bookmark_icon} mx-2`}
                      />
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
                <p>{req}</p>
                <div
                  className={`${styles.info} d-flex justify-content-evenly align-items-center`}
                >
                  {workplace && <span>{workplace}</span>}
                  {type && <span>{type}</span>}
                  {profile ? (
                    <span className={styles.delete_post}>
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
                          <ApplyBtn type="white" text="Apply Now" />
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </Col>
        </>
      )}

      <LoginAlertModal show={modalShow} onHide={() => setModalShow(false)} />
      <FloatingPopup
        showResponse={showResponse}
        setShowResponse={setShowResponse}
        message={responseMessage}
        success={successResponse}
      />
    </>
  );
};

export default JobPost;
