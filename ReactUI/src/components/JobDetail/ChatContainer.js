import ChatInput from './ChatInput';
import CandidateList from './CandidateList';
import ChatList from './ChatList';
import { Link } from 'react-router-dom';
import React from 'react';

const ChatContainer = props => {
  if (props.currentUser) {
    return (
      <div className="col-xs-12 col-md-12 col-sm-12">
        <div className="row">
          {
            props.currentUser.role === 'Admin'?
            <div className="col-md-2 col-xs-12">
              <CandidateList jobChatList={props.jobChatList} />
            </div>
            :''
          }
          <div className={`col-xs-12 col-md-8 ${props.currentUser.role === 'Admin'?'':'offset-md-2'}`}>
              <div className="col-xs-12 col-md-12" id="chatContainer">
                <ChatList
                  chatList={props.chatList}
                  jobId={props.jobId}
                  currentUser={props.currentUser} />
              </div>
              <div className="col-xs-12 col-md-12" id="chatTextbox">
                  <ChatInput jobId={props.jobId} chatList={props.chatList} currentUser={props.currentUser} />
              </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="col-xs-12 col-md-8 offset-md-2">
        <p>
          <Link to="/login">Sign in</Link>
          &nbsp;or&nbsp;
          <Link to="/register">sign up</Link>
        </p>
        <ChatList
          comments={props.comments}
          jobId={props.jobId}
          currentUser={props.currentUser} />
      </div>
    );
  }
};

export default ChatContainer;
