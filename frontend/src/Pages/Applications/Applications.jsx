import React from 'react'
import SectionMainTitle from './../../Components/Ui/SectionMainTitle';
import JobItem from '../../Components/Ui/JobItem';
import MainBtnThree from './../../Components/Ui/MainBtnThree';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const Applications = () => {
  
  const mySavedJobs = [
    {
      key: 1,
      name: "huwawei",
      jobTitle: "Call Center",
      desc: " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enimlaudantium eaque harum expedita error autem soluta.",
      logo: "L2",
      full: true,
      remote: true,
      part: false,
      freelance: false,
      country:"Egypt",
      city:"Cairo",
      time: "5 min",
    },
    {
      key: 2,
      name: "Huwawei",
      jobTitle: "Electrical Engineer",
      desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enimlaudantium eaque harum expedita error autem soluta.",
      logo: "L2",
      full: true,
      remote: true,
      part: false,
      freelance: false,
      country:"Egypt",
      city:"Cairo",
      time: "2 days",
    },
    {
      key: 3,
      name: "huwawei",
      jobTitle: "Frontend React Developer",
      desc: " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enimlaudantium eaque harum expedita error autem soluta.",
      logo: "L2",
      freelance: true,
      full: true,
      part: false,
      remote: false,
      country:"Egypt",
      city:"Cairo",
      time: "5 months",
    },
    {
      key: 4,
      name: "huwawei",
      jobTitle: "Financial Advisor",
      desc: " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enimlaudantium eaque harum expedita error autem soluta.",
      logo: "L2",
      part: true,
      freelance: true,
      remote: false,
      full: false,
      country:"Egypt",
      city:"Cairo",
      time: "2 years",
    },
  ];

  return (
    <Container className='my-5'>
      <SectionMainTitle title="Manage Your Applications"/>
      <div>
          <Row className="mt-4">
            {mySavedJobs.map((job) => {
              return (
                <JobItem
                  key={job.key}
                  name={job.name}
                  jobTitle={job.jobTitle}
                  desc={job.desc}
                  logo={job.logo}
                  full={job.full}
                  remote={job.remote}
                  part={job.part}
                  freelance={job.freelance}
                  time={job.time}
                  grid={false}
                  profile={true}
                  country={job.country}
                  city={job.city}
                  type="applications"
                />
              );
            })}

            <div className="text-center">
              <MainBtnThree text="Load More" />
            </div>
          </Row>
        </div>


    </Container>
  )
}

export default Applications
