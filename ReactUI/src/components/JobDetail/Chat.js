
import React from 'react';

const Chat = props => {
  const chat = props.chat || {};
  const isRecruiter = props.currentUser.role === 'Admin';
  return (
    <div className={`card msgbox ${ (isRecruiter && chat.msgFrom === 'R') ?'sender':(!isRecruiter && chat.msgFrom === 'C')?'sender':'receiver'}`}>
      <div className="card-block">
        <p className="card-text">{chat.msgData}</p>
        <span className="date-posted">
          {new Date(chat.msgDate).toDateString()}
        </span>
      </div>
    </div>
  );
};

export default Chat;
