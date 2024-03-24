import React, { useState } from "react";
import styles from "./Companies.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Accordion from "react-bootstrap/Accordion";
import FilterAccordion from "../../Components/Ui/FilterAccordion";
import SearchField from "../../Components/Ui/SearchField";
import CompanyPost from "./../../Components/Ui/CompanyPost";
import GridButtons from "../../Components/Ui/GridButtons";
import { useQuery } from "@tanstack/react-query";
import { getCompanies } from "../../util/Http";
import NoDataBox from "./../../Components/Ui/NoDataBox";
import LoadingPlaceholders from "../../Components/Ui/LoadingPlaceholders";

// const companiesPosts = [
//   {
//     key: 1,
//     name: "Saint-Gobain",
//     industry: "Manufacturing",
//     desc: " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enimlaudantium eaque harum expedita error autem soluta.",
//     logo: "L1",
//     country: "Egypt",
//     city: "Cairo",
//   },
//   {
//     key: 2,
//     name: "Huawei",
//     industry: "information and communications technology (ICT)",
//     desc: " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enimlaudantium eaque harum expedita error autem soluta.",
//     logo: "L2",
//     country: "Egypt",
//     city: "Cairo",
//   },
//   {
//     key: 3,
//     name: "Amazon",
//     industry: "E-commerce, Technology",
//     desc: " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enimlaudantium eaque harum expedita error autem soluta.",
//     logo: "L3",
//     country: "Egypt",
//     city: "Cairo",
//   },
//   {
//     key: 4,
//     name: "We",
//     industry: "Telecommunications",
//     desc: " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enimlaudantium eaque harum expedita error autem soluta.",
//     logo: "L4",
//     country: "Egypt",
//     city: "Cairo",
//   },
//   {
//     key: 5,
//     name: "Etisalat",
//     industry: "Telecommunications",
//     desc: " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enimlaudantium eaque harum expedita error autem soluta.",
//     logo: "L5",
//     country: "Egypt",
//     city: "Cairo",
//   },
//   {
//     key: 6,
//     name: "Etoile",
//     industry: "Food and Beverage Production",
//     desc: " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enimlaudantium eaque harum expedita error autem soluta.",
//     logo: "L6",
//     country: "Egypt",
//     city: "Cairo",
//   },
//   {
//     key: 7,
//     name: "B.Tech",
//     industry: "Retail Electronics",
//     desc: " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enimlaudantium eaque harum expedita error autem soluta.",
//     logo: "L7",
//     country: "Egypt",
//     city: "Cairo",
//   },
//   {
//     key: 8,
//     name: "Masary",
//     industry: "Financial Technology, Payment Solutions",
//     desc: " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enimlaudantium eaque harum expedita error autem soluta.",
//     logo: "L8",
//     country: "Egypt",
//     city: "Cairo",
//   },
//   {
//     key: 9,
//     name: "Raya",
//     industry: "Outsourcing/Offshoring",
//     desc: " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enimlaudantium eaque harum expedita error autem soluta.",
//     logo: "L9",
//     city: "Alex",
//     freelance: true,
//     full: true,
//     part: false,
//     remote: false,
//     time: "15 min",
//   },
//   {
//     key: 10,
//     name: "Vodafone",
//     industry: "Telecommunications",
//     desc: " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enimlaudantium eaque harum expedita error autem soluta.",
//     logo: "L10",
//     country: "Egypt",
//     city: "Cairo",
//   },
//   {
//     key: 11,
//     name: "Orange",
//     industry: "Telecommunications",
//     desc: " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enimlaudantium eaque harum expedita error autem soluta.",
//     logo: "L11",
//     country: "Egypt",
//     city: "Cairo",
//   },
//   {
//     key: 12,
//     name: "El-Araby",
//     industry: "Consumer Electronics",
//     desc: " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enimlaudantium eaque harum expedita error autem soluta.",
//     logo: "L12",
//     country: "Egypt",
//     city: "Cairo",
//   },
//   {
//     key: 13,
//     name: "Concentrix",
//     industry: "Consumer Sercive",
//     desc: " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enimlaudantium eaque harum expedita error autem soluta.",
//     logo: "L13",
//     country: "Egypt",
//     city: "Cairo",
//   },
//   {
//     key: 14,
//     name: "Talat Mostafa",
//     industry: "Real Estate, Property Development",
//     desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enimlaudantium eaque harum expedita error autem soluta.",
//     logo: "L14",
//     city: "Giza",
//     full: true,
//     remote: true,
//     part: false,
//     freelance: false,
//     time: "2 days",
//   },
//   {
//     key: 15,
//     name: "SAINT GOBAIN",
//     industry: "Information Technology and Services",
//     desc: " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enimlaudantium eaque harum expedita error autem soluta.",
//     logo: "L15",
//     country: "Egypt",
//     city: "Cairo",
//   },
// ];

const Companies = () => {
  const [gridView, setGridView] = useState(true); 

  let { data, isFetching } = useQuery({
    queryKey: ["companies"],
    queryFn: getCompanies,
  });

  const setGrid = () => {
    setGridView(true);
  };
  const setList = () => {
    setGridView(false);
  };

  return (
    <Container fluid className="mb-5">
      <Row>
        <Col sm={5} md={3} className={styles.aside_container}>
          <aside className={styles.job_filters}>
            <div className="d-flex align-items-center">
              <h2>Filters</h2>
            </div>
            <Accordion alwaysOpen defaultActiveKey={["0", "1", "2", "3", "4"]}>
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
                      <label htmlFor="industry_Engineering">Engineering</label>
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
              <FilterAccordion title="Filter by Company Size" eventKey="1">
                <ul className={styles.filter_list}>
                  <li className="d-flex justify-content-between">
                    <div>
                      <input
                        type="checkbox"
                        className={styles.checkbox_type}
                        id="size_All"
                        defaultChecked
                      />
                      <label htmlFor="size_All">All</label>
                    </div>
                  </li>
                  <li className="d-flex justify-content-between">
                    <div>
                      <input
                        type="checkbox"
                        className={styles.checkbox_type}
                        id="size_ 50"
                      />
                      <label htmlFor="size_ 50">{">"}50 employee</label>
                    </div>
                  </li>
                  <li className="d-flex justify-content-between">
                    <div>
                      <input
                        type="checkbox"
                        className={styles.checkbox_type}
                        id="size_200"
                      />
                      <label htmlFor="size_200">{">"}200 employee</label>
                    </div>
                  </li>
                  <li className="d-flex justify-content-between">
                    <div>
                      <input
                        type="checkbox"
                        className={styles.checkbox_type}
                        id="size_500"
                      />
                      <label htmlFor="size_500">{">"}500 employee</label>
                    </div>
                  </li>
                  <li className="d-flex justify-content-between">
                    <div>
                      <input
                        type="checkbox"
                        className={styles.checkbox_type}
                        id="size_1000"
                      />
                      <label htmlFor="size_1000">{">"}1000 employee</label>
                    </div>
                  </li>
                  <li className="d-flex justify-content-between">
                    <div>
                      <input
                        type="checkbox"
                        className={styles.checkbox_type}
                        id="size_2000"
                      />
                      <label htmlFor="size_2000">{">"}2000 employee</label>
                    </div>
                  </li>
                  <li className="d-flex justify-content-between">
                    <div>
                      <input
                        type="checkbox"
                        className={styles.checkbox_type}
                        id="size_more"
                      />
                      <label htmlFor="size_more">{">"}5000 employee</label>
                    </div>
                  </li>
                </ul>
                <div className="text-end">
                  <span className={styles.more}>show more</span>
                </div>
              </FilterAccordion>
              <FilterAccordion title="Filter by Country" eventKey="2">
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
              <FilterAccordion title="Filter by City" eventKey="3">
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
              <FilterAccordion title="Filter by Area" eventKey="4">
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
            </Accordion>
          </aside>
        </Col>
        <Col sm={7} md={9}>
          <section className={styles.job_posts}>
            <Container>
              <Row>
                <div className="d-flex justify-content-center align-items-center my-3 flex-wrap">
                  <h2>Companies</h2>
                  <SearchField />
                </div>

                <GridButtons setGrid={setGrid} setList={setList} />
                {isFetching ? (
                  <LoadingPlaceholders page="jobs" />
                ) : (
                  <>
                    {data ? (
                      <>
                        {data.data.data.map((company) => {
                          return (
                            <CompanyPost
                              key={company.id}
                              name={company.name}
                              industryId={company.IndustryId}
                              // desc={company.desc}
                              logo={company.CompanyProfile?.logo}
                              country={company.CompanyProfile?.country}
                              city={company.CompanyProfile?.city}
                              grid={gridView}
                            />
                          );
                        })}
                      </>
                    ) : (
                      <NoDataBox text="there is no companies for you, call suppport" />
                    )}
                  </>
                )}
              </Row>
            </Container>
            <div
              className={`${styles.pages} m-auto d-flex justify-content-evenly align-items-center mt-1 w-75 px-2`}
            >
              <div className={`${styles.page_arrow} ${styles.arrow_left}`}>
                <FontAwesomeIcon icon={faArrowLeft} />
              </div>
              <div className={styles.page_num}>
                <h5>1</h5>
              </div>
              <div className={styles.page_num}>
                <h5>2</h5>
              </div>
              <div className={styles.page_num}>
                <h5>3</h5>
              </div>
              <div className={styles.page_num}>
                <h5>4</h5>
              </div>
              <div className={styles.page_num}>
                <h5>5</h5>
              </div>

              <div className={`${styles.page_arrow} ${styles.arrow_right}`}>
                <FontAwesomeIcon icon={faArrowRight} />
              </div>
            </div>
          </section>
        </Col>
      </Row>
    </Container>
  );
};

export default Companies;
