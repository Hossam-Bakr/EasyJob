import styles from './InputErrorMessage.module.css';
import { motion } from 'framer-motion';

const InputErrorMessage = (props) => {
  return (
    <motion.p initial={{x:-30,opacity:0}} animate={{x:0,opacity:1}} exit={{x:-30,opacity:0}}  className={styles.error_message}>
      {props.text?props.text:props.children}
    </motion.p>
  )
}

export default InputErrorMessage
