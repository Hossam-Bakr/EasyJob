import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { companyActions } from '../../Store/companyNav-slice';

const CompanyHome = () => {
const dispatch=useDispatch();

    useEffect(()=>{
        dispatch(companyActions.changeNavState(true))
    })

  return (
    <div>
      h111
    </div>
  )
}

export default CompanyHome
