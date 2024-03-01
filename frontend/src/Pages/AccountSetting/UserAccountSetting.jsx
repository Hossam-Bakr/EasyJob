import React from 'react'
import SectionMainTitle from './../../Components/Ui/SectionMainTitle';
import AccountSettingForm from './AccountSettingForm';
import DeleteAccountSetting from './DeleteAccountSetting';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import  Container  from "react-bootstrap/Container";
import styles from "../../Components/EdietProfilesInfo/EdietInfo.module.css";
import accountSetting from "../../images/accountSetting.png";

const UserAccountSetting = () => {
  return (
    <Container fluid className='my-5'>
      <Row className="mb-5" id="general">
      <SectionMainTitle title="Account Setting" />
        <Col md={6}>
              <AccountSettingForm />
              <DeleteAccountSetting/>
        </Col>
        <Col md={6} className={styles.general_info_vector_container}>
         <div className={styles.general_info_vector}>
            <img src={accountSetting} alt="update Info" />
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default UserAccountSetting
