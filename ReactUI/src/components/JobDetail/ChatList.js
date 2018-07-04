import Chat from './Chat';
import React from 'react';

const ChatList = props => {
  const chatList = props.chatList || []
  return (
    <div>
      {
        chatList.map(chat => {
          return (
            <Chat
              chat={chat}
              currentUser={props.currentUser}
              jobId={props.jobId}
              key={chat._id} />
          );
        })
      }
    </div>
  );
};

export default ChatList;
