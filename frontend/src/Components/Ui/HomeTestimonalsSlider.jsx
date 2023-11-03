import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import { Navigation, Autoplay } from "swiper/modules";

import styles from "./HomeTestimonalsSlider.module.css";

import person1 from "../../images/people1.jpeg";
import person2 from "../../images/people2.jpeg";
import person3 from "../../images/people3.jpeg";
import person4 from "../../images/people4.jpeg";
import person5 from "../../images/people5.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faHeart,
  faStar,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import AOS from "aos";
import "aos/dist/aos.css";
import TestimonalsModal from "./TestimonalsModal";

const HomeTestimonalsSlider = () => {
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    AOS.init();
  });

  return (
    <>
      <Swiper
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
          reverseDirection: true,
        }}
        loop={true}
        navigation={true}
        modules={[Navigation, Autoplay]}
        className={`${styles.Swiper_container} mySwiper`}
        data-aos="zoom-in-up"
        data-aos-duration="1000"
      >
        <SwiperSlide className={styles.slide}>
          <div className={styles.slide_content}>
            <div className={`${styles.slide_header} d-flex align-items-center`}>
              <img src={person1} className={`${styles.person}`} alt="person" />
              <div
                className={`${styles.slide_header_caption} d-flex flex-column  ms-3`}
              >
                <h5 className={styles.person_name}>Sali Magdi</h5>
                <span className={styles.person_date}>2 weeks ago</span>
              </div>
              <div
                className={`${styles.five_starts} d-flex justify-content-between ms-auto`}
              >
                <FontAwesomeIcon icon={faStar} className="starts_color" />
                <FontAwesomeIcon icon={faStar} className="starts_color" />
                <FontAwesomeIcon icon={faStar} className="starts_color" />
                <FontAwesomeIcon icon={faStar} className="starts_color" />
                <FontAwesomeIcon icon={faStar} className="starts_color" />
              </div>
            </div>
            <div className={styles.person_comment}>
              <p>
                I couldn't have found my dream job without this platform. The
                support and resources provided here were invaluable in my job
                search.
              </p>
            </div>
            <div className={styles.reacts}>
              <FontAwesomeIcon icon={faThumbsUp} className={styles.like_icon} />
              <FontAwesomeIcon
                onClick={() => setModalShow(true)}
                icon={faComment}
                className={styles.comment_icon}
              />
              <FontAwesomeIcon icon={faHeart} className={styles.love_icon} />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.slide}>
          <div className={styles.slide_content}>
            <div className={`${styles.slide_header} d-flex align-items-center`}>
              <img src={person4} className={`${styles.person}`} alt="person" />

              <div
                className={`${styles.slide_header_caption} d-flex flex-column  ms-3`}
              >
                <h5 className={styles.person_name}>Ramy Gamal</h5>
                <span className={styles.person_date}>1 year ago</span>
              </div>
              <div
                className={`${styles.five_starts} d-flex justify-content-between ms-auto`}
              >
                <FontAwesomeIcon icon={faStar} className="starts_color" />
                <FontAwesomeIcon icon={faStar} className="starts_color" />
                <FontAwesomeIcon icon={faStar} className="starts_color" />
                <FontAwesomeIcon icon={faStar} className="starts_color" />
                <FontAwesomeIcon icon={faStar} className="starts_color" />
              </div>
            </div>
            <div className={styles.person_comment}>
              <p>
                I highly recommend this job-finding website to anyone searching
                for employment opportunities. It connected me with great
                companies, and I secured a fantastic job within weeks.
              </p>
            </div>
            <div className={styles.reacts}>
              <FontAwesomeIcon icon={faThumbsUp} className={styles.like_icon} />
              <FontAwesomeIcon
                onClick={() => setModalShow(true)}
                icon={faComment}
                className={styles.comment_icon}
              />
              <FontAwesomeIcon icon={faHeart} className={styles.love_icon} />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.slide}>
          <div className={styles.slide_content}>
            <div className={`${styles.slide_header} d-flex align-items-center`}>
              <img src={person3} className={`${styles.person}`} alt="person" />
              <div
                className={`${styles.slide_header_caption} d-flex flex-column  ms-3`}
              >
                <h5 className={styles.person_name}>Hazem Amr</h5>
                <span className={styles.person_date}>2 month ago</span>
              </div>
              <div
                className={`${styles.five_starts} d-flex justify-content-between ms-auto`}
              >
                <FontAwesomeIcon icon={faStar} className="starts_color" />
                <FontAwesomeIcon icon={faStar} className="starts_color" />
                <FontAwesomeIcon icon={faStar} className="starts_color" />
                <FontAwesomeIcon icon={faStar} className="starts_color" />
                <FontAwesomeIcon icon={faStar} className="starts_color" />
              </div>
            </div>
            <div className={styles.person_comment}>
              <p>
                I'm impressed with the quality of job listings and the ease of
                use on this platform. It helped me land a job that aligns
                perfectly with my career goals.
              </p>
            </div>
            <div className={styles.reacts}>
              <FontAwesomeIcon icon={faThumbsUp} className={styles.like_icon} />
              <FontAwesomeIcon
                onClick={() => setModalShow(true)}
                icon={faComment}
                className={styles.comment_icon}
              />
              <FontAwesomeIcon icon={faHeart} className={styles.love_icon} />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.slide}>
          <div className={styles.slide_content}>
            <div className={`${styles.slide_header} d-flex align-items-center`}>
              <img src={person5} className={`${styles.person}`} alt="person" />
              <div
                className={`${styles.slide_header_caption} d-flex flex-column  ms-3`}
              >
                <h5 className={styles.person_name}>Kareem Taha</h5>
                <span className={styles.person_date}>jsut now</span>
              </div>
              <div
                className={`${styles.five_starts} d-flex justify-content-between ms-auto`}
              >
                <FontAwesomeIcon icon={faStar} className="starts_color" />
                <FontAwesomeIcon icon={faStar} className="starts_color" />
                <FontAwesomeIcon icon={faStar} className="starts_color" />
                <FontAwesomeIcon icon={faStar} className="starts_color" />
                <FontAwesomeIcon icon={faStar} className="starts_color" />
              </div>
            </div>
            <div className={styles.person_comment}>
              <p>
                Thanks to this website, I found a job that perfectly matches my
                skills and aspirations. The user-friendly interface made the job
                hunt so much easier.
              </p>
            </div>
            <div className={styles.reacts}>
              <FontAwesomeIcon icon={faThumbsUp} className={styles.like_icon} />
              <FontAwesomeIcon
                onClick={() => setModalShow(true)}
                icon={faComment}
                className={styles.comment_icon}
              />
              <FontAwesomeIcon icon={faHeart} className={styles.love_icon} />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.slide}>
          <div className={styles.slide_content}>
            <div className={`${styles.slide_header} d-flex align-items-center`}>
              <img src={person2} className={`${styles.person}`} alt="person" />
              <div
                className={`${styles.slide_header_caption} d-flex flex-column  ms-3`}
              >
                <h5 className={styles.person_name}>Dr.Amr Eid</h5>
                <span className={styles.person_date}>1 june 2023</span>
              </div>
              <div
                className={`${styles.five_starts} d-flex justify-content-between ms-auto`}
              >
                <FontAwesomeIcon icon={faStar} className="starts_color" />
                <FontAwesomeIcon icon={faStar} className="starts_color" />
                <FontAwesomeIcon icon={faStar} className="starts_color" />
                <FontAwesomeIcon icon={faStar} className="starts_color" />
                <FontAwesomeIcon icon={faStar} className="starts_color" />
              </div>
            </div>
            <div className={styles.person_comment}>
              <p>
                This website is a game-changer for job seekers like me. The
                personalized job recommendations and the responsive support team
                made my job search a breeze.
              </p>
            </div>
            <div className={styles.reacts}>
              <FontAwesomeIcon icon={faThumbsUp} className={styles.like_icon} />
              <FontAwesomeIcon
                onClick={() => setModalShow(true)}
                icon={faComment}
                className={styles.comment_icon}
              />
              <FontAwesomeIcon icon={faHeart} className={styles.love_icon} />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      <TestimonalsModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
};

export default HomeTestimonalsSlider;
