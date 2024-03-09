import React from "react";
import PlacholderComponent from "../../Components/Ui/PlacholderComponent";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const LoadingPlaceholders = ({ page }) => {
  let content = null;
  if (page === "category") {
    content = (
      <Container fluid className="my-5 vh-75">
        <Row>
          <Col sm={3}>
            <div>
              <PlacholderComponent
                type="p"
                mySize="lg"
                myWidth="75%"
                mybg="primary"
                myAnimation="none"
              />
              <PlacholderComponent type="p" mySize="md" myWidth="75%" />
              <PlacholderComponent type="p" mySize="md" myWidth="75%" />
              <PlacholderComponent type="p" mySize="md" myWidth="75%" />
              <PlacholderComponent type="p" mySize="md" myWidth="75%" />
              <PlacholderComponent type="p" mySize="md" myWidth="75%" />
              <PlacholderComponent type="p" mySize="md" myWidth="75%" />
              <PlacholderComponent type="p" mySize="md" myWidth="75%" />
              <PlacholderComponent type="p" mySize="md" myWidth="75%" />
            </div>
          </Col>
          <Col sm={9}>
            <Row className="gy-2">
              <Col sm={12}>
                <PlacholderComponent
                  type="p"
                  mySize="lg"
                  myWidth="50%"
                  myAnimation="glow"
                  mybg="primary"
                />
              </Col>
              <Col sm={6} md={3}>
                <PlacholderComponent type="p" mySize="md" myWidth="75%" />
              </Col>
              <Col sm={6} md={3}>
                <PlacholderComponent type="p" mySize="md" myWidth="75%" />
              </Col>
              <Col sm={6} md={3}>
                <PlacholderComponent type="p" mySize="md" myWidth="75%" />
              </Col>
              <Col sm={6} md={3}>
                <PlacholderComponent type="p" mySize="md" myWidth="75%" />
              </Col>
              <Col sm={6} md={3}>
                <PlacholderComponent type="p" mySize="md" myWidth="75%" />
              </Col>
              <Col sm={6} md={3}>
                <PlacholderComponent type="p" mySize="md" myWidth="75%" />
              </Col>
              <Col sm={12} className="mt-5">
                <PlacholderComponent
                  type="p"
                  mySize="lg"
                  myWidth="50%"
                  myAnimation="glow"
                  mybg="primary"
                />
              </Col>
              <Col sm={6} md={3}>
                <PlacholderComponent type="p" mySize="md" myWidth="100%" />
              </Col>
              <Col sm={6} md={3}>
                <PlacholderComponent type="p" mySize="md" myWidth="100%" />
              </Col>
              <Col sm={6} md={3}>
                <PlacholderComponent type="p" mySize="md" myWidth="100%" />
              </Col>
              <Col sm={6} md={3}>
                <PlacholderComponent type="p" mySize="md" myWidth="100%" />
              </Col>
              <Col sm={6} md={3}>
                <PlacholderComponent type="p" mySize="md" myWidth="100%" />
              </Col>
              <Col sm={6} md={3}>
                <PlacholderComponent type="p" mySize="md" myWidth="100%" />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
  if (page === "jobs") {
    content = (
      <>
        <Col lg={6} xl={4} className="d-flex justify-content-center">
          <PlacholderComponent />
        </Col>
        <Col lg={6} xl={4} className="d-flex justify-content-center">
          <PlacholderComponent />
        </Col>
        <Col lg={6} xl={4} className="d-flex justify-content-center">
          <PlacholderComponent />
        </Col>
        <Col lg={6} xl={4} className="d-flex justify-content-center">
          <PlacholderComponent />
        </Col>
        <Col lg={6} xl={4} className="d-flex justify-content-center">
          <PlacholderComponent />
        </Col>
        <Col lg={6} xl={4} className="d-flex justify-content-center">
          <PlacholderComponent />
        </Col>
        <Col lg={6} xl={4} className="d-flex justify-content-center">
          <PlacholderComponent />
        </Col>
        <Col lg={6} xl={4} className="d-flex justify-content-center">
          <PlacholderComponent />
        </Col>
        <Col lg={6} xl={4} className="d-flex justify-content-center">
          <PlacholderComponent />
        </Col>
      </>
    );
  }
  if (page === "latestJobs") {
    content = (
      <>
        <Col lg={6} xl={4} className="d-flex justify-content-center">
          <PlacholderComponent />
        </Col>
        <Col lg={6} xl={4} className="d-flex justify-content-center">
          <PlacholderComponent />
        </Col>
        <Col lg={6} xl={4} className="d-flex justify-content-center">
          <PlacholderComponent />
        </Col>
        <Col lg={6} xl={4} className="d-flex justify-content-center">
          <PlacholderComponent />
        </Col>
      </>
    );
  }

  return <>{content}</>;
};

export default LoadingPlaceholders;
