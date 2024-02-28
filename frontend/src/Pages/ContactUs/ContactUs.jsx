import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/esm/Col';
import styles from './ContactUs.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faEnvelope, faMapMarkedAlt, faPhoneFlip } from '@fortawesome/free-solid-svg-icons';
import ContactsIcon from './../../Components/Ui/ContactsIcon';
import MainBtnThree from '../../Components/Ui/MainBtnThree';

const ContactUs = () => {
  return (
    <section className="overflow-hidden" id="Contact">
        <Row>
            <Col md={5} className={styles.contact_info}>
                <div className={`${styles.contact_info_layer} p-4`}>
                    <div className={styles.contact_links}>
                        {/* <!-- data num 1 --> */}
                        <div className="d-flex mb-3">
                            <div className='me-3'>
                                <FontAwesomeIcon className={styles.contact_info_icon} icon={faPhoneFlip}/>
                            </div>
                            <div className="d-flex flex-column">
                                <h6 className={styles.data_link_h6}>Phone :</h6>
                                <p className={styles.data_link_p}>+20 010 251 789 18 , 371 789 18</p>
                            </div>
                        </div>

                        {/* <!-- data num 2 --> */}
                        <div className="d-flex mb-3">
                            <div className='me-3'>
                                <FontAwesomeIcon className={styles.contact_info_icon} icon={faEnvelope}/>
                            </div>
                            <div className="d-flex flex-column">
                                <h6 className={styles.data_link_h6}>Email :</h6>
                                <p className={styles.data_link_p}>EasyJob_support@website.com</p>
                            </div>
                        </div>

                        {/* <!-- data num 3 --> */}
                        <div className="d-flex mb-3">
                            <div className='me-3'>
                                <FontAwesomeIcon className={styles.contact_info_icon} icon={faMapMarkedAlt}/>
                            </div>
                            <div className="d-flex flex-column">
                                <h6 className={styles.data_link_h6}>Address :</h6>
                                <p className={styles.data_link_p}>4655 Elwehda Street, Imbaba, Illinois <br/>4961 Wescam Court, Reno, Nevada</p>
                            </div>
                        </div>

                        
                      <div className={styles.contact_info_icons}>
                        <ContactsIcon type="two"/>
                      </div>
                    </div>
                </div>
            </Col>
            <Col md={7} className="py-5">
                <div className="special_main_color text-center m-auto my-5">
                    <h6 className={styles.sub_title}>GET IN TOUCH</h6>
                    <h2 className={styles.form_title}>Contact Us</h2>
                    <FontAwesomeIcon icon={faCaretDown}/>
                </div>
                <div className="form-group p-3">
                    <Row className="justify-content-center">
                        <Col md={6} className="mb-4 p-2">    
                            <input type="text" id="form-name" placeholder="Name" className="form-control" name="name" required/>
                        </Col>
                        <Col md={6} className="mb-4 p-2">   
                            <input type="email" id="form-email" placeholder="Email" className="form-control" name="email" required/>
                        </Col>
                        <Col md={12} className="mb-4 p-2">
                            <input type="text" id="form-subject" placeholder="Subject" className="form-control" name="subject" required/>
                        </Col>
                        <Col md={12} className="mb-4 p-2">
                            <textarea name="message" id="form-message" className="form-control"  rows="3" required placeholder="Message"/>
                        </Col>
                    </Row>
                    <MainBtnThree text="Send Message"/>
                </div>
            </Col>
        </Row>
    </section>
  )
}

export default ContactUs
