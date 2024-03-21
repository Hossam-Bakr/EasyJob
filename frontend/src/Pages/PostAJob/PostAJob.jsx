import styles from "./PostAJob.module.css";
import JobForm from "./JobForm";

function PostAJob() {



    return (
        <div className={styles.main_container}>
            <div>
                <h1 className={styles.mainHeader}>Post New <span>job.</span></h1>
            </div>
            <div className={styles.FormContainer}>
                <p className={styles.subHeader}>Job information</p>
                <JobForm />
            </div>

        </div>

    );
}

export default PostAJob;