import React from "react";
import styles from "./CompanyProfileSections.module.css";
import JobPost from "./JobPost";
import { useQuery } from "@tanstack/react-query";
import { getCompanyRelatedJobs } from "../../util/Http";
import Loading from "./Loading";
import NoDataBox from "./NoDataBox";

const CompanyRelatedJobs = ({ isMyProfile, id }) => {
  const { data } = useQuery({
    queryKey: ["relatedJobs"],
    queryFn: () => getCompanyRelatedJobs({ id }),
  });
  
  return (
    <>
      {data ? (
        <div className={`${styles.main_style} ${styles.job_section}`}>
          <>
            {data.data?.length !== 0 ? (
              <>
                <h3 className={styles.sec_title}>Posted Jobs</h3>
                <div className="mt-4">
                  {data.data?.map((job) => {
                    return (
                      <JobPost
                        key={job.id}
                        id={job.id}
                        name={job.Company?.name}
                        jobTitle={job.jobTitle}
                        req={job.requirements}
                        logo={job.Company?.CompanyProfile?.logo}
                        type={job.type}
                        workplace={job.workplace}
                        time={job.updatedAt}
                        country={job.country}
                        city={job.city}
                        grid={false}
                        profile={true}
                        isMyProfile={isMyProfile}
                      />
                    );
                  })}
                </div>
              </>
            ) : (
              <NoDataBox text="there is no posted jobs right now" />
            )}
          </>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default CompanyRelatedJobs;
