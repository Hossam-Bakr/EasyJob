import React from "react";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import JobPost from "./JobPost";
import MainButton from "./MainButton";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getLatestJobs } from "../../util/Http";
import LoadingPlaceholders from "./LoadingPlaceholders";

const HomeLatestJobs = () => {
  const { data, isFetching } = useQuery({
    queryKey: ["latestJobs"],
    queryFn: () => getLatestJobs("5"),
  });

  const navigate = useNavigate();

  const navigateToExplore = () => {
    navigate("/jobs");
  };

  return (
    <Container fluid="lg" className="pb-5">
      {isFetching ? (
        <>
          <Row className="gy-2">
            <LoadingPlaceholders page="latestJobs"/>
          </Row>
        </>
      ) : (
        <>
          <Row className="gy-2">
            {data &&
              data.latestJobs.map((job) => (
                <JobPost
                  key={job.id}
                  id={job.id}
                    // name={job.Company.name}
                  jobTitle={job.title}
                  req={job.requirements}
                  // logo={job.Company?.CompanyProfile?.logo}
                  country={job.country}
                  city={job.city}
                  time={job.createdAt}
                  workplace={job.workplace}
                  type={job.type}
                  //   salaryRangeMax={job.salaryRangeMax}
                  grid={true}
                />
              ))}{" "}
          </Row>
        </>
      )}

      <div className="text-center">
        <MainButton onClick={navigateToExplore} text="View All Listing" />
      </div>
    </Container>
  );
};

export default HomeLatestJobs;
