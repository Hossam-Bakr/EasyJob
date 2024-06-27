import React, { useState } from "react";
import styles from "./SuperAdminDashboard.module.css";
import Tab from "react-bootstrap/Tab";
import CategoryForm from "./CategoryForm";
import { Container, Tabs } from "react-bootstrap";
import CountUpSection from "../../../Components/Ui/CountUpSection";
import FloatingPopup from "../../../Components/Ui/FloatingPopup";
import EmployeeManagementForm from "./EmployeeManagementForm";

const SuperAdminDashboard = () => {
  const [showResponse, setShowResponse] = useState(false);
  const [responseMessage, setResponseMessage] = useState({
    title: "",
    content: "",
  });
  const [successResponse, setSuccessResponse] = useState(true);

  return (
    <div className={styles.super_container}>
      <Container fluid>
        <Tabs
          defaultActiveKey={"overview"}
          id="uncontrolled-tab-example"
          className="mb-5 mt-5"
          fill
        >
          <Tab eventKey="overview" title="Overview">
            <section className={`${styles.countUp}`}>
              <CountUpSection />
            </section>
          </Tab>
          <Tab eventKey="employees" title="Employees">
            <EmployeeManagementForm
              setShowResponse={setShowResponse}
              setResponseMessage={setResponseMessage}
              setSuccessResponse={setSuccessResponse}
            />
          </Tab>
          <Tab eventKey="comanies" title="Comanies">
            Comanies management
          </Tab>
          <Tab eventKey="industry" title="Industries & Categories">
            <div className={styles.category_container}>
              <CategoryForm />
            </div>
          </Tab>
          <Tab eventKey="skill" title="Skills">
            Skills
          </Tab>
        </Tabs>

        <FloatingPopup
          showResponse={showResponse}
          setShowResponse={setShowResponse}
          message={responseMessage}
          success={successResponse}
        />
      </Container>
    </div>
  );
};

export default SuperAdminDashboard;
// {
//   /* <Tab.Container id="left-tabs-example" defaultActiveKey="overview">
// <Row>
//   <Col sm={3} className={styles.side_bar}>
//     <Nav variant="pills" className="flex-column">
//       <Nav.Item className={styles.side_bar_item}>
//         <Nav.Link eventKey="overview">Overview</Nav.Link>
//       </Nav.Item>
//       <Nav.Item className={styles.side_bar_item}>
//         <Nav.Link eventKey="inbox">Inbox</Nav.Link>
//       </Nav.Item>
//       <Nav.Item className={styles.side_bar_item}>
//         <Nav.Link eventKey="users">Users Management</Nav.Link>
//       </Nav.Item>
//       <Nav.Item className={styles.side_bar_item}>
//         <Nav.Link eventKey="companies">Companies Management</Nav.Link>
//       </Nav.Item >
//       <Nav.Item className={styles.side_bar_item}>
//         <Nav.Link eventKey="categories">Categories Crud</Nav.Link>
//       </Nav.Item>
//     </Nav>
//   </Col>
//   <Col sm={9} className={styles.content_pages}>
//     <Tab.Content>
//       <Tab.Pane eventKey="overview">overview content</Tab.Pane>
//       <Tab.Pane eventKey="inbox">inboxcontent</Tab.Pane>
//       <Tab.Pane eventKey="users">users content</Tab.Pane>
//       <Tab.Pane eventKey="companies">companies content</Tab.Pane>
//       <Tab.Pane eventKey="categories" className={styles.category_container}><CategoryForm/></Tab.Pane>
//     </Tab.Content>
//   </Col>
// </Row>
// </Tab.Container> */
// }
