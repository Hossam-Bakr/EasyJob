import React,{useEffect, useState} from "react";
import styles from "./CountUp.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faBuilding,
  faUserTie,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CountUp  from 'react-countup';
import ScrollTrigger from 'react-scroll-trigger';
import { useSelector } from "react-redux";



const CountUpSection = () => {

  const [startCounter,setStartCounter]=useState(false);
  const [categoriesNum,setCategoriesNum]=useState(0);
  // const [companyNum,setCompanyNum]=useState(0);
  // const [usersNum,setUsersNum]=useState(0);
  // const [JobsNum,setJobsNum]=useState(0);

  const Categories=useSelector((state)=>state.category.categories)

  useEffect(()=>{
    if(Categories){
      setCategoriesNum(Categories.length)
    }
  },[Categories])
  
  // useEffect(()=>{
  //   if(Categories){
  //     setCategoriesNum(Categories.length)
  //   }
  // },[Categories])
  // useEffect(()=>{
  //   if(Categories){
  //     setCategoriesNum(Categories.length)
  //   }
  // },[Categories])

  return (
    <>  
    <ScrollTrigger onEnter={()=>setStartCounter(true)} onExit={()=>setStartCounter(false)}>
      <div className={styles.countUp_container}>
        <Row className="w-100">
          <Col  sm={6} md={3}>
            <div className="d-flex justify-content-between align-items-center p-4 flex-column">
              <FontAwesomeIcon icon={faUsers} className={styles.countUp_icon} />
              <h3>{startCounter&&<CountUp start={0} end={categoriesNum} duration={3} delay={0}/>}</h3>
              <p>Category</p>
            </div>
          </Col>
          <Col sm={6} md={3}>
            <div className="d-flex justify-content-between align-items-center p-4 flex-column">
              <FontAwesomeIcon
                icon={faBuilding}
                className={styles.countUp_icon}
              />
              <h3>{startCounter&&<CountUp start={0} end={217} duration={3} delay={0}/>}</h3>
              <p>Companies</p>
            </div>
          </Col>
          <Col sm={6} md={3}>
            <div className="d-flex justify-content-between align-items-center p-4 flex-column">
              <FontAwesomeIcon
                icon={faUserTie}
                className={styles.countUp_icon}
              />
              <h3>{startCounter&&<CountUp start={0} end={500} duration={3} delay={0}/>}</h3>
              <p>Employees</p>
            </div>
          </Col>
          <Col sm={6} md={3}>
            <div className="d-flex justify-content-between align-items-center p-4 flex-column">
              <FontAwesomeIcon
                icon={faBriefcase}
                className={styles.countUp_icon}
              />
              <h3>{startCounter&&<CountUp start={0} end={690} duration={3} delay={0}/>}</h3>
              <p>Jobs</p>
            </div>
          </Col>
        </Row>
      </div>
      </ScrollTrigger>

    </>
  );
};

export default CountUpSection;
