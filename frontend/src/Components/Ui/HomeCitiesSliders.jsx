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
import Jeddah from "../../images/Jeddah.jpg";
import mecca from "../../images/mecca.jpg";
import MainButtonTwo from "./MainButtonTwo";
import { useDispatch } from "react-redux";
import { filterActions } from "../../Store/filter-slice";
import { useNavigate } from "react-router-dom";

const HomeCitiesSliders = () => {
  const dispatch = useDispatch();
  const naviagte = useNavigate();

  const navigateToJobs = (val) => {
    dispatch(filterActions.setFilterationValue({ value: val, type: "city" }));
    naviagte("/jobs")
  };

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
            <img src={cairo} alt="Cairo" />
            <div className={styles.slider_caption}>
              <h2>Cairo</h2>
              <span>open jobs 300</span>
              <MainButtonTwo
                onClick={() => navigateToJobs("Cairo")}
                type="arrow"
                text="Discover"
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.slider_item}>
          <div className={styles.slider_container_img}>
            <img src={giza} alt="Giza" />
            <div className={styles.slider_caption}>
              <h2>Giza</h2>
              <span>open jobs 30</span>
              <MainButtonTwo
                onClick={() => navigateToJobs("Giza")}
                type="arrow"
                text="Discover"
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.slider_item}>
          <div className={styles.slider_container_img}>
            <img src={alex} alt="Alexandria" />
            <div className={styles.slider_caption}>
              <h2>Alex</h2>
              <span>open jobs 40</span>
              <MainButtonTwo
                onClick={() => navigateToJobs("Alexandria")}
                type="arrow"
                text="Discover"
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.slider_item}>
          <div className={styles.slider_container_img}>
            <img src={ryadh} alt="Riyadh" />
            <div className={styles.slider_caption}>
              <h2>Ryadh</h2>
              <span>open jobs 42</span>
              <MainButtonTwo
                onClick={() => navigateToJobs("Riyadh")}
                type="arrow"
                text="Discover"
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.slider_item}>
          <div className={styles.slider_container_img}>
            <img src={Jeddah} alt="Jeddah" />
            <div className={styles.slider_caption}>
              <h2>Jeddah</h2>
              <span>open jobs 11</span>
              <MainButtonTwo
                onClick={() => navigateToJobs("Jeddah")}
                type="arrow"
                text="Discover"
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.slider_item}>
          <div className={styles.slider_container_img}>
            <img src={mecca} alt="Mecca" />
            <div className={styles.slider_caption}>
              <h2>Mecca</h2>
              <span>open jobs 2</span>
              <MainButtonTwo
                onClick={() => navigateToJobs("Mecca")}
                type="arrow"
                text="Discover"
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.slider_item}>
          <div className={styles.slider_container_img}>
            <img src={dubai} alt="Dubai" />
            <div className={styles.slider_caption}>
              <h2>Dubai</h2>
              <span>open jobs 20</span>
              <MainButtonTwo
                onClick={() => navigateToJobs("Dubai")}
                type="arrow"
                text="Discover"
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.slider_item}>
          <div className={styles.slider_container_img}>
            <img src={kuwait} alt="kuwait" />
            <div className={styles.slider_caption}>
              <h2>Kuwait</h2>
              <span>open jobs 10</span>
              <MainButtonTwo
                onClick={() => navigateToJobs("kuwait")}
                type="arrow"
                text="Discover"
              />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HomeCitiesSliders;
