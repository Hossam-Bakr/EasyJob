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
                                <p>Far much that one rank beheld bluebird after outside ignobly allegedly more when oh arrogantly vehement irresistibly fussy penguin insect additionally wow absolutely crud meretriciously hastily dalmatian a glowered inset one echidna cassowary .</p>
                                <p>Repeatedly dreamed alas opossum but dramatically despite expeditiously that jeepers loosely yikes that as or eel underneath kept and slept compactly far purred sure abidingly up above fitting to strident wiped set waywardly far the and pangolin horse approving paid chuckled cassowary oh above a much opposite far much hypnotically more therefore wasp less that hey apart well like while superbly orca and far hence one.</p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </section>
        </header>
    );
}

export default AboutHeader;
