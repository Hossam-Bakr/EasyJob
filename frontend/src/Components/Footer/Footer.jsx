import React from 'react';

import styles from "./Footer.module.css";
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import { Link } from 'react-router-dom';
import ContactsIcon from '../Ui/ContactsIcon';
import footerLogo from "../../images/mainLogo.png";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <Row>
          <Col md={4}>
            <div className={styles.footer_logo}>
              {/* <h3><Link to={"/"} className={styles.footer_headTitle}>EasyJob</Link></h3> */}
              <img src={footerLogo} alt='footerLogo' width="100%" />
            </div>
            <div>
              <p>Employers and Recruiters, go to our <Link to={"/"} className={styles.footer_link}>RECRUITMENT SERVICES.</Link></p>
            </div>
            <div>
             <p>Take Look at <span><Link to={"/"} className={styles.footer_link}>Privacy & Policy</Link></span></p>
            </div>
          </Col>
          <Col md={4}>
            <div className={styles.footer_head}>
              <h4>Links</h4>
            </div>
            <div className={styles.links_Box}>
              <div>
                <Link to={"/"} className={styles.footer_link}>Blog</Link>  
                <Link to={"/"} className={styles.footer_link}>About Us</Link>
                <Link to={"/"} className={styles.footer_link}>Contact Us</Link>
                <Link to={"/"} className={styles.footer_link}>Jobs in Egypt</Link>
                <Link to={"/"} className={styles.footer_link}>Jobs in KSA</Link>
              </div>
              <div className='ms-5'>
                <Link to={"/"} className={styles.footer_link}>Blog</Link>
                <Link to={"/"} className={styles.footer_link}>About Us</Link>
                <Link to={"/"} className={styles.footer_link}>Contact Us</Link>
                <Link to={"/"} className={styles.footer_link}>Jobs in Egypt</Link>
                <Link to={"/"} className={styles.footer_link}>Jobs in KSA</Link>
              </div>
            </div>


          </Col>
          <Col md={4} >
            <div className={styles.footer_head}>
              <h4 className={styles.footer_headTitle}>Follow Us</h4>
            </div>
            <div className={styles.footer_icons}>
              <ContactsIcon type="one" />
            </div>
            <div>
              <p>© 2023 EasyJob. All Rights Reserved. Owned by <Link to={"/"} className={styles.footer_link}>EasyJob team.</Link></p>
            </div>
          </Col>
        </Row>
      </div>

    </footer>
  )
}

export default Footer
