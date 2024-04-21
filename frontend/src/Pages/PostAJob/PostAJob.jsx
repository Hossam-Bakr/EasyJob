import styles from "./PostAJob.module.css";
import JobForm from "./JobForm";

function PostAJob() {



    return (
        <div className={styles.main_container}>
            <div className={styles.headerBox}>
                <h1 className={styles.mainHeader}>Post New <span>Job.</span></h1>
            </div>
            <div className={styles.FormContainer}>
                <p className={styles.subHeader}>Job Details</p>
                <JobForm />
            </div>

        </div>

    );
}

export default PostAJob;