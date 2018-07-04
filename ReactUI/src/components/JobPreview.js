import React from 'react';
import { Link } from 'react-router-dom';
import agent from '../agent';
import { connect } from 'react-redux';
import { ARTICLE_FAVORITED, ARTICLE_UNFAVORITED, JOB_APPLIED } from '../constants/actionTypes';

const mapStateToProps = state => ({
  user: state.common.currentUser || {}
});

const mapDispatchToProps = dispatch => ({
  favorite: slug => dispatch({
    type: ARTICLE_FAVORITED,
    payload: agent.Articles.favorite(slug)
  }),
  unfavorite: slug => dispatch({
    type: ARTICLE_UNFAVORITED,
    payload: agent.Articles.unfavorite(slug)
  }),
  apply: (jobId, userId) => dispatch({
    type: JOB_APPLIED,
    payload: agent.Articles.apply(jobId, userId)
  })
});

const ArticlePreview = props => {
  const job = props.job;
  return (
    <div className="article-preview">
      <div className = "row">
        <div className="col-md-6">
          <Link to={`/job/${job.jobId}`} className="preview-link">
            <h1>{job.position}</h1>
            <p>{job.jobDescription}</p>
            <p>posted on {new Date(job.startDate).toDateString()}</p>
          </Link>
        </div>
        {
          props.user.role !== 'Admin'?
            <div className="col-md-6">
              {
                !job.isApplied?
                <button onClick={() => props.apply(job.jobId, props.user.userId)}
                    className="btn btn-primary pull-xs-right"
                    type="submit">
                  Apply
              </button>:
              <h4 className="pull-xs-right">Applied</h4>
              }
            </div>:''
        }
        {
          props.user.role === 'Admin'?
            <div className="col-md-6">
               3 Unread Candidates
            </div>:''
        }
      </div>  
    </div>
  );
}


export default connect(mapStateToProps, mapDispatchToProps)(ArticlePreview);

// export default connect(() => ({}), mapDispatchToProps)(ArticlePreview);
