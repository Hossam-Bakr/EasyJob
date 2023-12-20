import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from './Posts.module.css';
const Posts = () => {
  return (
    <Container fluid>
      <Row>
        <Col sm={4}>
            <aside className={styles.job_filters}>
                
            </aside>
        </Col>
        <Col sm={8}>
            <section className={styles.job_posts}>

            </section>
        </Col>
      </Row>
    </Container>
  )
}

export default Posts
