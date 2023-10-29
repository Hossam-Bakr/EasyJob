import Accordion from 'react-bootstrap/Accordion';
import styles from "./MainAccordion.module.css";

function MainAccordion({firstTitle,firstText,secondTitle,secondText,thirdTitle,thirdText}) {
  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0" className={styles.accordion_item}>
        <Accordion.Header className={styles.header}>{firstTitle}</Accordion.Header>
        <Accordion.Body className={styles.accordion_body}>
          {firstText}
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1" className={styles.accordion_item}>
        <Accordion.Header className={styles.header}>{secondTitle}</Accordion.Header>
        <Accordion.Body className={styles.accordion_body}>
          {secondText}
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2" className={styles.accordion_item}>
        <Accordion.Header className={styles.header}>{thirdTitle}</Accordion.Header>
        <Accordion.Body className={styles.accordion_body}>
          {thirdText}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default MainAccordion;