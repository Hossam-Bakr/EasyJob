import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import styles from "./HomeTopEmployersSlider.module.css";
import L1 from "../../images/logo/lg.png";
import L2 from "../../images/logo/huwawei.webp";
import L3 from "../../images/logo/amazon.png";
import L4 from "../../images/logo/we.png";
import L5 from "../../images/logo/etisalat.png";
import L6 from "../../images/logo/etoile.png";
import L7 from "../../images/logo/msary.png";
import L8 from "../../images/logo/raya.webp";
import L9 from "../../images/logo/vodafone.png";
import L10 from "../../images/logo/cairo.png";
import L11 from "../../images/logo/elaraby.png";
import L12 from "../../images/logo/concentrix.webp";
import L13 from "../../images/logo/talatmostafa.png";
import L14 from "../../images/logo/saintgobain.png";
import L15 from "../../images/logo/wadidegla.png";
import L16 from "../../images/logo/alfuttaim.png";
import L17 from "../../images/logo/capital.png";

const HomeTopEmployersSlider = ({ type }) => {
  return (
    <>
      {type === "two_rows" ? (
        <>
          <Swiper
            slidesPerView={4}
            spaceBetween={10}
            autoplay={{
              delay: 300,
              disableOnInteraction: false,
            }}
            // navigation={true}
            pagination={{
              clickable: true,
              type: "custom",
            }}
            loop={true}
            speed={1000}
            breakpoints={{
              "@0.00": {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              "@0.75": {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              "@1.00": {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              "@1.50": {
                slidesPerView: 4,
                spaceBetween: 50,
              },
            }}
            modules={[Pagination, Autoplay]}
            className={`${styles.swiper_content} mySwiper`}
          >
            <SwiperSlide className={styles.company}>
              <div
                className={`${styles.double_contianer}  d-flex flex-column justify-content-between align-items-center`}
              >
                <img src={L1} className="my-2" alt="logo company" />
                <img src={L2} className="my-2" alt="logo company" />
              </div>
            </SwiperSlide>
            <SwiperSlide className={styles.company}>
              <div
                className={`${styles.double_contianer}  d-flex flex-column justify-content-between align-items-center`}
              >
                <img src={L3} className="my-2" alt="logo company" />
                <img src={L4} className="my-2" alt="logo company" />
              </div>
            </SwiperSlide>
            <SwiperSlide className={styles.company}>
              <div
                className={`${styles.double_contianer}  d-flex flex-column justify-content-between align-items-center`}
              >
                <img src={L5} className="my-2" alt="logo company" />
                <img src={L6} className="my-2" alt="logo company" />
              </div>
            </SwiperSlide>
            <SwiperSlide className={styles.company}>
              <div
                className={`${styles.double_contianer}  d-flex flex-column justify-content-between align-items-center`}
              >
                <img src={L7} className="my-2" alt="logo company" />
                <img src={L8} className="my-2" alt="logo company" />
              </div>
            </SwiperSlide>
            <SwiperSlide className={styles.company}>
              <div
                className={`${styles.double_contianer}  d-flex flex-column justify-content-between align-items-center`}
              >
                <img src={L9} className="my-2" alt="logo company" />
                <img src={L10} className="my-2" alt="logo company" />
              </div>
            </SwiperSlide>
            <SwiperSlide className={styles.company}>
              <div
                className={`${styles.double_contianer}  d-flex flex-column justify-content-between align-items-center`}
              >
                <img src={L11} className="my-2" alt="logo company" />
                <img src={L12} className="my-2" alt="logo company" />
              </div>
            </SwiperSlide>
            <SwiperSlide className={styles.company}>
              <div
                className={`${styles.double_contianer}  d-flex flex-column justify-content-between align-items-center`}
              >
                <img src={L13} className="my-2" alt="logo company" />
                <img src={L14} className="my-2" alt="logo company" />
              </div>
            </SwiperSlide>
            <SwiperSlide className={styles.company}>
              <div
                className={`${styles.double_contianer}  d-flex flex-column justify-content-between align-items-center`}
              >
                <img src={L15} className="my-2" alt="logo company" />
                <img src={L16} className="my-2" alt="logo company" />
              </div>
            </SwiperSlide>
            <SwiperSlide className={styles.company}>
              <div
                className={`${styles.double_contianer}  d-flex flex-column justify-content-between align-items-center`}
              >
                <img src={L17} className="my-2" alt="logo company" />
                <img src={L7} className="my-2" alt="logo company" />
              </div>
            </SwiperSlide>
          </Swiper>
        </>
      ) : (
        <>
          <Swiper
            slidesPerView={4}
            spaceBetween={10}
            autoplay={{
              delay: 1000,
              disableOnInteraction: false,
            }}
            navigation={true}
            pagination={{
              clickable: true,
              type: "custom",
            }}
            loop={true}
            speed={3000}
            breakpoints={{
              "@0.00": {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              "@0.75": {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              "@1.00": {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              "@1.50": {
                slidesPerView: 4,
                spaceBetween: 50,
              },
            }}
            modules={[Pagination, Autoplay, Navigation]}
            className={`${styles.swiper_content} mySwiper`}
          >
            {" "}
            <SwiperSlide className={styles.company}>
              <div className={styles.single_container}>
                <img src={L1} alt="logo company" />
              </div>
            </SwiperSlide>
            <SwiperSlide className={styles.company}>
              <div className={styles.single_container}>
                <img src={L2} alt="logo company" />
              </div>
            </SwiperSlide>
            <SwiperSlide className={styles.company}>
              <div className={styles.single_container}>
                <img src={L3} alt="logo company" />
              </div>
            </SwiperSlide>
            <SwiperSlide className={styles.company}>
              <div className={styles.single_container}>
                <img src={L4} alt="logo company" />
              </div>
            </SwiperSlide>
            <SwiperSlide className={styles.company}>
              <div className={styles.single_container}>
                <img src={L5} alt="logo company" />
              </div>
            </SwiperSlide>
            <SwiperSlide className={styles.company}>
              <div className={styles.single_container}>
                <img src={L6} alt="logo company" />
              </div>
            </SwiperSlide>
            <SwiperSlide className={styles.company}>
              <div className={styles.single_container}>
                <img src={L7} alt="logo company" />
              </div>            </SwiperSlide>
            <SwiperSlide className={styles.company}>
              <div className={styles.single_container}>
                <img src={L8} alt="logo company" />
              </div>            </SwiperSlide>
            <SwiperSlide className={styles.company}>
              <div className={styles.single_container}>
                <img src={L9} alt="logo company" />
              </div>            </SwiperSlide>
            <SwiperSlide className={styles.company}>
              <div className={styles.single_container}>
                <img src={L10} alt="logo company" />
              </div>
            </SwiperSlide>
            <SwiperSlide className={styles.company}>
              <div className={styles.single_container}>
                <img src={L11} alt="logo company" />
              </div>
            </SwiperSlide>
            <SwiperSlide className={styles.company}>
              <div className={styles.single_container}>
                <img src={L12} alt="logo company" />
              </div>
            </SwiperSlide>
            <SwiperSlide className={styles.company}>
              <div className={styles.single_container}>
                <img src={L13} alt="logo company" />
              </div>
            </SwiperSlide>
            <SwiperSlide className={styles.company}>
              <div className={styles.single_container}>
                <img src={L14} alt="logo company" />
              </div>
            </SwiperSlide>
            <SwiperSlide className={styles.company}>
              <div className={styles.single_container}>
                <img src={L15} alt="logo company" />
              </div>
            </SwiperSlide>
            <SwiperSlide className={styles.company}>
              <div className={styles.single_container}>
                <img src={L16} alt="logo company" />
              </div>
            </SwiperSlide>
            <SwiperSlide className={styles.company}>
              <div className={styles.single_container}>
                <img src={L17} alt="logo company" />
              </div>
            </SwiperSlide>
          </Swiper>
        </>
      )}
    </>
  );
};

export default HomeTopEmployersSlider;
