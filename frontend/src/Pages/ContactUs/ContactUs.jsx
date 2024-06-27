import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/esm/Col";
import styles from "./ContactUs.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faEnvelope,
  faMapMarkedAlt,
  faPhoneFlip,
  faYinYang,
} from "@fortawesome/free-solid-svg-icons";
import ContactsIcon from "./../../Components/Ui/ContactsIcon";
import { ErrorMessage, Field, Form, Formik } from "formik";
import InputErrorMessage from "../../Components/Ui/InputErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { sendContactUs } from "../../util/Http";
import FloatingPopup from "../../Components/Ui/FloatingPopup";
import { object, string } from "yup";

const ContactUs = () => {
  const [showResponse, setShowResponse] = useState(false);
  const [responseMessage, setResponseMessage] = useState({
    title: "",
    content: "",
  });
  const [successResponse, setSuccessResponse] = useState(true);

  const { mutate, isPending } = useMutation({
    mutationFn: sendContactUs,
    onSuccess: (data) => {
      console.log(data);
      if (data.message === "Message sent successfully") {
        console.log(data);
        setResponseMessage({
          title: "Sent successfully",
          content: "our developers team will reply on your message soon, check your mail",
        });
        setSuccessResponse(true);
        setShowResponse(true);
      } else {
        setResponseMessage({
          title: "Request Faild",
          content: "Your Message faild to be sent please try again",
        });
        setSuccessResponse(false);
        setShowResponse(true);
      }
    },
    onError: (error) => {
      console.log(error);
      setResponseMessage({
        title: "Request Faild",
        content: "Your Message faild to be sent please try again",
      });
      setSuccessResponse(false);
      setShowResponse(true);
    },
  });

  const initialValues = {
    name: "",
    email: "",
    subject: "",
    message: "",
  };

  const validationSchema = object({
    name: string().required("name is required"),
    email: string().email("Email not valid").required("Email is required"),
    subject: string().required("subject is required"),
    message: string()
      .min(20, "Message must be at least 20 characters")
      .required("Message is required"),
  });

  const onSubmit = (values) => {
    console.log(values)
    mutate({
      formData: values,
      //   token: companyToken,
    });
  };


  return (
    <section className="overflow-hidden" id="Contact">
      <Row>
        <Col md={5} className={styles.contact_info}>
          <div className={`${styles.contact_info_layer} p-4`}>
            <div className={styles.contact_links}>
              {/* <!-- data num 1 --> */}
              <div className="d-flex mb-3">
                <div className="me-3">
                  <FontAwesomeIcon
                    className={styles.contact_info_icon}
                    icon={faPhoneFlip}
                  />
                </div>
                <div className="d-flex flex-column">
                  <h6 className={styles.data_link_h6}>Phone :</h6>
                  <p className={styles.data_link_p}>
                    +20 010 251 789 18 , 371 789 18
                  </p>
                </div>
              </div>

              {/* <!-- data num 2 --> */}
              <div className="d-flex mb-3">
                <div className="me-3">
                  <FontAwesomeIcon
                    className={styles.contact_info_icon}
                    icon={faEnvelope}
                  />
                </div>
                <div className="d-flex flex-column">
                  <h6 className={styles.data_link_h6}>Email :</h6>
                  <p className={styles.data_link_p}>
                    EasyJob_support@website.com
                  </p>
                </div>
              </div>

              {/* <!-- data num 3 --> */}
              <div className="d-flex mb-3">
                <div className="me-3">
                  <FontAwesomeIcon
                    className={styles.contact_info_icon}
                    icon={faMapMarkedAlt}
                  />
                </div>
                <div className="d-flex flex-column">
                  <h6 className={styles.data_link_h6}>Address :</h6>
                  <p className={styles.data_link_p}>
                    4655 Elwehda Street, Imbaba, Illinois <br />
                    4961 Wescam Court, Reno, Nevada
                  </p>
                </div>
              </div>

              <div className={styles.contact_info_icons}>
                <ContactsIcon type="two" />
              </div>
            </div>
          </div>
        </Col>
        <Col md={7} className="py-5">
          <div className="special_main_color text-center m-auto my-5">
            <h6 className={styles.sub_title}>GET IN TOUCH</h6>
            <h2 className={styles.form_title}>Contact Us</h2>
            <FontAwesomeIcon icon={faCaretDown} />
          </div>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            enableReinitialize
          >
            <Form>
              <div className="form-group p-3">
                <Row className="justify-content-center">
                  <Col md={6} className="mb-4 p-2 position-relative">
                    <Field
                      type="text"
                      id="form-name"
                      placeholder="Name"
                      className="form-control"
                      name="name"
                      required
                    />
                    <ErrorMessage name="name" component={InputErrorMessage} />
                  </Col>
                  <Col md={6} className="mb-4 p-2 position-relative">
                    <Field
                      type="email"
                      id="form-email"
                      placeholder="Email"
                      className="form-control"
                      name="email"
                      required
                    />
                    <ErrorMessage name="email" component={InputErrorMessage} />
                  </Col>
                  <Col md={12} className="mb-4 p-2 position-relative">
                    <Field
                      type="text"
                      id="form-subject"
                      placeholder="Subject"
                      className="form-control"
                      name="subject"
                      required
                    />
                    <ErrorMessage
                      name="subject"
                      component={InputErrorMessage}
                    />
                  </Col>
                  <Col md={12} className="mb-4 p-2 position-relative">
                    <Field
                      as="textarea"
                      name="message"
                      id="form-message"
                      className="form-control"
                      rows="3"
                      required
                      placeholder="Message"
                    />
                  </Col>
                  <ErrorMessage name="message" component={InputErrorMessage} />
                </Row>

                <div>
                  {isPending ? (
                    <button type="submit" className={styles.save_btn}>
                      <FontAwesomeIcon className="fa-spin" icon={faYinYang} />
                    </button>
                  ) : (
                    <button className={styles.save_btn} type="submit">
                      Send Message
                    </button>
                  )}
                </div>
              </div>
            </Form>
          </Formik>
        </Col>
      </Row>
      <FloatingPopup
        showResponse={showResponse}
        setShowResponse={setShowResponse}
        message={responseMessage}
        success={successResponse}
      />
    </section>
  );
};

export default ContactUs;
