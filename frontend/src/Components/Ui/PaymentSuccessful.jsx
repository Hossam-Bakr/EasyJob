import React from 'react'
import thankU from "../../images/thank.jpg"
import styles from "./CandidatePost.module.css";

const PaymentSuccessful = () => {
  return (
    <div className={styles.container_payment}>
        <div className={styles.img_side_payment}>
          <img src={thankU} alt="thankU" />
        </div>
        <span className='mini_word'>Successful Process Thank you for your trust</span>
    </div>
  )
}

export default PaymentSuccessful
