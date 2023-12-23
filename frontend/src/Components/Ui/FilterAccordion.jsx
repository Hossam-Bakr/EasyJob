import React from 'react'
import Accordion from 'react-bootstrap/Accordion';
import styles from './FilterAccordion.module.css';

const FilterAccordion = (props) => {
  return (
    <Accordion.Item eventKey={props.eventKey}>
      <Accordion.Header><span className={styles.title}>{props.title}</span></Accordion.Header>
      <Accordion.Body>
        {props.children}
      </Accordion.Body>
    </Accordion.Item>
  )
}

export default FilterAccordion
