import React, {useEffect, useState } from "react";
import styles from "./Categories.module.css";
import { useQuery } from "@tanstack/react-query";
import { getIndustries } from "../../util/Http";
import SearchField from "./../../Components/Ui/SearchField";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import NoDataBox from "./../../Components/Ui/NoDataBox";
import Pagination from "../../Components/Ui/Pagination";
import PlacholderComponent from "../../Components/Ui/PlacholderComponent";
import LoadingPlaceholders from "../../Components/Ui/LoadingPlaceholders";

const Categories = () => {
  const [activeLink, setActiveLink] = useState(0);
  const [filteredData, setFilteredData] = useState([]);
  const [isDataFiltered, setIsDataFiltered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNum, setPageNum] = useState(1); 

  const { data, isPending,refetch } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      getIndustries({type: "",pageNum }),
  });

  const { data:industryList } = useQuery({
    queryKey: ["industries"],
    queryFn: () =>
      getIndustries({type: "",method:"industryList" }),
  });

  const filterResult = (linkID) => {
    if (linkID === 0) {
      setIsDataFiltered(false);
      setIsLoading(false);
      return;
    }
    if (industryList) {
      window.scrollTo(0, 0);
      const filteredData = industryList.data.data.filter(
        (industry) => industry.id === linkID
      );
      setIsDataFiltered(true);
      setFilteredData(filteredData);
      setIsLoading(false);
    }
  };
  const chooseActiveLink = (linkID) => {
    setIsLoading(true);
    setActiveLink(linkID);
    filterResult(linkID);
  };

  useEffect(()=>{
    refetch()
    window.scrollTo(0,0)
  },[pageNum,refetch])

  return (
    <>
      {isPending ? (
        <>
          <LoadingPlaceholders page="category"/>
        </>
      ) : (
        <>
          {data ? (
            <Container fluid className={`${styles.category_container} my-5`}>
              <div className="d-flex justify-content-between align-items-center mb-5 px-2">
                <h4>
                  ALL INDUSTRIES{" "}
                  <span className="badge text-bg-secondary">
                    {industryList.data.data.length}
                  </span>
                </h4>
                <SearchField />
              </div>
              <Row>
                <Col sm={3}>
                  <div className={styles.filter_indusrty}>
                    <h4>filter by Indusry</h4>
                    <ul>
                      <li
                        className={`${styles.industry_list_item} ${
                          activeLink === 0 ? styles.active_link : ""
                        }`}
                        onClick={() => chooseActiveLink(0)}
                      >
                        <FontAwesomeIcon
                          icon={faLayerGroup}
                          className="special_main_color me-3"
                        />
                        ALL Industries
                      </li>
                      {industryList.data.data.map((industry) => (
                        <li
                          key={industry.id}
                          className={`${styles.industry_list_item} ${
                            activeLink === industry.id ? styles.active_link : ""
                          }`}
                          onClick={() => chooseActiveLink(industry.id)}
                        >
                          <FontAwesomeIcon
                            icon={faLayerGroup}
                            className="special_main_color me-3"
                          />
                          {industry.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Col>
                <Col sm={9}>
                  <>
                    {!isLoading ? (
                      <>
                        {isDataFiltered ? (
                          <>
                            {filteredData.map((industry) => (
                              <div className="mb-5" key={industry.id}>
                                <h3 className={styles.industry_name}>
                                  {industry.name}
                                </h3>
                                <Row
                                  className={`${styles.categories_list} gy-3`}
                                >
                                  {industry.Categories.length === 0 ? (
                                    <div
                                      className={`${styles.noCat} alert alert-warning`}
                                    >
                                      <span>
                                        No Categories Related to that Industry
                                        yet !
                                      </span>
                                    </div>
                                  ) : (
                                    <>
                                      {industry.Categories.map((category) => (
                                        <Col sm={6} md={4} key={category.id}>
                                          <div className={styles.category_item}>
                                            <FontAwesomeIcon
                                              icon={faCaretRight}
                                              className="special_main_color me-3"
                                            />
                                            {category.name}
                                          </div>
                                        </Col>
                                      ))}
                                    </>
                                  )}
                                </Row>
                              </div>
                            ))}
                          </>
                        ) : (
                          <>
                            {data.data.data.map((industry) => (
                              <div className="mb-5" key={industry.id}>
                                <h3 className={styles.industry_name}>
                                  {industry.name}
                                </h3>
                                <Row
                                  className={`${styles.categories_list} gy-3`}
                                >
                                  {industry.Categories.length === 0 ? (
                                    <div
                                      className={`${styles.noCat} alert alert-warning`}
                                    >
                                      <span>
                                        No Categories related to that Industry
                                        yet !
                                      </span>
                                    </div>
                                  ) : (
                                    <>
                                      {industry.Categories.map((category) => (
                                        <Col sm={6} md={4} key={category.id}>
                                          <div className={styles.category_item}>
                                            <FontAwesomeIcon
                                              icon={faCaretRight}
                                              className="special_main_color me-3"
                                            />
                                            {category.name}
                                          </div>
                                        </Col>
                                      ))}
                                    </>
                                  )}
                                </Row>
                              </div>
                            ))}
                          <Pagination setPageNum={setPageNum} maxPageNum={data?.data?.paginationResults?.numberOfPages}/>
                          </>
                        )}
                      </>
                    ) : (
                      <Row>
                        <Col sm={12}>
                          <PlacholderComponent
                            type="p"
                            mySize="lg"
                            myWidth="50%"
                            myAnimation="glow"
                          />
                        </Col>
                        <Col sm={6} md={3}>
                          <PlacholderComponent
                            type="p"
                            mySize="md"
                            myWidth="100%"
                          />
                        </Col>
                        <Col sm={6} md={3}>
                          <PlacholderComponent
                            type="p"
                            mySize="md"
                            myWidth="100%"
                          />
                        </Col>
                        <Col sm={6} md={3}>
                          <PlacholderComponent
                            type="p"
                            mySize="md"
                            myWidth="100%"
                          />
                        </Col>
                        <Col sm={6} md={3}>
                          <PlacholderComponent
                            type="p"
                            mySize="md"
                            myWidth="100%"
                          />
                        </Col>
                        <Col sm={6} md={3}>
                          <PlacholderComponent
                            type="p"
                            mySize="md"
                            myWidth="100%"
                          />
                        </Col>
                        <Col sm={6} md={3}>
                          <PlacholderComponent
                            type="p"
                            mySize="md"
                            myWidth="100%"
                          />
                        </Col>
                      </Row>
                    )}
                  </>
                </Col>
              </Row>
            </Container>
          ) : (
            <NoDataBox text="sorry ! No categories available now" />
          )}
        </>
      )}
    </>
  );
};

export default Categories;

// , isFetching, refetch
