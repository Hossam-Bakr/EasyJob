import styles from "./JobForm.module.css"
import { Field, Form, Formik } from "formik";
import Select from "react-select";
import MultiSelect from "../../Components/logic/SelectField";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { convertCategoriesIntoList } from "../../Components/logic/Logic";

const JobForm = (
    jobCategories
) => {

    const [currentJobTitle, setCurrentJobTitle] = useState();
    const [currentJobCategories, setCurrentJobCategories] = useState([]);

    const [myCategories, setMyCategories] = useState([]);
    const currentCategories = useSelector((state) => state.category.categories);


    useEffect(() => {
        if (currentCategories != null) {
            convertCategoriesIntoList(currentCategories, setMyCategories)
        }
    }, [currentCategories])

    useEffect(() => {
        setCurrentJobCategories(jobCategories || []);
    }, [currentJobCategories])

    console.log(myCategories)
    let initialValues = {
        jobTitle: currentJobTitle,
        jobCategories: currentJobCategories,
    }

    const onSubmit = (values) => {
        console.log(values)
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            // validationSchema={validationSchema}
            enableReinitialize
        >
            <Form className={styles.general_info_form}>

                <div className={styles.field}>
                    <label htmlFor="jobTitle">Job Title</label>
                    <Field
                        type="text"
                        value={currentJobTitle}
                        className={styles.disabled_faild}
                        id="jobTitle"
                    />
                </div>

                <div className={styles.checks_group}>
                    <div className={styles.field}>
                        <h4 className="my-4">Job Categories</h4>
                        <div className={`${styles.select_category}`}>
                            <Field
                                name="jobCategory"
                                isMulti={true}
                                component={MultiSelect}
                                options={myCategories}
                            />
                        </div>
                        {/* <ErrorMessage
                            name="jobCategory"
                            component={InputErrorMessage}
                        />  */}
                    </div>
                </div>

                {/* <div className={styles.collection}>
                 <div className={styles.field}>
                        <label htmlFor="jobCategory">Job Category</label>
                        <Select
                            type="text"
                            // placeholder={currentCountry}
                            id="jobCategory"

                        // options={countryOptions}
                        // onChange={(value) => handleCountryChange(value)}
                        // className={data.country ? "" : styles.empty_field}
                        />
                        <ErrorMessage name="country" component={InputErrorMessage} />
                    </div>

                     <div className={styles.field}>
                        <label htmlFor="companyCity">City</label>
                        <Field
                            type="text"
                            // placeholder={currentCity}
                            id="companyCity"
                            name="city"
                            isMulti={false}
                        // component={MultiSelect}
                        // options={formatedCityOptions}
                        // className={data.city ? "" : styles.empty_field}
                        />
                         <ErrorMessage name="city" component={InputErrorMessage} />
                    </div> 
                </div> */}

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