import React from "react";
import styles from "./Categories.module.css";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../util/Http";
import LoadingTwo from './../../Components/Ui/LoadingTwo';
import SearchField from './../../Components/Ui/SearchField';
import Container  from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Categories = () => {
  const { data, isPending } = useQuery({
    queryKey: ["categories"],
    queryFn: ({ signal }) => getCategories({ signal,type:'' }),
  });

  return (
    <Container className="my-5">
      {isPending&&<LoadingTwo/>}
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h2>All Categories {data&&<span className={styles.number_categories}>{data.data.data.length}</span>}</h2>
       <SearchField/>
      </div>
      {data && (
        <Row className={styles.categories_list}>
          {data.data.data.map((category) => (
            <Col md={2} className={styles.category_item} key={category.id}>{category.name}</Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Categories;

// , isFetching, refetch