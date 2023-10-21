import React from 'react';
import styles from './MainButtonTwo.module.css';
import { motion } from 'framer-motion';

const MainButtonTwo = ({text}) => {
  return (
    <motion.button whileHover={{scale:1.05,color:'#7428c5', backgroundColor:'#ffffff',boxShadow:'-1px 1px 5px #000000'}} className={styles.start_btn}>{text}</motion.button>
  )
}

export default MainButtonTwo
