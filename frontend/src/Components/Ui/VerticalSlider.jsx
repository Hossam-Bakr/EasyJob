import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import styles from "./VerticalSlider.module.css";
import { Mousewheel, Pagination } from "swiper/modules";
import step1 from "../../images/step1.jpg";
import step2 from "../../images/step2.svg";
import step3 from "../../images/step3.jpg";
import step4 from "../../images/step4.jpg";

const VerticalSlider = () => {
  return (
    <>
      <Swiper
        direction={"vertical"}
        slidesPerView={1}
        spaceBetween={30}
        mousewheel={true}
        pagination={{
          clickable: true,
        }}
        modules={[Mousewheel, Pagination]}
        className={`${styles.swiper_container} mySwiper`}
      >
        <SwiperSlide className={styles.step_item}>
          <div className={styles.step_img}>
            <img src={step1} className="w-100" alt="create an account img" />
          </div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="182"
              height="417"
              viewBox="0 0 182 417"
            >
              <text
                id="_1"
                data-name="1"
                transform="translate(91 331)"
                fill="#002d48"
                fontSize="316"
                fontFamily="Roboto-Bold, Roboto"
                fontWeight="700"
                opacity="0.048"
              >
                <tspan x="-90" y="0">
                  1
                </tspan>
              </text>
            </svg>
            <h5 className={styles.one_svg}>Create an Account</h5>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.step_item}>
          <div className={styles.step_img}>
            <img src={step2} className="w-100" alt="upload cv img" />
          </div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="182"
              height="417"
              viewBox="0 0 182 417"
            >
              <text
                id="_2"
                data-name="2"
                transform="translate(91 331)"
                fill="#002d48"
                fontSize="316"
                fontFamily="Roboto-Bold, Roboto"
                fontWeight="700"
                opacity="0.048"
              >
                <tspan x="-90" y="0">
                  2
                </tspan>
              </text>
            </svg>
            <h5 className={styles.two_svg}> Upload Your CV</h5>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.step_item}>
          <div className={styles.step_img}>
            <img src={step3} className="w-100" alt="find job img" />
          </div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="182"
              height="417"
              viewBox="0 0 182 417"
            >
              <text
                id="_3"
                data-name="3"
                transform="translate(91 331)"
                fill="#002d48"
                fontSize="316"
                fontFamily="Roboto-Bold, Roboto"
                fontWeight="700"
                opacity="0.048"
              >
                <tspan x="-90" y="0">
                  3
                </tspan>
              </text>
            </svg>
            <h5>Find Your Job</h5>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.step_item}>
          <div className={styles.step_img}>
            <img src={step4} className="w-100" alt="Congratulations you've got a job" />
          </div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="182"
              height="417"
              viewBox="0 0 182 417"
            >
              <text
                id="_3"
                data-name="3"
                transform="translate(91 331)"
                fill="#002d48"
                fontSize="316"
                fontFamily="Roboto-Bold, Roboto"
                fontWeight="700"
                opacity="0.048"
              >
                <tspan x="-90" y="0">
                  4
                </tspan>
              </text>
            </svg>
            <h5>Congratulations you've got a job</h5>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default VerticalSlider;
