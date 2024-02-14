import React from 'react';
import styles from './SuperAdminDashboard.module.css';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import CategoryForm from './CategoryForm';

const SuperAdminDashboard = () => {
  return (
    <div className={styles.super_container}>
    <Tab.Container id="left-tabs-example" defaultActiveKey="overview">
      <Row>
        <Col sm={3} className={styles.side_bar}>
          <Nav variant="pills" className="flex-column">
            <Nav.Item className={styles.side_bar_item}>
              <Nav.Link eventKey="overview">Overview</Nav.Link>
            </Nav.Item>
            <Nav.Item className={styles.side_bar_item}>
              <Nav.Link eventKey="inbox">Inbox</Nav.Link>
            </Nav.Item>
            <Nav.Item className={styles.side_bar_item}>
              <Nav.Link eventKey="users">Users Management</Nav.Link>
            </Nav.Item>
            <Nav.Item className={styles.side_bar_item}>
              <Nav.Link eventKey="companies">Companies Management</Nav.Link>
            </Nav.Item >
            <Nav.Item className={styles.side_bar_item}>
              <Nav.Link eventKey="categories">Categories Crud</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9} className={styles.content_pages}>
          <Tab.Content>
            <Tab.Pane eventKey="overview">overview content</Tab.Pane>
            <Tab.Pane eventKey="inbox">inboxcontent</Tab.Pane>
            <Tab.Pane eventKey="users">users content</Tab.Pane>
            <Tab.Pane eventKey="companies">companies content</Tab.Pane>
            <Tab.Pane eventKey="categories" className={styles.category_container}><CategoryForm/></Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  </div>


  )
}

export default SuperAdminDashboard
