import React, { useState, useEffect } from "react";
import styles from "./Candidates.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import FilterAccordion from "../../Components/Ui/FilterAccordion";

import CandidatePost from "../../Components/Ui/CandidatePost";
import { useDispatch, useSelector } from "react-redux";
import { companyActions } from "../../Store/companyNav-slice";
import SearchField from "../../Components/Ui/SearchField";
import GridButtons from "../../Components/Ui/GridButtons";
import Pagination from "../../Components/Ui/Pagination";
import { useQuery } from "@tanstack/react-query";
import { getCompanyCandidates } from "../../util/Http";
import NoDataBox from "../../Components/Ui/NoDataBox";
import LoadingPlaceholders from "../../Components/Ui/LoadingPlaceholders";
import LoadingTwo from "./../../Components/Ui/LoadingTwo";

const Candidates = () => {
  const [gridView, setGridView] = useState(true);
  const companyProfileData = JSON.parse(localStorage.getItem("userData"));
  const token = JSON.parse(localStorage.getItem("token"));

  const { data, isFetching } = useQuery({
    queryKey: ["candidates"],
    queryFn: () =>
      getCompanyCandidates({ id: companyProfileData.id, token: token }),
  });

  console.log("data", data);

  const setGrid = () => {
    setGridView(true);
  };
  const setList = () => {
    setGridView(false);
  };

  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.userInfo.isLogin);

  useEffect(() => {
    if (!isLogin) {
      dispatch(
        companyActions.changeNavState({
          changeCompany: false,
          changeNav: true,
        })
      );
      return () => {
        dispatch(
          companyActions.changeNavState({
            changeCompany: false,
            changeNav: false,
          })
        );
      };
    }
  }, [dispatch, isLogin]);

  return (
    <>
      <Container fluid className="mb-5">
        <Row className="g-0">
          <Col sm={4} xl={3} className={styles.aside_container}>
            <aside className={styles.job_filters}>
              <Accordion alwaysOpen defaultActiveKey={["0"]}>
                <FilterAccordion title="Filter by Industry" eventKey="0">
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
                        <label htmlFor="industry_Accounting">Accounting</label>
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
                    <li>
                      <div>
                        <input
                          type="checkbox"
                          className={styles.checkbox_type}
                          id="city_Cairo"
                        />
                        <label htmlFor="city_Cairo">Cairo</label>
                      </div>
                    </li>
                    <li>
                      <div>
                        <input
                          type="checkbox"
                          className={styles.checkbox_type}
                          id="city_Giza"
                        />
                        <label htmlFor="city_Giza">Giza</label>
                      </div>
                    </li>
                    <li>
                      <div>
                        <input
                          type="checkbox"
                          className={styles.checkbox_type}
                          id="city_Alex"
                        />
                        <label htmlFor="city_Alex">Alex</label>
                      </div>
                    </li>
                    <li>
                      <div>
                        <input
                          type="checkbox"
                          className={styles.checkbox_type}
                          id="city_Tanta"
                        />
                        <label htmlFor="city_Tanta">Tanta</label>
                      </div>
                    </li>
                    <li>
                      <div>
                        <input
                          type="checkbox"
                          className={styles.checkbox_type}
                          id="city_Mansoura"
                        />
                        <label htmlFor="city_Mansoura">Mansoura</label>
                      </div>
                    </li>
                    <li>
                      <div>
                        <input
                          type="checkbox"
                          className={styles.checkbox_type}
                          id="city_Menoufia"
                        />
                        <label htmlFor="city_Menoufia">Menoufia</label>
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
                <FilterAccordion title="Filter by Experience" eventKey="4">
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
                          id="experience_Student"
                        />
                        <label htmlFor="experience_Student">Student</label>
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
                    <li className="d-flex justify-content-between">
                      <div>
                        <input
                          type="checkbox"
                          className={styles.checkbox_type}
                          id="experience_Manager"
                        />
                        <label htmlFor="experience_Manager">Manager</label>
                      </div>
                    </li>
                  </ul>
                  <div className="text-end">
                    <span className={styles.more}>show more</span>
                  </div>
                </FilterAccordion>
                <FilterAccordion title="Filter by Education" eventKey="5">
                  <ul className={styles.filter_list}>
                    <li className="d-flex justify-content-between">
                      <div>
                        <input
                          type="checkbox"
                          className={styles.checkbox_type}
                          id="education_All"
                          defaultChecked
                        />
                        <label htmlFor="education_All">All</label>
                      </div>
                    </li>
                    <li className="d-flex justify-content-between">
                      <div>
                        <input
                          type="checkbox"
                          className={styles.checkbox_type}
                          id="education_Cairo"
                        />
                        <label htmlFor="education_Cairo">
                          Cairo University
                        </label>
                      </div>
                    </li>
                    <li className="d-flex justify-content-between">
                      <div>
                        <input
                          type="checkbox"
                          className={styles.checkbox_type}
                          id="education_Alex"
                        />
                        <label htmlFor="education_Alex">Alex University</label>
                      </div>
                    </li>
                    <li className="d-flex justify-content-between">
                      <div>
                        <input
                          type="checkbox"
                          className={styles.checkbox_type}
                          id="education_Ain_Shams"
                        />
                        <label htmlFor="education_Ain_Shams">
                          Ain Shams University
                        </label>
                      </div>
                    </li>
                    <li className="d-flex justify-content-between">
                      <div>
                        <input
                          type="checkbox"
                          className={styles.checkbox_type}
                          id="education_Helwan"
                        />
                        <label htmlFor="education_Helwan">
                          Helwan University
                        </label>
                      </div>
                    </li>
                    <li className="d-flex justify-content-between">
                      <div>
                        <input
                          type="checkbox"
                          className={styles.checkbox_type}
                          id="education_Al_Azhar"
                        />
                        <label htmlFor="education_Al_Azhar">
                          Al-Azhar University
                        </label>
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
          <Col sm={8} xl={9}>
            <section className={styles.job_posts}>
              <Container fluid>
                <Row>
                  <div className="d-flex justify-content-center align-items-center my-3 flex-wrap">
                    <h2>Recommended Candidates</h2>
                    <SearchField />
                  </div>

                  <GridButtons setGrid={setGrid} setList={setList} />
                  <>
                    {isFetching ? (
                      <LoadingPlaceholders page="jobs" />
                    ) : (
                      <>
                        {data ? (
                          <>
                            {data.data?.candidates.length !== 0 ? (
                              <>
                                {data.data?.candidates.map((candidate) => {
                                  return (
                                    <CandidatePost
                                      key={candidate.id}
                                      pic={candidate.pic}
                                      name={candidate.name}
                                      jobTitle={candidate.title}
                                      desc={candidate.description}
                                      city={candidate.city}
                                      level={candidate.level}
                                      degree={candidate.degree}
                                      age={candidate.age}
                                      available={candidate.available}
                                      full={candidate.full}
                                      remote={candidate.remote}
                                      part={candidate.part}
                                      department={candidate.department}
                                      grid={gridView}
                                    />
                                  );
                                })}
                              </>
                            ) : (
                              <NoDataBox text="there is no suggestion candidates for you contact support" />
                            )}
                          </>
                        ) : (
                          <LoadingTwo />
                        )}
                      </>
                    )}
                  </>
                </Row>
              </Container>
              <Pagination />
            </section>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Candidates;
