import React, { useEffect, useState } from "react";
import styles from "./Companies.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import FilterAccordion from "../../Components/Ui/FilterAccordion";
import SearchField from "../../Components/Ui/SearchField";
import CompanyPost from "./../../Components/Ui/CompanyPost";
import GridButtons from "../../Components/Ui/GridButtons";
import { useQuery } from "@tanstack/react-query";
import { getCompanies } from "../../util/Http";
import NoDataBox from "./../../Components/Ui/NoDataBox";
import LoadingPlaceholders from "../../Components/Ui/LoadingPlaceholders";
import Pagination from "../../Components/Ui/Pagination";
import Select from "react-select";
import { useSelector } from "react-redux";
import { Cities, sizeOptions } from "../../Components/logic/Logic";
import GoTopButton from "../../Components/Ui/GoTopButton";
import MainButton from "../../Components/Ui/MainButton";

const Companies = () => {
  const [gridView, setGridView] = useState(true);
  const [pageNum, setPageNum] = useState(1);
  const [indusryFilteration, setIndustryFilteration] = useState(null);
  const [countryFilteration, setCountryFilteration] = useState([]);
  const [cityFilteration, setCityFilteration] = useState([]);
  const [sizeFilteration, setSizeFilteration] = useState([]);

  const [industryOptions, setIndustryOptions] = useState(null);
  const [showMoreCities, setShowMoreCities] = useState(false);

  const [isSearching, setIsSearching] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");

  const currentIndustries = useSelector((state) => state.category.industries);

  let { data, isFetching, refetch } = useQuery({
    queryKey: ["companies"],
    queryFn: () =>
      getCompanies({
        searchFilter,
        pageNum,
        indusryFilteration,
        countryFilteration,
        cityFilteration,
        sizeFilteration,
      }),
  });

  const setGrid = () => {
    setGridView(true);
  };
  const setList = () => {
    setGridView(false);
  };

  const filterOperations = (e, value, tag) => {
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
          };
          break;
        case "city":
          const newCity = cityFilteration.find((city) => city === filterValue);
          if (!newCity) {
            const updatedList = [...cityFilteration, filterValue];
            setCityFilteration(updatedList);
          } else {
            const updatedFilterList = [...cityFilteration];
            const newList = updatedFilterList.filter((city) => city !== newCity);
            setCityFilteration(newList);
          }
          break;
        case "size":
          const newSize = sizeFilteration.find((size) => size === filterValue);
          if (!newSize) {
            const updatedList = [...sizeFilteration, filterValue];
            setSizeFilteration(updatedList);
          } else {
            const updatedFilterList = [...sizeFilteration];
            const newList = updatedFilterList.filter((size) => size !== newSize);
            setSizeFilteration(newList);
          }
          break;
        default:
          break;
      }
    } else {
      if (tag === "industry") {
        setIndustryFilteration(value.value);
      }
    }

  };

  const clearALLFilterations = () => {
    setIndustryFilteration(null);
    setCountryFilteration([]);
    setCityFilteration([]);
    setSizeFilteration([]);
    setSearchFilter("")
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
    if (currentIndustries) {
      let industryOptions = currentIndustries.map((indust) => ({
        value: indust.id,
        label: indust.name,
      }));
      setIndustryOptions(industryOptions);
    }
  }, [currentIndustries]);

  useEffect(() => {
    refetch();
    window.scrollTo(0, 0);
  }, [
    searchFilter,
    pageNum,
    indusryFilteration,
    countryFilteration,
    cityFilteration,
    sizeFilteration,
    refetch,
  ]);

  return (
    <Container fluid className="mb-5">
      <Row>
        <Col sm={6} md={4} lg={3} className={styles.aside_container}>
          <aside className={styles.job_filters}>
            <div className="d-flex align-items-center">
              <h2>Filters</h2>
            </div>
            <Accordion alwaysOpen defaultActiveKey={["0"]}>
              <FilterAccordion title="Filter by Industry" eventKey="0">
                <Select
                  classNamePrefix="select"
                  placeholder="Search by Industry"
                  isSearchable={true}
                  name="industry"
                  options={industryOptions}
                  onChange={(value) =>
                    filterOperations(false, value, "industry")
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
                      />
                      <label htmlFor="Kuwait">Kuwait</label>
                    </div>
                  </li>
                </ul>
                <div className="text-end">
                  <span className={styles.more}>show more</span>
                </div>
              </FilterAccordion>
              <FilterAccordion title="Filter by City" eventKey="2">
                <ul className={styles.filter_list}>
                  <>
                    {Cities.EgyptCities.map((city) => (
                      <li key={city} className="d-flex justify-content-between">
                        <div>
                          <input
                            type="checkbox"
                            className={styles.checkbox_type}
                            id={`city_${city}`}
                            value={city}
                            tag="city"
                            onChange={filterOperations}
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
              <FilterAccordion title="Filter by Company Size" eventKey="3">
                <ul className={styles.filter_list}>
                  {sizeOptions.map((size) => (
                    <li
                      key={size.value}
                      className="d-flex justify-content-between"
                    >
                      <div>
                        <input
                          type="checkbox"
                          className={styles.checkbox_type}
                          id={`size_${size.label}`}
                          value={size.value}
                          tag="size"
                          onChange={filterOperations}
                        />
                        <label htmlFor={`size_${size.label}`}>
                          {size.label}
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
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
              <Row>
                <div className="d-flex justify-content-center align-items-center my-3 flex-wrap">
                  <h2>Companies</h2>
                  <SearchField
                    onSearch={onSearch}
                    text="search name, Info"
                    isSearching={isSearching}
                  />
                </div>

                <GridButtons setGrid={setGrid} setList={setList} />
                {isFetching ? (
                  <LoadingPlaceholders page="jobs" />
                ) : (
                  <>
                    {data ? (
                      <>
                        {data.data?.data?.length !== 0 ? (
                          <>
                            {" "}
                            {data.data?.data?.map((company) => {
                              return (
                                <CompanyPost
                                  key={company.id}
                                  CompanyProfileId={company.CompanyProfile?.id}
                                  companyId={company.id}
                                  name={company.name}
                                  industryId={company.IndustryId}
                                  desc={company.CompanyProfile?.description}
                                  logo={company.CompanyProfile?.logo}
                                  country={company.CompanyProfile?.country}
                                  city={company.CompanyProfile?.city}
                                  grid={gridView}
                                />
                              );
                            })}
                          </>
                        ) : (
                          <NoDataBox text="there is no companies for you right now, call suppport" />
                        )}
                      </>
                    ) : (
                      <NoDataBox text="there is no companies for you right now, call suppport" />
                    )}
                  </>
                )}
              </Row>
            </Container>
            <Pagination
              setPageNum={setPageNum}
              maxPageNum={data?.data?.paginationResults?.numberOfPages}
            />
          </section>
        </Col>
      </Row>
      <GoTopButton />
    </Container>
  );
};

export default Companies;
