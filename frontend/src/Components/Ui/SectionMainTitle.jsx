import React,{useEffect} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import styles from './SectionMainTitle.module.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const SectionMainTitle = ({title}) => {
  useEffect(()=>{
    AOS.init();
  },[])

  return (
  <div className="d-flex justify-content-center align-items-center flex-column mb-5" data-aos="fade-in" data-aos-duration="1000">
    <h3 className={styles.title}>
        {title}
    </h3>
        <FontAwesomeIcon icon={faCaretDown} className={styles.cartDown_icon} />
  </div>
  )
}

export default SectionMainTitle
