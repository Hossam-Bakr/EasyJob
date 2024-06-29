import React, { useEffect, useState } from "react";
import styles from "./EmployeeManagment.module.css";
import SectionMainTitle from "./../../../Components/Ui/SectionMainTitle";
import { Col, Container, Row } from "react-bootstrap";
// import OperationOnUsersForm from "./OperationOnUsersForm";
import OperationOnUsersImg from "../../../images/opOnUsers.jpg";
// import changeEmailImg from "../../../images/changeEmail.jpg";
// import ChangeUserEmailAddress from "./ChangeUserEmailAddress";
import startSearching from "../../../images/startSearching.jpg";
import NoDataBox from "../../../Components/Ui/NoDataBox";
import Loading from "../../../Components/Ui/Loading";
import Table from "react-bootstrap/Table";
// import SendMessageToEmployee from "./SendMessageToEmployee";
import SearchCompanies from "./SearchCompanies";
import OperationsOnCompanyForm from "./OperationsOnCompanyForm";
import SendMessageToCompany from "./SendMessageToCompany";

const CompanyManagementForm = ({
  setShowResponse,
  setResponseMessage,
  setSuccessResponse,
}) => {
  const [searchData, setSearchData] = useState([]);
  const [isSearchStarted, setIsSearchStarted] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getSearchData = (data) => {
    if (data) {
      setIsSearchStarted(true);
      setSearchData(data);
      setIsSearching(false);
    } else {
      setIsSearchStarted(false);
    }
  };

  return (
    <Container className={styles.emp_management}>
      <div className={styles.search_field}>
        <div className="ms-auto mb-5">
          <SearchCompanies
            setShowResponse={setShowResponse}
            setResponseMessage={setResponseMessage}
            setSuccessResponse={setSuccessResponse}
            getSearchData={getSearchData}
            setIsSearching={setIsSearching}
          />
        </div>
        <div className="position-relative">
          {isSearching && <Loading />}
          {isSearchStarted ? (
            searchData.length > 0 ? (
              <>
                <Table striped hover className={styles.search_table}>
                  <thead>
                    <tr>
                      <th>Company ID</th>
                      <th>Name</th>
                      <th>email</th>
                      <th>Phone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchData.map((company) => (
                      <tr key={company.id} className={styles.search_tr}>
                        <td>{company.id}</td>
                        <td>
                          {company.name}
                        </td>
                        <td>{company.email}</td>
                        <td>{company.phone}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </>
            ) : (
              <NoDataBox
                text="no companies found with that name if there is any problems call support"
                path="/contact"
              />
            )
          ) : (
            <div className={styles.searching_img}>
              <img
                className="w-100"
                src={startSearching}
                alt="startSearching"
              />
            </div>
          )}
        </div>
      </div>

        <SectionMainTitle title="Operations On Companies" />
        <Row>
          <Col
            md={7}
            className="d-flex justify-content-center align-items-center"
          >
            <OperationsOnCompanyForm
              setShowResponse={setShowResponse}
              setResponseMessage={setResponseMessage}
              setSuccessResponse={setSuccessResponse}
            />
          </Col>
          <Col
            md={5}
            className="d-flex justify-content-center align-items-center"
          >
            <div className={styles.img_side}>
              <img className="w-100" src={OperationOnUsersImg} alt="op On Companies" />
            </div>
          </Col>
        </Row>
        {/* <hr />
        <div>
          <SectionMainTitle title="Change users's email Address" />
          <Row>
            <Col
              md={7}
              className="d-flex justify-content-center align-items-center"
            >
              <ChangeUserEmailAddress
                setShowResponse={setShowResponse}
                setResponseMessage={setResponseMessage}
                setSuccessResponse={setSuccessResponse}
              />
            </Col>
            <Col
              md={5}
              className="d-flex justify-content-center align-items-center"
            >
              <div className={styles.img_side}>
                <img
                  className="w-100"
                  src={changeEmailImg}
                  alt="changeEmailImg"
                />
              </div>
            </Col>
          </Row>
        </div> */}

        <hr />
        <div className="mt-4">
          <SectionMainTitle title="Message Companies" />
          <SendMessageToCompany
            setShowResponse={setShowResponse}
            setResponseMessage={setResponseMessage}
            setSuccessResponse={setSuccessResponse}
          />
        </div>
    </Container>
  );
};

export default CompanyManagementForm;
