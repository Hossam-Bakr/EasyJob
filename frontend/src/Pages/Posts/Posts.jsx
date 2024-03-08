import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./Posts.module.css";
import JobPost from "../../Components/Ui/JobPost";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import Accordion from "react-bootstrap/Accordion";
import FilterAccordion from "../../Components/Ui/FilterAccordion";
import SearchField from "../../Components/Ui/SearchField";
import GridButtons from "../../Components/Ui/GridButtons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Pagination from "../../Components/Ui/Pagination";
import { useQuery } from "@tanstack/react-query";
import { getJobs } from "../../util/Http";
import PlacholderComponent from "../../Components/Ui/PlacholderComponent";
import MainError from "./../Error/MainError";

// const jobs = [
//   {
//     key: 1,
//     name: "LG",
//     jobTitle: "Call Center",
//     desc: " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enimlaudantium eaque harum expedita error autem soluta.",
//     logo: "L1",
//     country: "Egypt",
//     city: "Cairo",
//     full: true,
//     remote: true,
//     part: false,
//     freelance: false,
//     time: "Now",
//     salary: "100",
//   },
//   {
//     key: 2,
//     name: "Huwawei",
//     jobTitle: "Electrical Engineer",
//     desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enimlaudantium eaque harum expedita error autem soluta.",
//     logo: "L2",
//     country: "Egypt",
//     city: "Giza",
//     full: true,
//     remote: true,
//     part: false,
//     freelance: false,
//     time: "9 days",
//     salary: "120",
//   },
//   {
//     key: 3,
//     name: "Amazon",
//     jobTitle: "Frontend React Developer",
//     desc: " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enimlaudantium eaque harum expedita error autem soluta.",
//     logo: "L3",
//     country: "Egypt",
//     city: "Alex",
//     freelance: true,
//     full: true,
//     part: false,
//     remote: false,
//     time: "14 days",
//     salary: "confidential",
//   },
//   {
//     key: 4,
//     name: "We",
//     jobTitle: "Financial Advisor",
//     desc: " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enimlaudantium eaque harum expedita error autem soluta.",
//     logo: "L4",
//     country: "Egypt",
//     city: "Cairo",
//     part: true,
//     freelance: true,
//     remote: false,
//     full: false,
//     time: "5 min",
//     salary: "40",
//   },
//   {
//     key: 5,
//     name: "Etisalat",
//     jobTitle: "Node Js developer",
//     desc: " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enimlaudantium eaque harum expedita error autem soluta.",
//     logo: "L5",
//     country: "Egypt",
//     city: "Tanta",
//     full: true,
//     freelance: true,
//     remote: false,
//     part: false,
//     time: "15 min",
//     salary: "100",
//   },
//   {
//     key: 6,
//     name: "Etoile",
//     jobTitle: "GIS Technical Architect",
//     desc: " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enimlaudantium eaque harum expedita error autem soluta.",
//     logo: "L6",
//     country: "Egypt",
//     city: "Cairo",
//     part: true,
//     full: true,
//     freelance: false,
//     remote: false,
//     time: "15 min",
//     salary: "200",
//   },
//   {
//     key: 7,
//     name: "Msary",
//     jobTitle: "Call Center",
//     desc: " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enimlaudantium eaque harum expedita error autem soluta.",
//     logo: "L7",
//     country: "Egypt",
//     city: "Cairo",
//     full: true,
//     remote: true,
//     part: false,
//     freelance: false,
//     time: "12 min",
//     salary: "confidential",
//   },
//   {
//     key: 8,
//     name: "Raya",
//     jobTitle: "Electrical Engineer",
//     desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enimlaudantium eaque harum expedita error autem soluta.",
//     logo: "L8",
//     country: "Egypt",
//     city: "Giza",
//     full: true,
//     remote: true,
//     part: false,
//     freelance: false,
//     time: "1 month",
//     salary: "300",
//   },
//   {
//     key: 9,
//     name: "Vodafone",
//     jobTitle: "Frontend React Developer",
//     desc: " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enimlaudantium eaque harum expedita error autem soluta.",
//     logo: "L9",
//     country: "Egypt",
//     city: "Alex",
//     freelance: true,
//     full: true,
//     part: false,
//     remote: false,
//     time: "15 min",
//     salary: "confidential",
//   },
//   {
//     key: 10,
//     name: "Orange",
//     jobTitle: "Financial Advisor",
//     desc: " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enimlaudantium eaque harum expedita error autem soluta.",
//     logo: "L10",
//     country: "Egypt",
//     city: "Cairo",
//     part: true,
//     freelance: true,
//     remote: false,
//     full: false,
//     time: "6 min",
//     salary: "100",
//   },
//   {
//     key: 11,
//     name: "El-Araby",
//     jobTitle: "Node Js developer",
//     desc: " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enimlaudantium eaque harum expedita error autem soluta.",
//     logo: "L11",
//     country: "Egypt",
//     city: "Tanta",
//     full: true,
//     freelance: true,
//     remote: false,
//     part: false,
//     time: "1 h",
//     salary: "confidential",
//   },
//   {
//     key: 12,
//     name: "Concentrix",
//     jobTitle: "GIS Technical Architect",
//     desc: " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enimlaudantium eaque harum expedita error autem soluta.",
//     logo: "L12",
//     country: "Egypt",
//     city: "Cairo",
//     part: true,
//     full: true,
//     freelance: false,
//     remote: false,
//     time: "15 min",
//     salary: "confidential",
//   },
//   {
//     key: 13,
//     name: "Talat Mostafa",
//     jobTitle: "Call Center",
//     desc: " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enimlaudantium eaque harum expedita error autem soluta.",
//     logo: "L13",
//     country: "Egypt",
//     city: "Cairo",
//     full: true,
//     remote: true,
//     part: false,
//     freelance: false,
//     time: "15 min",
//     salary: "250",
//   },
//   {
//     key: 14,
//     name: "SAINT GOBAIN",
//     jobTitle: "Electrical Engineer",
//     desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enimlaudantium eaque harum expedita error autem soluta.",
//     logo: "L14",
//     country: "Egypt",
//     city: "Giza",
//     full: true,
//     remote: true,
//     part: false,
//     freelance: false,
//     time: "2 days",
//     salary: "380",
//   },
//   {
//     key: 15,
//     name: "Wadi Degla",
//     jobTitle: "Frontend React Developer",
//     desc: " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enimlaudantium eaque harum expedita error autem soluta.",
//     logo: "L15",
//     country: "Egypt",
//     city: "Alex",
//     freelance: true,
//     full: true,
//     part: false,
//     remote: false,
//     time: "11 days",
//     salary: "170",
//   },
// ];

const Posts = () => {
  const [gridView, setGridView] = useState(true);

  const setGrid = () => {
    setGridView(true);
  };
  const setList = () => {
    setGridView(false);
  };

  const { data, isFetching, isError } = useQuery({
    queryKey: ["jobs"],
    queryFn: () => getJobs({type: "" }),
  });

  const role = useSelector((state) => state.userInfo.role);
  const isLogin = useSelector((state) => state.userInfo.isLogin);

  const navigate = useNavigate();

  useEffect(() => {
    if (role === "company" && isLogin) {
      navigate("/candidates");
    }
    window.scrollTo(0, 0);
  }, [navigate, role, isLogin]);

  return (
    <>
      {isError ? (
        <MainError />
      ) : (
        <Container fluid className="mb-5">
          <Row>
            <Col sm={5} md={3} className={styles.aside_container}>
              <aside className={styles.job_filters}>
                <div className="d-flex align-items-center">
                  <FontAwesomeIcon
                    className={styles.filter_icon}
                    icon={faFilter}
                  />
                  <h2>Filters</h2>
                </div>
                <Accordion alwaysOpen defaultActiveKey={["0"]}>
                  <FilterAccordion title="Filter by Date" eventKey="0">
                    <ul className={styles.filter_list}>
                      <li>
                        <div>
                          <input
                            type="checkbox"
                            className={styles.checkbox_type}
                            id="date_all"
                            defaultChecked
                          />
                          <label htmlFor="date_all">All</label>
                        </div>
                      </li>
                      <li>
                        <div>
                          <input
                            type="checkbox"
                            className={styles.checkbox_type}
                            id="date_day"
                          />
                          <label htmlFor="date_day">Last day</label>
                        </div>
                      </li>
                      <li>
                        <div>
                          <input
                            type="checkbox"
                            className={styles.checkbox_type}
                            id="date_week"
                          />
                          <label htmlFor="date_week">Last week</label>
                        </div>
                      </li>
                      <li>
                        <div>
                          <input
                            type="checkbox"
                            className={styles.checkbox_type}
                            id="date_month"
                          />
                          <label htmlFor="date_month">last month</label>
                        </div>
                      </li>
                    </ul>
                    <div className="text-end">
                      <span className={styles.more}>show more</span>
                    </div>
                  </FilterAccordion>
                  <FilterAccordion title="Filter by Country" eventKey="1">
                    <ul className={styles.filter_list}>
                      <li>
                        <div>
                          <input
                            type="checkbox"
                            className={styles.checkbox_type}
                            id="country_all"
                          />
                          <label htmlFor="country_all">All</label>
                        </div>
                      </li>
                      <li>
                        <div>
                          <input
                            type="checkbox"
                            className={styles.checkbox_type}
                            id="country_Egypt"
                            defaultChecked
                          />
                          <label htmlFor="country_Egypt">Egypt</label>
                        </div>
                      </li>
                      <li>
                        <div>
                          <input
                            type="checkbox"
                            className={styles.checkbox_type}
                            id="country_Saudi"
                          />
                          <label htmlFor="country_Saudi">Saudi Arabia</label>
                        </div>
                      </li>
                      <li>
                        <div>
                          <input
                            type="checkbox"
                            className={styles.checkbox_type}
                            id="country_United_Arab_Emarates"
                          />
                          <label htmlFor="country_United_Arab_Emarates">
                            United Arab Emarates
                          </label>
                        </div>
                      </li>
                      <li>
                        <div>
                          <input
                            type="checkbox"
                            className={styles.checkbox_type}
                            id="country_America"
                          />
                          <label htmlFor="country_America">America</label>
                        </div>
                      </li>
                      <li>
                        <div>
                          <input
                            type="checkbox"
                            className={styles.checkbox_type}
                            id="country_Canada"
                          />
                          <label htmlFor="country_Canada">Canada</label>
                        </div>
                      </li>
                      <li>
                        <div>
                          <input
                            type="checkbox"
                            className={styles.checkbox_type}
                            id="country_United_Kingdom"
                          />
                          <label htmlFor="country_United_Kingdom">
                            United Kingdom
                          </label>
                        </div>
                      </li>
                    </ul>
                    <div className="text-end">
                      <span className={styles.more}>show more</span>
                    </div>
                  </FilterAccordion>
                  <FilterAccordion title="Filter by City" eventKey="2">
                    <ul className={styles.filter_list}>
                      <li>
                        <div>
                          <input
                            type="checkbox"
                            className={styles.checkbox_type}
                            id="city_all"
                            defaultChecked
                          />
                          <label htmlFor="city_all">All</label>
                        </div>
                      </li>
                      <li className="d-flex justify-content-between">
                        <div>
                          <input
                            type="checkbox"
                            className={styles.checkbox_type}
                            id="city_Cairo"
                          />
                          <label htmlFor="city_Cairo">Cairo</label>
                        </div>
                        <div className={styles.num_span_dev}>
                          <span className={styles.num_span}>240</span>
                        </div>
                      </li>
                      <li className="d-flex justify-content-between">
                        <div>
                          <input
                            type="checkbox"
                            className={styles.checkbox_type}
                            id="city_Giza"
                          />
                          <label htmlFor="city_Giza">Giza</label>
                        </div>
                        <div className={styles.num_span_dev}>
                          <span className={styles.num_span}>120</span>
                        </div>
                      </li>
                      <li className="d-flex justify-content-between">
                        <div>
                          <input
                            type="checkbox"
                            className={styles.checkbox_type}
                            id="city_Alex"
                          />
                          <label htmlFor="city_Alex">Alex</label>
                        </div>
                        <div className={styles.num_span_dev}>
                          <span className={styles.num_span}>100</span>
                        </div>
                      </li>
                      <li className="d-flex justify-content-between">
                        <div>
                          <input
                            type="checkbox"
                            className={styles.checkbox_type}
                            id="city_Tanta"
                          />
                          <label htmlFor="city_Tanta">Tanta</label>
                        </div>
                        <div className={styles.num_span_dev}>
                          <span className={styles.num_span}>5</span>
                        </div>
                      </li>
                      <li className="d-flex justify-content-between">
                        <div>
                          <input
                            type="checkbox"
                            className={styles.checkbox_type}
                            id="city_Mansoura"
                          />
                          <label htmlFor="city_Mansoura">Mansoura</label>
                        </div>
                        <div className={styles.num_span_dev}>
                          <span className={styles.num_span}>18</span>
                        </div>
                      </li>
                      <li className="d-flex justify-content-between">
                        <div>
                          <input
                            type="checkbox"
                            className={styles.checkbox_type}
                            id="city_Menoufia"
                          />
                          <label htmlFor="city_Menoufia">Menoufia</label>
                        </div>
                        <div className={styles.num_span_dev}>
                          <span className={styles.num_span}>22</span>
                        </div>
                      </li>
                    </ul>
                    <div className="text-end">
                      <span className={styles.more}>show more</span>
                    </div>
                  </FilterAccordion>
                  <FilterAccordion title="Filter by Area" eventKey="3">
                    <ul className={styles.filter_list}>
                      <li className="d-flex justify-content-between">
                        <div>
                          <input
                            type="checkbox"
                            className={styles.checkbox_type}
                            id="area_ All"
                            defaultChecked
                          />
                          <label htmlFor="area_ All"> All</label>
                        </div>
                      </li>
                      <li className="d-flex justify-content-between">
                        <div>
                          <input
                            type="checkbox"
                            className={styles.checkbox_type}
                            id="area_Maadi"
                          />
                          <label htmlFor="area_Maadi">Maadi</label>
                        </div>
                      </li>
                      <li className="d-flex justify-content-between">
                        <div>
                          <input
                            type="checkbox"
                            className={styles.checkbox_type}
                            id="area_NasrCity"
                          />
                          <label htmlFor="area_NasrCity">Nasr City</label>
                        </div>
                      </li>
                      <li className="d-flex justify-content-between">
                        <div>
                          <input
                            type="checkbox"
                            className={styles.checkbox_type}
                            id="area_NewCairo"
                          />
                          <label htmlFor="area_NewCairo">New Cairo</label>
                        </div>
                      </li>
                      <li className="d-flex justify-content-between">
                        <div>
                          <input
                            type="checkbox"
                            className={styles.checkbox_type}
                            id="area_6th_of_October"
                          />
                          <label htmlFor="area_6th_of_October">
                            6th of October
                          </label>
                        </div>
                      </li>
                      <li className="d-flex justify-content-between">
                        <div>
                          <input
                            type="checkbox"
                            className={styles.checkbox_type}
                            id="area_Giza"
                          />
                          <label htmlFor="area_Giza">Giza</label>
                        </div>
                      </li>
                    </ul>
                    <div className="text-end">
                      <span className={styles.more}>show more</span>
                    </div>
                  </FilterAccordion>
                  <FilterAccordion title="Filter by Industry" eventKey="4">
                    <ul className={styles.filter_list}>
                      <li className="d-flex justify-content-between">
                        <div>
                          <input
                            type="checkbox"
                            className={styles.checkbox_type}
                            id="industry_All"
                            defaultChecked
                          />
                          <label htmlFor="industry_All">All</label>
                        </div>
                      </li>
                      <li className="d-flex justify-content-between">
                        <div>
                          <input
                            type="checkbox"
                            className={styles.checkbox_type}
                            id="industry_ Frontend_Developer"
                          />
                          <label htmlFor="industry_ Frontend_Developer">
                            {" "}
                            Frontend Developer
                          </label>
                        </div>
                      </li>
                      <li className="d-flex justify-content-between">
                        <div>
                          <input
                            type="checkbox"
                            className={styles.checkbox_type}
                            id="industry_Backend_Developer"
                          />
                          <label htmlFor="industry_Backend_Developer">
                            Backend Developer
                          </label>
                        </div>
                      </li>
                      <li className="d-flex justify-content-between">
                        <div>
                          <input
                            type="checkbox"
                            className={styles.checkbox_type}
                            id="industry_Accounting"
                          />
                          <label htmlFor="industry_Accounting">
                            Accounting
                          </label>
                        </div>
                      </li>
                      <li className="d-flex justify-content-between">
                        <div>
                          <input
                            type="checkbox"
                            className={styles.checkbox_type}
                            id="industry_Engineering"
                          />
                          <label htmlFor="industry_Engineering">
                            Engineering
                          </label>
                        </div>
                      </li>
                      <li className="d-flex justify-content-between">
                        <div>
                          <input
                            type="checkbox"
                            className={styles.checkbox_type}
                            id="industry_Marketing"
                          />
                          <label htmlFor="industry_Marketing">Marketing</label>
                        </div>
                      </li>
                    </ul>
                    <div className="text-end">
                      <span className={styles.more}>show more</span>
                    </div>
                  </FilterAccordion>
                  <FilterAccordion title="Filter by Experience" eventKey="5">
                    <ul className={styles.filter_list}>
                      <li className="d-flex justify-content-between">
                        <div>
                          <input
                            type="checkbox"
                            className={styles.checkbox_type}
                            id="experience_All"
                            defaultChecked
                          />
                          <label htmlFor="experience_All">All</label>
                        </div>
                      </li>
                      <li className="d-flex justify-content-between">
                        <div>
                          <input
                            type="checkbox"
                            className={styles.checkbox_type}
                            id="experience_Fresher"
                          />
                          <label htmlFor="experience_Fresher">Fresher</label>
                        </div>
                      </li>
                      <li className="d-flex justify-content-between">
                        <div>
                          <input
                            type="checkbox"
                            className={styles.checkbox_type}
                            id="experience_Junior"
                          />
                          <label htmlFor="experience_Junior">Junior</label>
                        </div>
                      </li>
                      <li className="d-flex justify-content-between">
                        <div>
                          <input
                            type="checkbox"
                            className={styles.checkbox_type}
                            id="experience_Senior"
                          />
                          <label htmlFor="experience_Senior">Senior</label>
                        </div>
                      </li>
                    </ul>
                    <div className="text-end">
                      <span className={styles.more}>show more</span>
                    </div>
                  </FilterAccordion>
                  <FilterAccordion title="Filter by Salary" eventKey="6">
                    <ul className={styles.filter_list}>
                      <li>
                        <div>
                          <input
                            type="checkbox"
                            className={styles.checkbox_type}
                            id="date_all"
                            defaultChecked
                          />
                          <label htmlFor="date_all">All</label>
                        </div>
                      </li>
                      <li>
                        <div>
                          <input
                            type="checkbox"
                            className={styles.checkbox_type}
                            id="salary_7000"
                          />
                          <label htmlFor="salary_7000">less than 7000</label>
                        </div>
                      </li>
                      <li>
                        <div>
                          <input
                            type="checkbox"
                            className={styles.checkbox_type}
                            id="salary_10000"
                          />
                          <label htmlFor="salary_10000">less than 10000</label>
                        </div>
                      </li>
                      <li>
                        <div>
                          <input
                            type="checkbox"
                            className={styles.checkbox_type}
                            id="salary_15000"
                          />
                          <label htmlFor="salary_15000">less than 15000</label>
                        </div>
                      </li>
                    </ul>
                    <div className="text-end">
                      <span className={styles.more}>show more</span>
                    </div>
                  </FilterAccordion>
                </Accordion>
              </aside>
            </Col>
            <Col sm={7} md={9}>
              <section className={styles.job_posts}>
                <Container>
                  <Row className="gy-3">
                    <div className="d-flex justify-content-center align-items-center my-3 flex-wrap">
                      <h2>Recommended Jobs</h2>
                      <SearchField />
                    </div>

                    <GridButtons setGrid={setGrid} setList={setList} />
                    {isFetching ? (
                      <>
                        <Col lg={6} xl={4}>
                          <PlacholderComponent />
                        </Col>
                        <Col lg={6} xl={4}>
                          <PlacholderComponent />
                        </Col>
                        <Col lg={6} xl={4}>
                          <PlacholderComponent />
                        </Col>
                        <Col lg={6} xl={4}>
                          <PlacholderComponent />
                        </Col>
                        <Col lg={6} xl={4}>
                          <PlacholderComponent />
                        </Col>
                        <Col lg={6} xl={4}>
                          <PlacholderComponent />
                        </Col>
                        <Col lg={6} xl={4}>
                          <PlacholderComponent />
                        </Col>
                        <Col lg={6} xl={4}>
                          <PlacholderComponent />
                        </Col>
                        <Col lg={6} xl={4}>
                          <PlacholderComponent />
                        </Col>
                      </>
                    ) : (
                      <>
                        {data.data.map((job) => {
                          return (
                            <JobPost
                              key={job.id}
                              // name={job.name}
                              id={job.id}
                              jobTitle={job.title}
                              req={job.requirements}
                              logo={job.logo}
                              country={job.country}
                              city={job.city}
                              type={job.type}
                              workplace={job.workplace}
                              part={job.part}
                              time={job.createdAt}
                              maxSalary={job.salaryRangeMin}
                              // minSalary={job.salaryRangeMax}
                              hideSalary={job.hideSalary}
                              grid={gridView}
                            />
                          );
                        })}
                      </>
                    )}
                    {/* {jobs.map((job) => {
                  return (
                    <JobPost
                      key={job.key}
                      name={job.name}
                      jobTitle={job.jobTitle}
                      desc={job.desc}
                      logo={job.logo}
                      country={job.country}
                      city={job.city}
                      full={job.full}
                      remote={job.remote}
                      part={job.part}
                      freelance={job.freelance}
                      time={job.time}
                      salary={job.salary}
                      grid={gridView}
                    />
                  );
                })} */}
                    <Pagination />
                  </Row>
                </Container>
              </section>
            </Col>
          </Row>
        </Container>  
      )}
    </>
  );
};

export default Posts;
