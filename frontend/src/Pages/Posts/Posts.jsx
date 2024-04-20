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
import MainError from "./../Error/MainError";
import LoadingPlaceholders from "../../Components/Ui/LoadingPlaceholders";
import NoDataBox from "./../../Components/Ui/NoDataBox";

const Posts = () => {
  const [gridView, setGridView] = useState(true);
  const [pageNum, setPageNum] = useState(1); 
  // const token = JSON.parse(localStorage.getItem("token"));

  const setGrid = () => {
    setGridView(true);
  };
  const setList = () => {
    setGridView(false);
  };

  const { data, isFetching, isError,refetch } = useQuery({
    queryKey: ["jobs"],
    queryFn:()=> getJobs({pageNum}),
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

useEffect(()=>{
  refetch()
  window.scrollTo(0,0)
},[pageNum,refetch])


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
                            id="KSA"
                          />
                          <label htmlFor="KSA">KSA</label>
                        </div>
                      </li>
                      <li>
                        <div>
                          <input
                            type="checkbox"
                            className={styles.checkbox_type}
                            id="UAE"
                          />
                          <label htmlFor="UAE">
                            UAE
                          </label>
                        </div>
                      </li>
                      <li>
                        <div>
                          <input
                            type="checkbox"
                            className={styles.checkbox_type}
                            id="Kuwait"
                          />
                          <label htmlFor="Kuwait">Kuwait</label>
                        </div>
                      </li>
                    </ul>
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
                        <LoadingPlaceholders page="jobs" />
                      </>
                    ) : (
                      <>
                        {data ? (
                          <>
                          {data.data?.length!==0? <>
                          {data.data?.map((job) => {
                              return (
                                <JobPost
                                  key={job.id}
                                  name={job.Company.name}
                                  id={job.id}
                                  jobTitle={job.title}
                                  req={job.requirements}
                                  logo={job.Company?.CompanyProfile?.logo}
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
                            })}</>:
                            <NoDataBox text="sorry there isn't recommended jobs right now contact us"/>
                            }
                           
                          </>
                        ) : (
                          <NoDataBox text="sorry there isn't recommended jobs right now contact us"/>
                        )}
                      </>
                    )}
                  <Pagination setPageNum={setPageNum} maxPageNum={data?.paginationResults?.numberOfPages}/>
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
