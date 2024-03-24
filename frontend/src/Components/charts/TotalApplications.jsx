import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


const data = [
    {
      name: 'Jan',
      application: 300,
      accepted: 100,
    },
    {
      name: 'Feb',
      application: 222,
      accepted: 100,
    },
    {
      name: 'Mar',
      application: 413,
      accepted: 200,
    },
    {
      name: 'Apr',
      application: 300,
      accepted: 194,
    },
    {
      name: 'May',
      application: 100,
      accepted: 80,
    },
    {
      name: 'Jun',
      application: 88,
      accepted: 45,
    },
    {
      name: 'Jul',
      application: 80,
      accepted: 20,
    },
    {
      name: 'Aug',
      application: 135,
      accepted: 31,
    },
    {
      name: 'Oct',
      application: 200,
      accepted: 15,
    },
    {
      name: 'Nov',
      application: 133,
      accepted: 71,
    },
    {
      name: 'Dec',
      application: 49,
      accepted: 20,
    },
  ];

const TotalApplications = () => {
  return (
    <div style={{ width: '100%' }}>
    <p className='my-4 fw-bold'> <FontAwesomeIcon className='me-2 special_main_color' icon={faCaretRight}/>Applications</p>
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart
        width={500}
        height={200}
        data={data}
        syncId="anyId"
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis/>
        <Tooltip />
        <Area type="monotone" dataKey="application" stroke="#1B55E2" fill="#A7C0FA" />
      </AreaChart>
    </ResponsiveContainer>
   
    <p className='my-4 fw-bold'><FontAwesomeIcon className='me-2 special_main_color' icon={faCaretRight}/>Accepted</p>
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart
        width={500}
        height={200}
        data={data}
        syncId="anyId"
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis/>
        <Tooltip />
        <Area type="monotone" dataKey="accepted" stroke="#E7515A" fill="#FBCCCD" />
      </AreaChart>
    </ResponsiveContainer>
  </div>    
  )
}

export default TotalApplications
