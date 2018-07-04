import JobList from '../JobList';
import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import { CHANGE_TAB } from '../../constants/actionTypes';



const GlobalFeedTab = props => {
  const clickHandler = ev => {
    ev.preventDefault();
    props.onTabClick('all', agent.Articles.all, agent.Articles.all());
  };
  return (
    <li className="nav-item">
      <a
        href=""
        className='nav-link active'
        onClick={clickHandler}>
       Job List
      </a>
    </li>
  );
};

const getJobs = (job) => {
  if (job.length) {
    return job
  } else {
    return []
  }
}

const mapStateToProps = state => ({
  token: state.common.token,
  jobList: getJobs(state.jobList)
});

const mapDispatchToProps = dispatch => ({
  onTabClick: (tab, pager, payload) => dispatch({ type: CHANGE_TAB, tab, pager, payload })
});

const MainView = props => {
  return (
    <div className="col-md-12">
      <div className="feed-toggle">
        <ul className="nav nav-pills outline-active">
          <GlobalFeedTab tab={props.tab} onTabClick={props.onTabClick} />
        </ul>
      </div>
      <JobList
        jobList={props.jobList}
        loading={props.loading}/>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
