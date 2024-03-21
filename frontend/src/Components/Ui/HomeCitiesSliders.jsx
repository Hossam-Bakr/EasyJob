import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Autoplay, Pagination } from "swiper/modules";

import styles from "./HomeCitiesSliders.module.css";

import cairo from "../../images/Cairo.jpg";
import alex from "../../images/Alex.jpg";
import giza from "../../images/Giza.jpg";
import dubai from "../../images/dubai.jpg";
import kuwait from "../../images/Kuwait.jpg";
import ryadh from "../../images/ryadh.jpg";
import mecca from "../../images/mecca.jpg";
import MainButtonTwo from "./MainButtonTwo";

const HomeCitiesSliders = () => {
  return (
    <div className={styles.slider_contianer}>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        freeMode={false}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
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
            slidesPerView: 2,
            spaceBetween: 40,
          },
          "@1.50": {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        modules={[FreeMode, Autoplay, Pagination]}
        className={`${styles.slider_contnet} mySwiper`}
      >
        <SwiperSlide className={styles.slider_item}>
          <div className={styles.slider_container_img}>
            <img src={cairo} alt="cairo" />
            <div className={styles.slider_caption}>
              <h2>Cairo</h2>
              <span>open jobs 300</span>
              <MainButtonTwo type="arrow" text="Discover" />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.slider_item}>
          <div className={styles.slider_container_img}>
            <img src={giza} alt="giza" />
            <div className={styles.slider_caption}>
              <h2>Giza</h2>
              <span>open jobs 30</span>
              <MainButtonTwo type="arrow" text="Discover" />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.slider_item}>
          <div className={styles.slider_container_img}>
            <img src={alex} alt="alex" />
            <div className={styles.slider_caption}>
              <h2>Alex</h2>
              <span>open jobs 40</span>
              <MainButtonTwo type="arrow" text="Discover" />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.slider_item}>
          <div className={styles.slider_container_img}>
            <img src={ryadh} alt="ryadh" />
            <div className={styles.slider_caption}>
              <h2>Ryadh</h2>
              <span>open jobs 42</span>
              <MainButtonTwo type="arrow" text="Discover" />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.slider_item}>
          <div className={styles.slider_container_img}>
            <img src={mecca} alt="mecca" />
            <div className={styles.slider_caption}>
              <h2>Mecca</h2>
              <span>open jobs 2</span>
              <MainButtonTwo type="arrow" text="Discover" />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.slider_item}>
          <div className={styles.slider_container_img}>
            <img src={dubai} alt="dubai" />
            <div className={styles.slider_caption}>
              <h2>Dubai</h2>
              <span>open jobs 20</span>
              <MainButtonTwo type="arrow" text="Discover" />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.slider_item}>
          <div className={styles.slider_container_img}>
            <img src={kuwait} alt="kuwait" />
            <div className={styles.slider_caption}>
              <h2>Kuwait</h2>
              <span>open jobs 10</span>
              <MainButtonTwo type="arrow" text="Discover" />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HomeCitiesSliders;
