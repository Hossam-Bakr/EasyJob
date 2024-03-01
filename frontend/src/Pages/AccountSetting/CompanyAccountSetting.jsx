import React from "react";
import SectionMainTitle from "./../../Components/Ui/SectionMainTitle";
import CompanyAccountSettingFormTwo from "./CompanyAccountSettingFormTwo";
import accountSetting from "../../images/accountSetting.png";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import  Container  from "react-bootstrap/Container";
import styles from "../../Components/EdietProfilesInfo/EdietInfo.module.css";
import AccountSettingForm from "./AccountSettingForm";
import DeleteAccountSetting from "./DeleteAccountSetting";

const CompanyAccountSetting = () => {
  return (
    <Container fluid>
      <Row className="mb-5" id="general">
      <SectionMainTitle title="Account Setting" />
        <Col md={6}>
              <AccountSettingForm />
              <CompanyAccountSettingFormTwo />
              <DeleteAccountSetting/>
        </Col>
        <Col md={6} className={styles.general_info_vector_container}>
         <div className={styles.general_info_vector}>
            <img src={accountSetting} alt="update Info" />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CompanyAccountSetting;
