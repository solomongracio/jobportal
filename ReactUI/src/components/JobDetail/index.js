
import ChatContainer from './ChatContainer';
import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import { ARTICLE_PAGE_LOADED, ARTICLE_PAGE_UNLOADED } from '../../constants/actionTypes';

const mapStateToProps = state => ({
  job: state.job.jobDetail,
  chatList: state.job.chatList,
  jobChatList: state.job.jobMsgList,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: ARTICLE_PAGE_LOADED, payload }),
  onUnload: () =>
    dispatch({ type: ARTICLE_PAGE_UNLOADED })
});

class Article extends React.Component {

  constructor() {
    super();
    this.state = {
      activeTab:'Detail'
    }
  }

  componentWillMount() {
    this.props.onLoad(Promise.all([
      agent.Articles.get(this.props.match.params.id), 
      agent.Articles.getChats(this.props.match.params.id, this.props.currentUser.userId),
      agent.Articles.getJobChat(this.props.match.params.id)
    ]));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    if (!this.props.job) {
      return null;
    }
    const job = this.props.job;
    return (
      <div className="article-page">
        <div className="container mb30">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item" onClick={() => this.setState({activeTab:'Detail'})}>
                <a className={`nav-link ${this.state.activeTab === 'Detail' ? 'active' : ''}`} id="home-tab" data-toggle="tab"  role="tab" aria-controls="home" aria-selected="true">Job Detail</a>
              </li>
              <li className="nav-item" onClick={() => this.setState({activeTab:'Messages'})}>
                <a className={`nav-link ${this.state.activeTab === 'Messages' ? 'active' : ''}`}  id="profile-tab" data-toggle="tab" role="tab" aria-controls="profile" aria-selected="false">Messages</a>
              </li>
            </ul>
        </div>


      { this.state.activeTab === 'Detail'? 
        <div className="banner">
          <div className="container">
            <h3>{this.props.job.position}</h3>

            <div className = "row interviewRow">
              <div className="col-md-4">
                  <div className="label">Job Code</div>
                  <div className="value">{this.props.job.jobId}</div>
              </div>
              <div className="col-md-4">
                  <div className="label">Job Description</div>
                  <div className="value">{this.props.job.jobDescription}</div>
              </div>
              <div className="col-md-4">
                  <div className="label">Band</div>
                  <div className="value">{this.props.job.band}</div>
              </div>
            </div>

            <div className = "row interviewRow">
              <div className="col-md-4">
                  <div className="label">Location</div>
                  <div className="value">{this.props.job.location}</div>
              </div>
              <div className="col-md-4">
                  <div className="label">Hiring Manager</div>
                  <div className="value">{this.props.job.hiringManager}</div>
              </div>
              <div className="col-md-4">
                  <div className="label">Recruiter</div>
                  <div className="value">{this.props.job.recuriter}</div>
              </div>
            </div>

            <div className = "row interviewRow">
              <div className="col-md-4">
                  <div className="label">Key Skills</div>
                  <div className="value">{this.props.job.location}</div>
              </div>
              <div className="col-md-4">
                  <div className="label">Secondary Skills</div>
                  <div className="value">{this.props.job.hiringManager}</div>
              </div>
              <div className="col-md-4">
                  <div className="label">Status</div>
                  <div className="value">Interview Scheduled at 10 July 2018</div>
              </div>
            </div>

            <div className = "row interviewRow">
              <div className="col-md-4">
                  <div className="label">Posted on</div>
                  <div className="value"> {new Date(job.startDate).toDateString()}</div>
              </div>
              <div className="col-md-4">
                  <div className="label">Closes  on</div>
                  <div className="value"> {new Date(job.endDate).toDateString()}</div>
              </div>
            </div>

          </div>
        </div> 
        : ''}
      { this.state.activeTab === 'Messages'? 
            <div className="container page">
              <div className="row">
                <ChatContainer
                  jobChatList={this.props.jobChatList}
                  chatList={this.props.chatList || []}
                  errors={this.props.commentErrors}
                  jobId={this.props.match.params.id}
                  currentUser={this.props.currentUser} />
              </div>
            </div>
          : ''
        }
     </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Article);
