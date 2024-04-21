import React from 'react'
import styles from "./CompanyProfileSections.module.css";
import JobPost from './JobPost';
import MainBtnThree from './MainBtnThree';

const myJobs = [
    {
      key: 1,
      name: "huwawei",
      jobTitle: "Call Center",
      req: " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enimlaudantium eaque harum expedita error autem soluta.",
      logo: "L2",
      type: "full-time",
      workplace: "remote",
      time: "5 min",
      city:"Cairo",
      country:"Egypt"
    },
    {
      key: 2,
      name: "Huwawei",
      jobTitle: "Electrical Engineer",
      req: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enimlaudantium eaque harum expedita error autem soluta.",
      logo: "L2",
      type: "full-time",
      workplace: "remote",
      city:"Cairo",
      country:"Egypt",
     
      time: "2 days",
    },
    {
      key: 3,
      name: "huwawei",
      jobTitle: "Frontend React Developer",
      req: " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enimlaudantium eaque harum expedita error autem soluta.",
      logo: "L2",
      type: "full-time",
      workplace: "remote",
      time: "5 months",
      city:"Cairo",
      country:"Egypt"
    },
    {
      key: 4,
      name: "huwawei",
      jobTitle: "Financial Advisor",
      req: " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enimlaudantium eaque harum expedita error autem soluta.",
      logo: "L2",
      workplace: "remote",
      type: "full-time",
      time: "2 years",
      city:"Cairo",
      country:"Egypt"
    },
  ];

const CompanyRelatedJobs = ({isMyProfile}) => {
  return (
    <div className={`${styles.main_style} ${styles.job_section}`}>
          <h3 className={styles.sec_title}>Posted Jobs</h3>
          <div className="mt-4">
            {myJobs.map((job) => {
              return (
                <JobPost
                  key={job.key}
                  name={job.name}
                  jobTitle={job.jobTitle}
                  req={job.req}
                  logo={null}
                  type={job.type}
                  workplace={job.workplace}
                  time={job.time}
                  country={job.country}
                  city={job.city}
                  grid={false}
                  profile={true}
                  isMyProfile={isMyProfile}
                />
              );
            })}

            <div className="text-center">
              <MainBtnThree text="Load More" />
            </div>
          </div>
        </div>
  )
}

export default CompanyRelatedJobs
