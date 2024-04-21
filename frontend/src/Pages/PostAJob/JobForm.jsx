import styles from "./JobForm.module.css"
import { Field, Form, Formik } from "formik";
import MultiSelect from "../../Components/logic/SelectField";
import Select from "react-select";
import { countryOptions, yearsOfExpr } from './../../Components/logic/Logic';
import TextArea from "../../Components/TextArea/TextArea";

const JobForm = () => {

    return (
        <Formik
            initialValues={{
                jobType: "",
                Workplace: "",
                careerLevel: "",
                hideSalary: "",
            }}
            // onSubmit={onSubmit}
            // validationSchema={validationSchema}
            enableReinitialize
        >
            <Form className={styles.general_info_form}>

                <div className={styles.field}>
                    <label htmlFor="jobTitle">Job Title -</label>
                    <Field
                        id="jobTitle"
                        type="text"
                        className={styles.disabled_faild}
                        // value={currentJobTitle}
                        value=''
                        placeholder="Write The Job Title"
                    />
                </div>

                <div className={styles.field}>
                    <label htmlFor="jobCategory">Job Category -</label>
                    <Field
                        id="jobCategory"
                        isMulti={true}
                        component={MultiSelect}
                        placeholder="Select at least one job Category"
                    // options={myCategories}
                    />
                </div>

                <div className={styles.field}>
                    <label>Job Type -</label>
                    <div role="group" aria-labelledby="checkbox-group" className={styles.checkbox_group}>
                        <div className={styles.check_Box}>
                            <label htmlFor="fulltime">Full Time</label>
                            <Field type="radio" name="jobType" value="fulltime" id="fulltime" />
                        </div>
                        <div className={styles.check_Box}>
                            <label htmlFor="parttime">Part Time</label>
                            <Field type="radio" name="jobType" value="parttime" id="parttime" />
                        </div>
                        <div className={styles.check_Box}>
                            <label htmlFor="freelance-project">Freelance / Project</label>
                            <Field type="radio" name="jobType" value="freelance-project" id="freelance-project" />
                        </div>
                        <div className={styles.check_Box}>
                            <label htmlFor="shiftbased">Shift Based</label>
                            <Field type="radio" name="jobType" value="shiftbased" id="shiftbased" />
                        </div>
                        <div className={styles.check_Box}>
                            <label htmlFor="volunteering">Volunteering</label>
                            <Field type="radio" name="jobType" value="volunteering" id="volunteering" />
                        </div>
                    </div>
                </div>

                <div className={styles.field}>
                    <label>Workplace -</label>
                    <div role="group" aria-labelledby="checkbox-group" className={styles.checkbox_group}>
                        <div className={styles.check_Box}>
                            <label htmlFor="onSite">On-Site</label>
                            <input type="radio" name="Workplace" value="onSite" id="onSite" />
                        </div>
                        <div className={styles.check_Box}>
                            <label htmlFor="parttime">Remote</label>
                            <input type="radio" name="Workplace" value="parttime" id="parttime" />
                        </div>
                        <div className={styles.check_Box}>
                            <label htmlFor="freelance-project">Hybrid</label>
                            <input type="radio" name="Workplace" value="freelance-project" id="freelance-project" />
                        </div>
                    </div>
                </div>

                <div className={styles.field}>
                    <label htmlFor="location">Company Location -</label>
                    <div className={styles.collection}>
                        <div className={styles.field}>
                            <label htmlFor="country">Country</label>
                            <Select
                                type="text"
                                placeholder="Egypt"
                                id="city"
                                options={countryOptions}
                            />
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="companyCity">City</label>
                            <Select
                                type="text"
                                placeholder="Cairo"
                                id="companyCity"
                            // options={Cities}
                            />
                        </div>
                    </div>
                </div>

                <hr></hr>

                <div className={styles.field}>
                    <label>Career Level -</label>
                    <div role="group" aria-labelledby="checkbox-group" className={styles.checkbox_group}>
                        <div className={styles.check_Box}>
                            <label htmlFor="student">Student</label>
                            <input type="radio" name="careerLevel" value="student" id="student" />
                        </div>
                        <div className={styles.check_Box}>
                            <label htmlFor="entryLevel">Entry Level</label>
                            <Field type="radio" name="careerLevel" value="entryLevel" id="entryLevel" />
                        </div>
                        <div className={styles.check_Box}>
                            <label htmlFor="experienced">Experienced</label>
                            <Field type="radio" name="careerLevel" value="experienced" id="experienced" />
                        </div>
                        <div className={styles.check_Box}>
                            <label htmlFor="senior">Senior</label>
                            <Field type="radio" name="careerLevel" value="senior" id="senior" />
                        </div>
                        <div className={styles.check_Box}>
                            <label htmlFor="manager">Manager</label>
                            <Field type="radio" name="careerLevel" value="manager" id="manager" />
                        </div>
                    </div>
                </div>

                <div className={styles.field}>
                    <label htmlFor="yearsOfExpr">Years Of Experience -</label>
                    <div className={styles.collection}>
                        <div className={styles.field}>
                            <Select
                                type="text"
                                name="yearsOfExpr"
                                id="yearsOfExpr"
                                placeholder="Min - Max"
                                options={yearsOfExpr}
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.field}>
                    <label htmlFor="location">Salary Range -</label>
                    <div className={styles.field}>
                        <div className={styles.SecondCollection}>
                            <Field type="text" name="MinSalary" placeholder="e.g 8000" value='' />
                            <h6>to</h6>
                            <Field type="text" name="MaxSalary" placeholder="e.g 12000" value='' />
                            <span>EGP/Per Month</span>
                        </div>
                        <div className={styles.Field}>
                            <div className={styles.SecondCollection}>
                                <Field type="checkbox" name="hideSalary" value="hide" id="hideSalary" />
                                <label htmlFor="hideSalary">Hide Salary in job post (Will only used for recommendations)</label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className={styles.SecondBox}>
                    <h5 className={styles.jobDesc}>About This Job</h5>
                    <div className={styles.field}>
                        <label>Job Description</label>
                        <TextArea />
                    </div>
                </div> */}


                <div className="d-flex justify-content-end align-items-center mt-3 px-2">
                    {/* 
                    {isPending ? (
                                <button type="submit" className={styles.save_btn}>
                                    <FontAwesomeIcon className="fa-spin" icon={faYinYang} />
                                </button>
                            ) : (
                                <button className={styles.save_btn} type="submit">
                                    Post The Job
                                </button>
                            )} 
                    */}
                    <button className={styles.save_btn} type="submit">
                        Post The Job
                    </button>
                </div>
            </Form>

        </Formik>
    );
}

export default JobForm;