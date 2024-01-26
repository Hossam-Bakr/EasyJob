import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { companyActions } from '../../Store/companyNav-slice';
import styles from './CompanyHome.module.css';
import MainButton from './../../Components/Ui/MainButton';
import { useNavigate } from 'react-router-dom';

const CompanyHome = () => {
const dispatch=useDispatch();
const navigate=useNavigate();

const navigateToCompanySignUpPage=()=>{
  navigate("/company-register")
}

    useEffect(()=>{
        dispatch(companyActions.changeNavState(true));

        return()=>{
          dispatch(companyActions.changeNavState(false));
        }
    },[dispatch])

  return (
    <>
      <header className={styles.company_header}>
      
        <div className={styles.company_header_layer}>
          <div className={styles.capture}>
            <h2>Find the best employees for your company</h2>
            <p className={styles.company_header_p}>Save yourself the trouble of choosing employees and leave it to us</p>
            <MainButton onClick={navigateToCompanySignUpPage} text="Get Started"/>
          </div>
        </div>
      </header>     
    </>
  )
}

export default CompanyHome
