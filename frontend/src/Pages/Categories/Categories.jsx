import React from "react";
import styles from "./Categories.module.css";
import { useQuery } from "@tanstack/react-query";
import { getIndustries } from "../../util/Http";
import LoadingTwo from "./../../Components/Ui/LoadingTwo";
import SearchField from "./../../Components/Ui/SearchField";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";

const Categories = () => {
  const { data, isPending } = useQuery({
    queryKey: ["categories"],
    queryFn: ({ signal }) => getIndustries({ signal, type: "" }),
  });

  return (
    <>
      {isPending ? (
        <LoadingTwo />
      ) : (
        <Container fluid className={`${styles.category_container} my-5`}>
          <div className="d-flex justify-content-between align-items-center mb-5 px-2">
            <h4>
              All Industries{" "}
              <span className="badge text-bg-secondary">
                {data.data.data.length}
              </span>
            </h4>
            <SearchField />
          </div>
          <Row>
            <Col sm={3}>
              <div className={styles.filter_indusrty}>
                <h4>filter by Indusry</h4>
                <ul>
                  {data.data.data.map((industry) => (
                    <li key={industry.id} className={styles.industry_list_item}>
                      <FontAwesomeIcon icon={faCaretRight} className="special_main_color me-3"/>{industry.name}
                    </li>
                  ))}
                </ul>
              </div>
            </Col>
            <Col sm={9}>
              {data.data.data.map((industry) => (
                <div className="mb-5" key={industry.id}>
                  <h3 className={styles.industry_name}>{industry.name}</h3>
                  <Row className={`${styles.categories_list} gy-3`}>
                    {industry.Categories.map((category) => (
                      <Col sm={6} md={4} lg={3}>
                        <div className={styles.category_item}>
                          {category.name}
                        </div>
                      </Col>
                    ))}
                  </Row>
                </div>
              ))}
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default Categories;

// , isFetching, refetch
