import React from 'react';
import styles from "./About-Header.module.css";

import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import MainBadge from '../Ui/MainBadge';
import aboutBanner from "../../images/aboutHeader.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

const AboutHeader = () => {
    return (
        <header className={styles.about_Header}>
            <section>
                <MainBadge text={"About Us"} />
                <div className={styles.mainHeader}>
                    <h1>The world’s destination <br></br> for Jobs</h1>
                </div>
                <p>We’re on a mission to build the world’s best community for creatives to share, grow, and get hired.</p>
            </section>

            <section className={styles.sectionTwo}>
                <Row className="g-0">
                    <Col lg={6} className="col-one d-flex justify-content-center position-relative">
                        <div className={styles.header_banner}>
                            <div className={styles.bacground_shape}></div>
                            <img src={aboutBanner} alt="banner pic" className="w-100 h-100" />
                        </div>

                        <div className={styles.box_one}>
                            {/* <FontAwesomeIcon className={styles.dice_icon} icon={faDiceD20} /> */}
                            <div className="text-center">
                                <h5>1000+ Jobs</h5>
                                <span>Every day</span>
                            </div>
                        </div>
                        <div className={styles.box_two}>
                            <div className=" text-center">
                                <h5>2,5M+</h5>
                                <span>Job Available</span>
                            </div>
                        </div>
                        <FontAwesomeIcon icon={faLocationDot} className={styles.locationIcon} />
                    </Col>

                    <Col lg={6} className=''>
                        <div className={styles.header_captionBox}>
                            <div className={styles.header_caption}>
                                <h1>About Us</h1>
                                <p>At EasyJob, our mission is clear, to connect talented individuals with their dream jobs. We understand that finding the right job can be a transformative experience, shaping not just careers but lives. Whether you're a seasoned professional looking for your next challenge or a recent graduate eager to kickstart your career, we're here to guide you every step of the way.</p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </section>
        </header>
    );
}

export default AboutHeader;
