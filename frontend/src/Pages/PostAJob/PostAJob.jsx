import styles from "./PostAJob.module.css";
import JobForm from "./JobForm";
import { useEffect } from "react";
import AOS from "aos";

function PostAJob() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className={styles.main_container}>
      <div className={styles.headerBox}>
        <h1 className={styles.mainHeader}>
          Post New <span>Job.</span>
        </h1>
      </div>
      <div
        data-aos="zoom-in-up"
        data-aos-duration="800"
        className={styles.FormContainer}
      >
        <JobForm />
      </div>
    </div>
  );
}

export default PostAJob;
