import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./Posts.module.css";
import JobPost from "../../Components/Ui/JobPost";
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
import {
  Cities,
  careerLevel,
  experianceOptions,
  titleOptions,
} from "../../Components/logic/Logic";
import GoTopButton from "../../Components/Ui/GoTopButton";
import Select from "react-select";
import MainButton from "../../Components/Ui/MainButton";
import FloatingPopup from "../../Components/Ui/FloatingPopup";

const Posts = () => {
  const [gridView, setGridView] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [searchFilter, setSearchFilter] = useState("");
  const [countryFilteration, setCountryFilteration] = useState([]);
  const [cityFilteration, setCityFilteration] = useState([]);
  const [categoriesFilteration, setCategoriesFilteration] = useState("");
  const [jobTypeFilteration, setJobTypeFilteration] = useState([]);
  const [careerLevelFilteration, setCareerLevelFilteration] = useState([]);
  const [workPlaceFilteration, setWorkPlaceFilteration] = useState([]);
  const [minSalaryFilteration, setMinSalaryFilteration] = useState(0);
  const [maxSalaryFilteration, setmMaxSalaryFilteration] = useState(0);
  const [jobTitleFilteration, setmJobTitleFilteration] = useState("");
  const [showMoreCities, setShowMoreCities] = useState(false);
  const categories = useSelector((state) => state.category.categories);
  const outSideFilteration = useSelector((state) => state.filter.data);

  const [showResponse, setShowResponse] = useState(false);
  const [responseMessage, setResponseMessage] = useState({
    title: "",
    content: "",
  });
  const [successResponse, setSuccessResponse] = useState(true);

  const setGrid = () => {
    setGridView(true);
  };
  const setList = () => {
    setGridView(false);
  };

  const { data, isFetching, isError, refetch } = useQuery({
    queryKey: ["jobs"],
    queryFn: () =>
      getJobs({
        pageNum,
        searchFilter,
        countryFilteration,
        cityFilteration,
        categoriesFilteration,
        jobTypeFilteration,
        careerLevelFilteration,
        workPlaceFilteration,
        minSalaryFilteration,
        maxSalaryFilteration,
        jobTitleFilteration,
      }),
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

  useEffect(() => {
    refetch();
    window.scrollTo(0, 0);
  }, [
    pageNum,
    searchFilter,
    countryFilteration,
    cityFilteration,
    categoriesFilteration,
    jobTypeFilteration,
    careerLevelFilteration,
    workPlaceFilteration,
    jobTitleFilteration,
    refetch,
  ]);

  useEffect(() => {
    refetch();
  }, [minSalaryFilteration, maxSalaryFilteration, refetch]);

  useEffect(() => {
    if (outSideFilteration.value !== null) {
      switch (outSideFilteration.type) {
        case "city":
          setCityFilteration([outSideFilteration.value]);
          break;

        default:
          break;
      }
    }
  }, [outSideFilteration]);

  const filterOperations = (e, titleValue) => {
    if (e !== false) {
      const filterType = e.target.getAttribute("tag");
      const filterValue = e.target.value;
      switch (filterType) {
        case "country":
          const newCountry = countryFilteration.find(
            (country) => country === filterValue
          );
          if (!newCountry) {
            const updatedList = [...countryFilteration, filterValue];
            setCountryFilteration(updatedList);
          } else {
            const updatedFilterList = [...countryFilteration];
            const newList = updatedFilterList.filter(
              (country) => country !== newCountry
            );
            setCountryFilteration(newList);
          }
          break;

        case "city":
          const newCity = cityFilteration.find((city) => city === filterValue);
          if (!newCity) {
            const updatedList = [...cityFilteration, filterValue];
            setCityFilteration(updatedList);
          } else {
            const updatedFilterList = [...cityFilteration];
            const newList = updatedFilterList.filter(
              (city) => city !== newCity
            );
            setCityFilteration(newList);
          }
          break;

        case "category":
          const newCategory = categoriesFilteration.includes(filterValue);
          if (!newCategory) {
            let updatedString = "";
            let myCatFilter = categoriesFilteration;
            if (myCatFilter === "") {
              updatedString = `${filterValue}`;
            } else {
              updatedString = myCatFilter.concat(`,${filterValue}`);
            }
            setCategoriesFilteration(updatedString);
          } else {
            let myCatFilter = categoriesFilteration;
            const updatedFilterString = myCatFilter;
            let newString = updatedFilterString
              .replace(new RegExp(`(^|,)${filterValue}(,|$)`), "$1$2")
              .replace(/^,|,$/g, "");
            setCategoriesFilteration(newString);
          }
          break;

        case "type":
          const newType = jobTypeFilteration.find(
            (type) => type === filterValue
          );
          if (!newType) {
            const updatedList = [...jobTypeFilteration, filterValue];
            setJobTypeFilteration(updatedList);
          } else {
            const updatedFilterList = [...jobTypeFilteration];
            const newList = updatedFilterList.filter(
              (type) => type !== newType
            );
            setJobTypeFilteration(newList);
          }
          break;
        case "careerLevel":
          const newCareer = careerLevelFilteration.find(
            (career) => career === filterValue
          );
          if (!newCareer) {
            const updatedList = [...careerLevelFilteration, filterValue];
            setCareerLevelFilteration(updatedList);
          } else {
            const updatedFilterList = [...careerLevelFilteration];
            const newList = updatedFilterList.filter(
              (career) => career !== newCareer
            );
            setCareerLevelFilteration(newList);
          }
          break;

        case "minSalary":
          if (filterValue >= 0) {
            setMinSalaryFilteration(filterValue);
          } else {
            const updatedFilterList = minSalaryFilteration;
            setMinSalaryFilteration(updatedFilterList);
          }
          break;

        case "maxSalary":
          if (filterValue >= 0) {
            setmMaxSalaryFilteration(filterValue);
          } else {
            const updatedFilterList = maxSalaryFilteration;
            setmMaxSalaryFilteration(updatedFilterList);
          }
          break;

        case "workplace":
          const newPlace = workPlaceFilteration.find(
            (place) => place === filterValue
          );
          if (!newPlace) {
            const updatedList = [...workPlaceFilteration, filterValue];
            setWorkPlaceFilteration(updatedList);
          } else {
            const updatedFilterList = [...workPlaceFilteration];
            const newList = updatedFilterList.filter(
              (place) => place !== newPlace
            );
            setWorkPlaceFilteration(newList);
          }
          break;
        default:
          break;
      }
    } else {
      setmJobTitleFilteration(titleValue.value);
    }
  };

  const clearALLFilterations = () => {
    setCountryFilteration([]);
    setCityFilteration([]);
    setCategoriesFilteration("");
    setJobTypeFilteration([]);
    setCareerLevelFilteration([]);
    setMinSalaryFilteration(0);
    setmMaxSalaryFilteration(0);
    setWorkPlaceFilteration([]);
    setmJobTitleFilteration("");
    setSearchFilter("");
    document.getElementById("maxSalary").value = 0;
    document.getElementById("minSalary").value = 0;
  };

  const onSearch = (e, searchInput) => {
    e.preventDefault();
    setIsSearching(true);
    if (searchInput) {
      clearALLFilterations();
      setSearchFilter(searchInput);
    }
    setIsSearching(false);
  };

  return (
    <>
      {isError ? (
        <MainError />
      ) : (
        <Container fluid className="mb-5">
          <Row>
            <Col sm={6} md={4} lg={3} className={styles.aside_container}>
              <aside className={styles.job_filters}>
                <Accordion alwaysOpen defaultActiveKey={["0"]}>
                  <FilterAccordion title="Filter by Title" eventKey="0">
                    <Select
                      classNamePrefix="select"
                      placeholder="Search Title..."
                      isSearchable={true}
                      name="jobTitle"
                      options={titleOptions}
                      onChange={(value) =>
                        filterOperations(false, value, "title")
                      }
                    />
                  </FilterAccordion>
                  <FilterAccordion title="Filter by Country" eventKey="1">
                    <ul className={styles.filter_list}>
                      <li>
                        <div>
                          <input
                            type="checkbox"
                            className={styles.checkbox_type}
                            id="country_Egypt"
                            value="Egypt"
                            tag="country"
                            onChange={filterOperations}
                            checked={countryFilteration.includes("Egypt")}
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
                            value="KSA"
                            tag="country"
                            onChange={filterOperations}
                            checked={countryFilteration.includes("KSA")}
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
                            value="UAE"
                            tag="country"
                            onChange={filterOperations}
                            checked={countryFilteration.includes("UAE")}
                          />
                          <label htmlFor="UAE">UAE</label>
                        </div>
                      </li>
                      <li>
                        <div>
                          <input
                            type="checkbox"
                            className={styles.checkbox_type}
                            id="Kuwait"
                            value="Kuwait"
                            tag="country"
                            onChange={filterOperations}
                            checked={countryFilteration.includes("Kuwait")}
                          />
                          <label htmlFor="Kuwait">Kuwait</label>
                        </div>
                      </li>
                    </ul>
                  </FilterAccordion>
                  <FilterAccordion title="Filter by City" eventKey="2">
                    <ul className={styles.filter_list}>
                      <>
                        {Cities.EgyptCities.map((city) => (
                          <li
                            key={city}
                            className="d-flex justify-content-between"
                          >
                            <div>
                              <input
                                type="checkbox"
                                className={styles.checkbox_type}
                                id={`city_${city}`}
                                value={city}
                                tag="city"
                                onChange={filterOperations}
                                checked={cityFilteration.includes(city)}
                              />
                              <label htmlFor={`city_${city}`}>{city}</label>
                            </div>
                          </li>
                        ))}
                        {showMoreCities && (
                          <>
                            {Cities.UAECities.map((city) => (
                              <li
                                key={city}
                                className="d-flex justify-content-between"
                              >
                                <div>
                                  <input
                                    type="checkbox"
                                    className={styles.checkbox_type}
                                    id={`city_${city}`}
                                    value={city}
                                    tag="city"
                                    onChange={filterOperations}
                                    checked={cityFilteration.includes(city)}
                                  />
                                  <label htmlFor={`city_${city}`}>{city}</label>
                                </div>
                              </li>
                            ))}
                            {Cities.SaudiArabiaCities.map((city) => (
                              <li
                                key={city}
                                className="d-flex justify-content-between"
                              >
                                <div>
                                  <input
                                    type="checkbox"
                                    className={styles.checkbox_type}
                                    id={`city_${city}`}
                                    value={city}
                                    tag="city"
                                    onChange={filterOperations}
                                    checked={cityFilteration.includes(city)}
                                  />
                                  <label htmlFor={`city_${city}`}>{city}</label>
                                </div>
                              </li>
                            ))}
                            {Cities.KuwaitCities.map((city) => (
                              <li
                                key={city}
                                className="d-flex justify-content-between"
                              >
                                <div>
                                  <input
                                    type="checkbox"
                                    className={styles.checkbox_type}
                                    id={`city_${city}`}
                                    value={city}
                                    tag="city"
                                    onChange={filterOperations}
                                    checked={cityFilteration.includes(city)}
                                  />
                                  <label htmlFor={`city_${city}`}>{city}</label>
                                </div>
                              </li>
                            ))}
                          </>
                        )}
                      </>
                    </ul>
                    <div className="text-end">
                      <span
                        onClick={() => setShowMoreCities(!showMoreCities)}
                        className={styles.more}
                      >
                        {showMoreCities ? "show less" : "show all"}
                      </span>
                    </div>
                  </FilterAccordion>
                  <FilterAccordion title="Filter by Category" eventKey="3">
                    <ul className={styles.filter_list}>
                      <>
                        {categories?.map((category) => (
                          <li
                            key={category.id}
                            className="d-flex justify-content-between"
                          >
                            <div>
                              <input
                                type="checkbox"
                                className={styles.checkbox_type}
                                id={`category_${category.name}`}
                                value={category.name}
                                tag="category"
                                onChange={filterOperations}
                                checked={categoriesFilteration.includes(
                                  category.name
                                )}
                              />
                              <label htmlFor={`category_${category.name}`}>
                                {category.name}
                              </label>
                            </div>
                          </li>
                        ))}
                      </>
                    </ul>
                  </FilterAccordion>
                  <FilterAccordion title="Filter by Type" eventKey="4">
                    <ul className={styles.filter_list}>
                      {experianceOptions.map((type) => (
                        <li
                          key={type.value}
                          className="d-flex justify-content-between"
                        >
                          <div>
                            <input
                              type="checkbox"
                              className={styles.checkbox_type}
                              id={`type_${type.label}`}
                              value={type.value}
                              tag="type"
                              onChange={filterOperations}
                              checked={jobTypeFilteration.includes(type.value)}
                            />
                            <label htmlFor={`type_${type.label}`}>
                              {type.label}
                            </label>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </FilterAccordion>
                  <FilterAccordion title="Filter by Experience" eventKey="5">
                    <ul className={styles.filter_list}>
                      {careerLevel.map((career) => (
                        <li
                          key={career.value}
                          className="d-flex justify-content-between"
                        >
                          <div>
                            <input
                              type="checkbox"
                              className={styles.checkbox_type}
                              id={`careerLevel_${career.label}`}
                              value={career.value}
                              tag="careerLevel"
                              onChange={filterOperations}
                              checked={careerLevelFilteration.includes(
                                career.value
                              )}
                            />
                            <label htmlFor={`careerLevel_${career.label}`}>
                              {career.label}
                            </label>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="text-end">
                      <span className={styles.more}>show more</span>
                    </div>
                  </FilterAccordion>
                  <FilterAccordion title="Filter by workplace" eventKey="6">
                    <ul className={styles.filter_list}>
                      <li className="d-flex justify-content-between">
                        <div>
                          <input
                            type="checkbox"
                            className={styles.checkbox_type}
                            id="workplace_office"
                            value="office"
                            tag="workplace"
                            onChange={filterOperations}
                            checked={workPlaceFilteration.includes("office")}
                          />
                          <label htmlFor="workplace_office">On Site</label>
                        </div>
                      </li>
                      <li className="d-flex justify-content-between">
                        <div>
                          <input
                            type="checkbox"
                            className={styles.checkbox_type}
                            id="workplace_remote"
                            value="remote"
                            tag="workplace"
                            onChange={filterOperations}
                            checked={workPlaceFilteration.includes("remote")}
                          />
                          <label htmlFor="workplace_remote">Remotely</label>
                        </div>
                      </li>
                      <li className="d-flex justify-content-between">
                        <div>
                          <input
                            type="checkbox"
                            className={styles.checkbox_type}
                            id="workplace_hybrid"
                            value="hybrid"
                            tag="workplace"
                            onChange={filterOperations}
                            checked={workPlaceFilteration.includes("hybrid")}
                          />
                          <label htmlFor="workplace_hybrid">Hybrid</label>
                        </div>
                      </li>
                    </ul>
                  </FilterAccordion>
                  <FilterAccordion title="Filter by Salary" eventKey="7">
                    <div>
                      <label htmlFor="minSalary">Min Range</label>
                      <input
                        id="minSalary"
                        className={styles.salay_input}
                        type="number"
                        placeholder="Min salary"
                        tag="minSalary"
                        onChange={filterOperations}
                      />
                    </div>
                    <div>
                      <label htmlFor="maxSalary">Max Range</label>
                      <input
                        id="maxSalary"
                        className={styles.salay_input}
                        type="number"
                        placeholder="Max salary"
                        tag="maxSalary"
                        onChange={filterOperations}
                      />
                    </div>
                  </FilterAccordion>
                  <div className="mt-3 text-center">
                    <MainButton
                      onClick={clearALLFilterations}
                      text="Reset Filteration"
                    />
                  </div>
                </Accordion>
              </aside>
            </Col>
            <Col sm={6} md={8} lg={9}>
              <section className={styles.job_posts}>
                <Container>
                  <Row className="gy-3">
                    <div className="d-flex justify-content-center align-items-center my-3 flex-wrap">
                      <h2>Explore Jobs</h2>
                      <SearchField
                        onSearch={onSearch}
                        text="search title, description"
                        isSearching={isSearching}
                      />
                    </div>

                    <GridButtons
                      isJobs={true}
                      gridView={gridView}
                      setGrid={setGrid}
                      setList={setList}
                    />
                    {isFetching ? (
                      <>
                        <LoadingPlaceholders page="jobs" />
                      </>
                    ) : (
                      <>z
                        {data ? (
                          <>
                            {data?.data?.length !== 0 ? (
                              <>
                                {data?.data?.map((job) => {
                                  return (
                                    <JobPost
                                      key={job.id}
                                      name={job.Company.name}
                                      id={job.id}
                                      jobTitle={job.title}
                                      desc={job.description}
                                      logo={job.Company?.CompanyProfile?.logo}
                                      country={job.country}
                                      city={job.city}
                                      type={job.type}
                                      workplace={job.workplace}
                                      part={job.part}
                                      time={job.createdAt}
                                      maxSalary={job.salaryRangeMax}
                                      minSalary={job.salaryRangeMin}
                                      hideSalary={job.hideSalary}
                                      grid={gridView}
                                      setShowResponse={setShowResponse}
                                      setResponseMessage={setResponseMessage}
                                      setSuccessResponse={setSuccessResponse}
                                      refetch={refetch}
                                    />
                                  );
                                })}
                              </>
                            ) : (
                              <NoDataBox text="We cannot find what you are searching for please try again or call support" />
                            )}
                          </>
                        ) : (
                          <NoDataBox text="We cannot find what you are searching for please try again or call support" />
                        )}
                      </>
                    )}
                    <Pagination
                      setPageNum={setPageNum}
                      maxPageNum={data?.paginationResults?.numberOfPages}
                    />
                  </Row>
                </Container>
              </section>
            </Col>
          </Row>
          <GoTopButton />
        </Container>
      )}
      <FloatingPopup
        showResponse={showResponse}
        setShowResponse={setShowResponse}
        message={responseMessage}
        success={successResponse}
      />
    </>
  );
};

export default Posts;
