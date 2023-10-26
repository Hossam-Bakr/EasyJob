import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import styles from "./HomeTopEmployersSlider.module.css";
import apple from "../../images/apple logo.png";
import netflix from "../../images/netflix logo.png";
import dell from "../../images/dell logo.png";
import slack from "../../images/slack logo.png";
import chatgpt from "../../images/chatgpt logo.png";
import c6 from "../../images/c6.png";
import c7 from "../../images/c7.png";
import c8 from "../../images/c8.png";
import c9 from "../../images/c9.png";

const HomeTopEmployersSlider = () => {
  return (
  
   <Swiper
      slidesPerView={1}
      spaceBetween={10}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      navigation={true}
      pagination={{
        clickable: true,
        type:'custom'
      }}
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
    <SwiperSlide className={styles.company}>
        <img src={apple} alt="logo company" />
      </SwiperSlide>
      <SwiperSlide className={styles.company}>
        <img src={dell} alt="logo company" />
      </SwiperSlide>
      <SwiperSlide className={styles.company}>
        <img src={netflix} alt="logo company" />
      </SwiperSlide>
      <SwiperSlide className={styles.company}>
        <img src={slack} alt="logo company" />
      </SwiperSlide>
      <SwiperSlide className={styles.company}>
        <img src={chatgpt} alt="logo company" />
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
  );
};

export default HomeTopEmployersSlider;
