import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./Posts.module.css";
import JobPost from "../../Components/Ui/JobPost";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faSearch } from "@fortawesome/free-solid-svg-icons";
import Accordion from 'react-bootstrap/Accordion';
import FilterAccordion from "../../Components/Ui/FilterAccordion";

const Posts = () => {
  return (
    <Container fluid>
      <Row>
        <Col sm={3}>
          <aside className={styles.job_filters}>
            <div className='d-flex align-items-center'>
             <FontAwesomeIcon className={styles.filter_icon} icon={faFilter}/>
              <h2>Filters</h2>
            </div>
            <Accordion alwaysOpen  defaultActiveKey={['0']}>
              <FilterAccordion title='Filter by Date' eventKey="0">
                <ul className={styles.filter_list}>
                  <li>All</li>
                  <li>last 24h</li>
                  <li>last 3 days</li>
                  <li>last month</li>
                </ul>
                <div className="text-end">
                 <span className={styles.more}>show more</span>
                </div>
              </FilterAccordion>
              <FilterAccordion title='Filter by City' eventKey="1">
                <ul className={styles.filter_list}>
                  <li>All</li>
                  <li>Cairo <span className={styles.num_span}>(240)</span></li>
                  <li>Giza <span className={styles.num_span}>(120)</span></li>
                  <li>Alex <span className={styles.num_span}>(100)</span></li>
                  <li>Tanta <span className={styles.num_span}>(5)</span></li>
                  <li>Mansoura <span className={styles.num_span}>(18)</span></li>
                  <li>Menoufia <span className={styles.num_span}>(22)</span></li>
                </ul>
                      <div className="text-end">
                 <span className={styles.more}>show more</span>
                </div>
              </FilterAccordion>
              <FilterAccordion title='Filter by Area' eventKey="2">
                <ul className={styles.filter_list}>
                  <li>All</li>
                  <li>Maadi</li>
                  <li>Nasr City</li>
                  <li>New Cairo</li>
                  <li>Giza</li>
                  <li> 6th of October</li>
                </ul>
                      <div className="text-end">
                 <span className={styles.more}>show more</span>
                </div>
              </FilterAccordion>
              <FilterAccordion title='Filter by Industry' eventKey="3">
                <ul className={styles.filter_list}>
                  <li>All</li>
                  <li>Frontend Developer</li>
                  <li>Backend Developer</li>
                  <li>Accounting</li>
                  <li>Engineering</li>
                  <li>Marketing</li>
                </ul>
                      <div className="text-end">
                 <span className={styles.more}>show more</span>
                </div>
              </FilterAccordion>
              <FilterAccordion title='Filter by Experience' eventKey="4">
                <ul className={styles.filter_list}>
                  <li>All</li>
                  <li>Fresh graduated</li>
                  <li>1 year of experiance</li>
                  <li>3 years of experiance</li>
                  <li>7 years of experiance</li>
                </ul>
                      <div className="text-end">
                 <span className={styles.more}>show more</span>
                </div>
              </FilterAccordion>
            </Accordion>
          </aside>
        </Col>
        <Col sm={9}>
          <section className={styles.job_posts}>
            <Container>
              <Row>
                <div className="d-flex justify-content-between align-items-center my-3">
                  <h2>Recommended Jobs</h2>
                  <div className={`${styles.subscribe_container}`}>
                  <input type="text" placeholder="Search here.." />
                  <FontAwesomeIcon className={styles.search_icon} icon={faSearch} />
                </div>
                </div>
                <JobPost
                  name="Yata"
                  jobTitle="Nuclear Power Engineer"
                  desc=" Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim
                  laudantium eaque harum expedita error autem soluta."
                  logo="L1"
                  city="Cairo"
                />

                <JobPost
                  name="Blognation"
                  jobTitle="Technical Writer"
                  desc=" Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim
                  laudantium eaque harum expedita error autem soluta."
                  logo="L2"
                  city="Giza"
                />

                <JobPost
                  name="Mynte"
                  jobTitle="Frontend React Developer"
                  desc=" Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim
                  laudantium eaque harum expedita error autem soluta."
                  logo="L3"
                  city="Alex"
                />

                <JobPost
                  name="Voonder"
                  jobTitle="Financial Advisor"
                  desc=" Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim
                  laudantium eaque harum expedita error autem soluta."
                  logo="L4"
                  city="Cairo"
                />

                <JobPost
                  name="Abata"
                  jobTitle="Node Js| php developer"
                  desc=" Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim
                  laudantium eaque harum expedita error autem soluta."
                  logo="L5"
                  city="Tanta"
                />
                <JobPost
                  name="Abata"
                  jobTitle="Node Js| php developer"
                  desc=" Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim
                  laudantium eaque harum expedita error autem soluta."
                  logo="L5"
                  city="Tanta"
                />
                <JobPost
                  name="Linktype"
                  jobTitle="GIS Technical Architect"
                  desc=" Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim
                  laudantium eaque harum expedita error autem soluta."
                  logo="L6"
                  city="Cairo"
                />

                <JobPost
                  name="Yata"
                  jobTitle="Nuclear Power Engineer"
                  desc=" Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim
                  laudantium eaque harum expedita error autem soluta."
                  logo="L1"
                  city="Cairo"
                />

                <JobPost
                  name="Blognation"
                  jobTitle="Technical Writer"
                  desc=" Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim
                  laudantium eaque harum expedita error autem soluta."
                  logo="L2"
                  city="Giza"
                />

                <JobPost
                  name="Mynte"
                  jobTitle="Frontend React Developer"
                  desc=" Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim
                  laudantium eaque harum expedita error autem soluta."
                  logo="L3"
                  city="Alex"
                />

                <JobPost
                  name="Voonder"
                  jobTitle="Financial Advisor"
                  desc=" Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim
                  laudantium eaque harum expedita error autem soluta."
                  logo="L4"
                  city="Cairo"
                />

                <JobPost
                  name="Abata"
                  jobTitle="Node Js| php developer"
                  desc=" Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim
                  laudantium eaque harum expedita error autem soluta."
                  logo="L5"
                  city="Tanta"
                />
                <JobPost
                  name="Abata"
                  jobTitle="Node Js| php developer"
                  desc=" Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim
                  laudantium eaque harum expedita error autem soluta."
                  logo="L5"
                  city="Tanta"
                />
                <JobPost
                  name="Linktype"
                  jobTitle="GIS Technical Architect"
                  desc=" Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim
                  laudantium eaque harum expedita error autem soluta."
                  logo="L6"
                  city="Cairo"
                />
              </Row>
            </Container>
          </section>
        </Col>
      </Row>
    </Container>
  );
};

export default Posts;
