import React, { useEffect, useState } from "react";
import styles from "./CompanyProfileSections.module.css";
import JobPost from "./JobPost";
import { useQuery } from "@tanstack/react-query";
import { getCompanyRelatedJobs } from "../../util/Http";
import Loading from "./Loading";
import NoDataBox from "./NoDataBox";
import FloatingPopup from "./FloatingPopup";

const CompanyRelatedJobs = ({ isMyProfile, id }) => {
  const [showResponse, setShowResponse] = useState(false);
  const [responseMessage, setResponseMessage] = useState({
    title: "",
    content: "",
  });
  const [successResponse, setSuccessResponse] = useState(true);

  const { data, refetch } = useQuery({
    queryKey: ["relatedJobs"],
    queryFn: () => getCompanyRelatedJobs({ id }),
  });

  useEffect(()=>{
    window.scrollTo(0 ,0)
  },[])

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
                        desc={job.description}
                        logo={job.Company?.CompanyProfile?.logo}
                        type={job.type}
                        workplace={job.workplace}
                        time={job.updatedAt}
                        country={job.country}
                        city={job.city}
                        grid={false}
                        profile={true}
                        isMyProfile={isMyProfile}
                        refetch={refetch}
                        setShowResponse={setShowResponse}
                        setResponseMessage={setResponseMessage}
                        setSuccessResponse={setSuccessResponse}
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

      <FloatingPopup
        showResponse={showResponse}
        setShowResponse={setShowResponse}
        message={responseMessage}
        success={successResponse}
      />
    </>
  );
};

export default CompanyRelatedJobs;
