import styles from "./JobForm.module.css"
import { Field, Form, Formik } from "formik";
import MultiSelect from "../../Components/logic/SelectField";
import Select from "react-select";
import { countryOptions } from './../../Components/logic/Logic';

const JobForm = () => {

    return (
        <Formik
            // initialValues={initialValues}
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
                            <input type="checkbox" name="checked" value="fulltime" id="fulltime" />
                        </div>
                        <div className={styles.check_Box}>
                            <label htmlFor="parttime">Part Time</label>
                            <Field type="checkbox" name="checked" value="parttime" id="parttime" />
                        </div>
                        <div className={styles.check_Box}>
                            <label htmlFor="freelance-project">Freelance / Project</label>
                            <Field type="checkbox" name="checked" value="freelance-project" id="freelance-project" />
                        </div>
                        <div className={styles.check_Box}>
                            <label htmlFor="shiftbased">Shift Based</label>
                            <Field type="checkbox" name="checked" value="shiftbased" id="shiftbased" />
                        </div>
                        <div className={styles.check_Box}>
                            <label htmlFor="volunteering">Volunteering</label>
                            <Field type="checkbox" name="checked" value="volunteering" id="volunteering" />
                        </div>
                    </div>
                </div>

                <div className={styles.field}>
                    <label>Workplace -</label>
                    <div role="group" aria-labelledby="checkbox-group" className={styles.checkbox_group}>
                        <div className={styles.check_Box}>
                            <label htmlFor="onSite">On-Site</label>
                            <input type="checkbox" name="checked" value="onSite" id="onSite" />
                        </div>
                        <div className={styles.check_Box}>
                            <label htmlFor="parttime">Part Time</label>
                            <Field type="checkbox" name="checked" value="parttime" id="parttime" />
                        </div>
                        <div className={styles.check_Box}>
                            <label htmlFor="freelance-project">Freelance / Project</label>
                            <Field type="checkbox" name="checked" value="freelance-project" id="freelance-project" />
                        </div>
                        <div className={styles.check_Box}>
                            <label htmlFor="shiftbased">Shift Based</label>
                            <Field type="checkbox" name="checked" value="shiftbased" id="shiftbased" />
                        </div>
                        <div className={styles.check_Box}>
                            <label htmlFor="volunteering">Volunteering</label>
                            <Field type="checkbox" name="checked" value="volunteering" id="volunteering" />
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


                {/* <div className={styles.collection}>
                    <div className={styles.field}>
                        <label htmlFor="companySize">Size</label>
                        <Field
                            type="text"
                            id="companySize"
                            name="size"
                            isMulti={false}
                        // component={MultiSelect}
                        // options={sizeOptions}
                        // className={data.size ? "" : styles.empty_field}
                        />
                         <ErrorMessage name="size" component={InputErrorMessage} />
                    </div>

                    <div className={`${styles.field}`}>
                        <label htmlFor="companyFounded">Founded</label>
                        <Field
                            type="text"
                            id="companyFounded"
                            name="foundedYear"
                        // className={`${data.founded ? "" : styles.empty_field} ${styles.founded
                        //     } `}
                        />
                         <ErrorMessage
                                    name="foundedYear"
                                    component={InputErrorMessage}
                                /> 
                    </div>
                </div> */}

                {/* <div className={`${styles.field} ${styles.text_area_desc}`}>
                    <Field
                        as="textarea"
                        id="description"
                        name="description"
                        cols="30"
                        rows="7"
                    // className={data.description ? "" : styles.empty_field}
                    />
                     <ErrorMessage name="description" component={InputErrorMessage} />
                </div> */}

                {/* <div className={styles.field}>
                    <label htmlFor="companyLocation">Location</label>
                    <Field
                        type="text"
                        id="companyLocation"
                        name="location"
                    // className={data.location ? "" : styles.empty_field}
                    />
                <ErrorMessage name="location" component={InputErrorMessage} />
                </div> */}

                <div className="d-flex justify-content-end align-items-center mt-3 px-2">
                    {/* {isPending ? (
                                <button type="submit" className={styles.save_btn}>
                                    <FontAwesomeIcon className="fa-spin" icon={faYinYang} />
                                </button>
                            ) : (
                                <button className={styles.save_btn} type="submit">
                                    Save Changes
                                </button>
                            )} */}
                    <button className={styles.save_btn} type="submit">
                        Save Changes
                    </button>
                </div>
            </Form>
        </Formik>
    );
}

export default JobForm;