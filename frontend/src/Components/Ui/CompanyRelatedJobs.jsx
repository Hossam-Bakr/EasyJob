import React from "react";
import styles from "./CompanyProfileSections.module.css";
import JobPost from "./JobPost";
import { useQuery } from "@tanstack/react-query";
import { getCompanyRelatedJobs } from "../../util/Http";
import Loading from "./Loading";
import NoDataBox from "./NoDataBox";

// const myJobs = [
//   {
//     key: 1,
//     name: "huwawei",
//     jobTitle: "Call Center",
//     req: " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enimlaudantium eaque harum expedita error autem soluta.",
//     logo: "L2",
//     type: "full-time",
//     workplace: "remote",
//     time: "5 min",
//     city: "Cairo",
//     country: "Egypt",
//   },
//   {
//     key: 2,
//     name: "Huwawei",
//     jobTitle: "Electrical Engineer",
//     req: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enimlaudantium eaque harum expedita error autem soluta.",
//     logo: "L2",
//     type: "full-time",
//     workplace: "remote",
//     city: "Cairo",
//     country: "Egypt",

//     time: "2 days",
//   },
//   {
//     key: 3,
//     name: "huwawei",
//     jobTitle: "Frontend React Developer",
//     req: " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enimlaudantium eaque harum expedita error autem soluta.",
//     logo: "L2",
//     type: "full-time",
//     workplace: "remote",
//     time: "5 months",
//     city: "Cairo",
//     country: "Egypt",
//   },
//   {
//     key: 4,
//     name: "huwawei",
//     jobTitle: "Financial Advisor",
//     req: " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enimlaudantium eaque harum expedita error autem soluta.",
//     logo: "L2",
//     workplace: "remote",
//     type: "full-time",
//     time: "2 years",
//     city: "Cairo",
//     country: "Egypt",
//   },
// ];

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
