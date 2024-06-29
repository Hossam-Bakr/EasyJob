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
import { AreasOptions, Cities, careerLevel, experianceOptions, languagesOptions, titleOptions, yearsOptions } from "../../Components/logic/Logic";
import Select from "react-select";
import MainButton from "../../Components/Ui/MainButton";
import { useNavigate } from "react-router-dom";

const Candidates = () => {

  const [gridView, setGridView] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [searchFilter, setSearchFilter] = useState("");
  const [countryFilteration, setCountryFilteration] = useState([]);
  const [cityFilteration, setCityFilteration] = useState([]);
  const [areaFilteration, setAreaFilteration] = useState([]);
  const [categoriesFilteration, setCategoriesFilteration] = useState("");
  const [jobTypeFilteration, setJobTypeFilteration] = useState([]);
  const [languageFilteration, setLanguageFilteration] = useState([]);
  const [careerLevelFilteration, setCareerLevelFilteration] = useState([]);
  const [jobTitleFilteration, setJobTitleFilteration] = useState("");
  const [minYearsOfExpFilteration, setMinYearsOfExpFilteration] = useState("");
  const [isOpenToWork, setisOpenToWork] = useState(false);
  const [hasDrivingLicense, setHasDrivingLicense] = useState(false);
  const [showMoreCities, setShowMoreCities] = useState(false);
  const categories = useSelector((state) => state.category.categories);
  // const outSideFilteration = useSelector((state) => state.filter.data);

  const companyData = JSON.parse(localStorage.getItem("userData"));
  const token = JSON.parse(localStorage.getItem("token"));
  const role = useSelector((state) => state.userInfo.role);

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["candidates"],
    enabled:false,
    queryFn: () =>
      getCompanyCandidates({
        id:companyData.id,
        token,
        pageNum,
        searchFilter,
        countryFilteration,
        cityFilteration,
        areaFilteration,
        categoriesFilteration,
        jobTypeFilteration,
        languageFilteration,
        careerLevelFilteration,
        jobTitleFilteration,  
        hasDrivingLicense,
        isOpenToWork,
        minYearsOfExpFilteration,
      }),
  });

  const setGrid = () => {
    setGridView(true);
  };
  const setList = () => {
    setGridView(false);
  };

  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.userInfo.isLogin);
  const navigate=useNavigate();

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
  
  useEffect(()=>{
    if(role==="admin"){
      navigate("/super")
    }
  },[role,navigate])


  const filterOperations = (e, selectValue,selectType) => {
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

        case "area":
          const newArea = areaFilteration.find((area) => area === filterValue);
          if (!newArea) {
            const updatedList = [...areaFilteration, filterValue];
            setAreaFilteration(updatedList);
          } else {
            const updatedFilterList = [...areaFilteration];
            const newList = updatedFilterList.filter(
              (area) => area !== newArea
            );
            setAreaFilteration(newList);
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

        default:
          break;
      }
    } else {
      if(selectType==="language"){
        setLanguageFilteration(selectValue)
      }else if(selectType==="exp"){
        setMinYearsOfExpFilteration(selectValue.value)
      }
      else{
        setJobTitleFilteration(selectValue.value);
      }
    }
  };

  const clearALLFilterations = () => {
    setCountryFilteration([]);
    setCityFilteration([]);
    setAreaFilteration([]);
    setCategoriesFilteration("");
    setJobTypeFilteration([]);
    setCareerLevelFilteration([]);
    setJobTitleFilteration("");
    setMinYearsOfExpFilteration("")
    setLanguageFilteration([])
    setisOpenToWork(false)
    setHasDrivingLicense(false)
    setSearchFilter("");
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

  useEffect(() => {
    refetch();
    window.scrollTo(0, 0);
  }, [
    pageNum,
    searchFilter,
    countryFilteration,
    cityFilteration,
    areaFilteration,
    categoriesFilteration,
    jobTypeFilteration,
    careerLevelFilteration,
    jobTitleFilteration,
    languageFilteration,
    hasDrivingLicense,
    isOpenToWork,
    minYearsOfExpFilteration,
    refetch,
  ]);

  useEffect(() => {
    refetch();
  }, [
    languageFilteration,
    refetch,
  ]);

  return (
    <>
      <Container fluid className="mb-5">
        <Row className="g-0">
          <Col sm={4} xl={3} className={styles.aside_container}>
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
                      {Cities.EgyptCities.map((city,index) => (
                        <li
                          key={`${city}_${index}`}
                          className="d-flex justify-content-between"
                        >
                          <div>
                            <input
                              type="checkbox"
                              className={styles.checkbox_type}
                              id={`city_${city}_${index}`}
                              value={city}
                              tag="city"
                              onChange={filterOperations}
                              checked={cityFilteration.includes(city)}
                            />
                            <label htmlFor={`city_${city}_${index}`}>{city}</label>
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
                <FilterAccordion title="Filter by Area" eventKey="3">
                  <ul className={styles.filter_list}>
                    <>
                      {AreasOptions.map((area,index) => (
                        <li
                          key={`${area}_${index}`}
                          className="d-flex justify-content-between"
                        >
                          <div>
                            <input
                              type="checkbox"
                              className={styles.checkbox_type}
                              id={`area_${area}_${index}`}
                              value={area}
                              tag="area"
                              onChange={filterOperations}
                              checked={areaFilteration.includes(area)}
                            />
                            <label htmlFor={`area_${area}_${index}`}>{area}</label>
                          </div>
                        </li>
                      ))}
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
                <FilterAccordion title="Filter by Category" eventKey="4">
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
                <FilterAccordion title="Filter by Type" eventKey="5">
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
                <FilterAccordion title="Filter by CareerLevel" eventKey="6">
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
                <FilterAccordion title="Min Years of Experience" eventKey="7">
                  <Select
                    classNamePrefix="select"
                    placeholder="minimum years of Experience"
                    isSearchable={true}
                    name="yearsOfExp"
                    options={yearsOptions}
                    onChange={(value) =>
                      filterOperations(false, value, "exp")
                    }
                  />
                </FilterAccordion>
                <FilterAccordion title="Filter by Language" eventKey="8">
                  <Select
                    classNamePrefix="select"
                    placeholder="Search Language..."
                    isSearchable={true}
                    name="language"
                    isMulti={true}
                    options={languagesOptions}
                    onChange={(value) =>
                      filterOperations(false, value, "language")
                    }
                  />
                </FilterAccordion>
                <FilterAccordion  title="Other Filterations"  eventKey="9">
                  <ul className={styles.filter_list}>
                      <li
                        className="d-flex justify-content-between"
                      >
                        <div>
                          <input
                            type="checkbox"
                            className={styles.checkbox_type}
                            id="openToWork"
                            tag="openToWork"
                            onChange={()=>setisOpenToWork(!isOpenToWork)}
                            checked={isOpenToWork}
                          />
                          <label htmlFor="openToWork">
                            Only Open To work
                          </label>
                        </div>
                      </li>
                      <li
                        className="d-flex justify-content-between"
                      >
                        <div>
                          <input
                            type="checkbox"
                            className={styles.checkbox_type}
                            id="drivingLicense"
                            tag="drivingLicense"
                            onChange={()=>setHasDrivingLicense(!hasDrivingLicense)}
                            checked={hasDrivingLicense}
                          />
                          <label htmlFor="drivingLicense">
                            Driving License
                          </label>
                        </div>
                      </li>
                
                  </ul>
                  <div className="text-end">
                    <span className={styles.more}>show more</span>
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
          <Col sm={8} xl={9}>
            <section className={styles.job_posts}>
              <Container fluid>
                <Row>
                  <div className="d-flex justify-content-center align-items-center my-3 flex-wrap">
                    <h2>Recommended Candidates</h2>
                    <SearchField
                        onSearch={onSearch}
                        text="search title, description"
                        isSearching={isSearching}
                      />
                  </div>

                  <GridButtons
                    gridView={gridView}
                    setGrid={setGrid}
                    setList={setList}
                  />
                  <>
                    {isFetching ? (
                      <LoadingPlaceholders page="jobs" />
                    ) : (
                      <>
                        {data ? (
                          <>
                            {data.candidates.length !== 0 ? (
                              <>
                                {data.candidates?.map((candidate) => {
                                  return (
                                    <CandidatePost
                                      key={candidate.user?.id}
                                      id={candidate.user?.id}
                                      avatar={candidate.userProfile?.avatar}
                                      name={`${candidate.user?.firstName} ${candidate.user?.lastName}`}
                                      desc={candidate.userProfile?.about}
                                      city={candidate.userProfile?.city}
                                      country={candidate.userProfile?.country}
                                      openToWork={
                                        candidate.userProfile?.openToWork
                                      }
                                      tagline={candidate.userProfile?.tagline}
                                      jobTitles={
                                        candidate.userProfile?.jobTitles
                                      }
                                      jobTypes={candidate.userProfile?.jobTypes}
                                      birthDate={
                                        candidate.userProfile?.birthDate
                                      }
                                      currentCareerLevel={
                                        candidate.userProfile
                                          ?.currentCareerLevel
                                      }
                                      grid={gridView}
                                    />
                                  );
                                })}
                              </>
                            ) : (
                              <NoDataBox
                                text="there is no suggestion candidates right now, for more details contact support"
                                path={"/contact"}
                              />
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
              <Pagination
                setPageNum={setPageNum}
                maxPageNum={data?.paginationResults?.numberOfPages}
              />
            </section>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Candidates;
