import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode,Autoplay, Pagination } from "swiper/modules";

import styles from "./HomeCitiesSliders.module.css";

import cairo from "../../images/Cairo.jpg";
import alex from "../../images/Alex.jpg";
import giza from "../../images/Giza.jpg";
import london from "../../images/london.jpg";
import paris from "../../images/paris.jpg";
import dubai from "../../images/dubai.jpg";
import germany from "../../images/Germany.jpg";
import canada from "../../images/Canada.jpg";
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
        modules={[FreeMode,Autoplay, Pagination]}
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
            <img src={paris} alt="paris" />
            <div className={styles.slider_caption}>
              <h2>Paris</h2>
              <span>open jobs 19</span>
              <MainButtonTwo type="arrow" text="Discover" />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.slider_item}>
          <div className={styles.slider_container_img}>
            <img src={london} alt="london" />
            <div className={styles.slider_caption}>
              <h2>London</h2>
              <span>open jobs 12</span>
              <MainButtonTwo type="arrow" text="Discover" />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.slider_item}>
          <div className={styles.slider_container_img}>
            <img src={dubai} alt="newyork" />
            <div className={styles.slider_caption}>
              <h2>Dubai</h2>
              <span>open jobs 2</span>
              <MainButtonTwo type="arrow" text="Discover" />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.slider_item}>
          <div className={styles.slider_container_img}>
            <img src={canada} alt="canada" />
            <div className={styles.slider_caption}>
              <h2>Canada</h2>
              <span>open jobs 7</span>
              <MainButtonTwo type="arrow" text="Discover" />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.slider_item}>
          <div className={styles.slider_container_img}>
            <img src={germany} alt="germany" />
            <div className={styles.slider_caption}>
              <h2>Germany</h2>
              <span>open jobs 3</span>
              <MainButtonTwo type="arrow" text="Discover" />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HomeCitiesSliders;
