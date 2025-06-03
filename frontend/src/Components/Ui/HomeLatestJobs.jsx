import React from "react";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import JobPost from "./JobPost";
import MainButton from "./MainButton";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getLatestJobs } from "../../util/Http";
import LoadingPlaceholders from "./LoadingPlaceholders";
import SectionMainTitle from "./SectionMainTitle";

const HomeLatestJobs = () => {
  const { data, isFetching } = useQuery({
    queryKey: ["latestJobs"],
    queryFn: () => getLatestJobs("4"),
  });

  const navigate = useNavigate();

  const navigateToExplore = () => {
    navigate("/jobs");
  };

  return (
    <>
      {data ? (
        <section className="py-5 mb-5">
          <SectionMainTitle title="Latest Jobs" />
          <Container fluid="lg" className="pb-5">
            {isFetching ? (
              <>
                <Row className="gy-2">
                  <LoadingPlaceholders page="latestJobs" />
                </Row>
              </>
            ) : (
              <>
                <Row className="gy-2">
                  {data &&
                    data.data?.latestJobs.map((job) => (
                      <JobPost
                        key={job.id}
                        id={job.id}
                        jobTitle={job.title}
                        desc={job.description}
                        country={job.country}
                        city={job.city}
                        time={job.createdAt}
                        workplace={job.workplace}
                        type={job.type}
                        grid={true}
                      />
                    ))}
                </Row>
              </>
            )}

            <div className="text-center">
              <MainButton onClick={navigateToExplore} text="View All Listing" />
            </div>
          </Container>{" "}
        </section>
      ) : null}
    </>
  );
};

export default HomeLatestJobs;
