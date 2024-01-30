import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import styles from "./HomeTopEmployersSlider.module.css";
import c1 from "../../images/c1.png";
import c2 from "../../images/c2.png";
import c3 from "../../images/c3.png";
import c4 from "../../images/c4.png";
import c5 from "../../images/c5.png";
import c6 from "../../images/c6.png";
import c7 from "../../images/c7.png";
import c8 from "../../images/c8.png";
import c9 from "../../images/c9.png";

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
              type:"custom",
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
              <div className=" d-flex flex-column">
                <img src={c1} className="my-2" alt="logo company" />
                <img src={c2} className="my-2" alt="logo company" />
              </div>
            </SwiperSlide>
            <SwiperSlide className={styles.company}>
            <div className=" d-flex flex-column">
                <img src={c3} className="my-2" alt="logo company" />
                <img src={c4} className="my-2" alt="logo company" />
              </div>
            </SwiperSlide>
            <SwiperSlide className={styles.company}>
            <div className=" d-flex flex-column">
                <img src={c5} className="my-2" alt="logo company" />
                <img src={c6} className="my-2" alt="logo company" />
              </div>
            </SwiperSlide>
            <SwiperSlide className={styles.company}>
            <div className=" d-flex flex-column">
                <img src={c7} className="my-2" alt="logo company" />
                <img src={c8} className="my-2" alt="logo company" />
              </div>
            </SwiperSlide>
            <SwiperSlide className={styles.company}>
            <div className=" d-flex flex-column">
                <img src={c9} className="my-2" alt="logo company" />
                <img src={c1} className="my-2" alt="logo company" />
              </div>
            </SwiperSlide>
            <SwiperSlide className={styles.company}>
            <div className=" d-flex flex-column">
                <img src={c3} className="my-2" alt="logo company" />
                <img src={c4} className="my-2" alt="logo company" />
              </div>
            </SwiperSlide>
            <SwiperSlide className={styles.company}>
            <div className=" d-flex flex-column">
                <img src={c5} className="my-2" alt="logo company" />
                <img src={c6} className="my-2" alt="logo company" />
              </div>
            </SwiperSlide>
            <SwiperSlide className={styles.company}>
            <div className=" d-flex flex-column">
                <img src={c7} className="my-2" alt="logo company" />
                <img src={c8} className="my-2" alt="logo company" />
              </div>
            </SwiperSlide>
            <SwiperSlide className={styles.company}>
            <div className=" d-flex flex-column">
                <img src={c9} className="my-2" alt="logo company" />
                <img src={c1} className="my-2" alt="logo company" />
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
              <img src={c1} alt="logo company" />
            </SwiperSlide>
            <SwiperSlide className={styles.company}>
              <img src={c2} alt="logo company" />
            </SwiperSlide>
            <SwiperSlide className={styles.company}>
              <img src={c3} alt="logo company" />
            </SwiperSlide>
            <SwiperSlide className={styles.company}>
              <img src={c4} alt="logo company" />
            </SwiperSlide>
            <SwiperSlide className={styles.company}>
              <img src={c5} alt="logo company" />
            </SwiperSlide>
            <SwiperSlide className={styles.company}>
              <img src={c6} alt="logo company" />
            </SwiperSlide>
            <SwiperSlide className={styles.company}>
              <img src={c7} alt="logo company" />
            </SwiperSlide>
            <SwiperSlide className={styles.company}>
              <img src={c8} alt="logo company" />
            </SwiperSlide>
            <SwiperSlide className={styles.company}>
              <img src={c9} alt="logo company" />
            </SwiperSlide>
          </Swiper>
        </>
      )}
    </>
  );
};

export default HomeTopEmployersSlider;
