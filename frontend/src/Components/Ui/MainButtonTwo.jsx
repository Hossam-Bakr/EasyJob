import React from 'react';
import styles from './MainButtonTwo.module.css';
import { motion } from 'framer-motion';

const MainButtonTwo = ({text}) => {
  return (
    <motion.button whileHover={{scale:1.05,color:'#000', backgroundColor:'#EFA51E'}} className={styles.start_btn}>{text}</motion.button>
  )
}

export default MainButtonTwo
