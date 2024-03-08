import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import JobPost from "./JobPost";
import MainButton from "./MainButton";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getLatestJobs } from "../../util/Http";
import PlacholderComponent from "./PlacholderComponent";

const HomeLatestJobs = () => {
  const { data, isFetching } = useQuery({
    queryKey: ["latestJobs"],
    queryFn: () => getLatestJobs({ num: "4" }),
  });

  const navigate = useNavigate();

  const navigateToExplore = () => {
    navigate("/jobs");
  };

  return (
    <Container fluid="lg" className="pb-5">
      <Row>
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
            {data &&
              data.latestJobs.map((job) => (
                <JobPost
                  key={job.id}
                  id={job.id}
                  //   name={job.name}
                  jobTitle={job.title}
                  req={job.requirements}
                  logo={job.logo}
                  country={job.country}
                  city={job.city}
                  time={job.createdAt}
                  workplace={job.workplace}
                  type={job.type}
                  //   salaryRangeMax={job.salaryRangeMax}
                  grid={true}
                />
              ))}
          </>
        )}
      </Row>
      <div className="text-center">
        <MainButton onClick={navigateToExplore} text="View All Listing" />
      </div>
    </Container>
  );
};

export default HomeLatestJobs;
