import JobPreview from './JobPreview';
import React from 'react';

const JobList = props => {
  if (!props.jobList) {
    return (
      <div className="article-preview">Loading...</div>
    );
  }

  if (props.jobList.length === 0) {
    return (
      <div className="article-preview">
        No Job List are here... yet.
      </div>
    );
  }

  return (
    <div>
      {
        props.jobList.map(job => {
          return (
            <JobPreview job={job} key={job.jobId}  />
          );
        })
      }
    </div>
  );
};

export default JobList;
