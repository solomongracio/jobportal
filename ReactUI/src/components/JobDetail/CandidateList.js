import React from 'react';
import { connect } from 'react-redux';
import { CHANGE_MSG } from '../../constants/actionTypes';

const mapDispatchToProps = dispatch => ({
  onChange: payload =>
    dispatch({ type: CHANGE_MSG, payload })
});

class CandidateList extends React.Component {
  constructor() {
    super();
    this.changeMessage = (data) => {
      this.props.onChange(data);
    }
  }

  render() {
    const chatList = this.props.jobChatList || []
    return (
      <div>
      {
        chatList.map(chat => {
          return (
            <div key={chat._id}  className="user-name" onClick={() => this.changeMessage(chat)}>
              <div>{chat.userName}</div>
            </div>
          );
        })
      }
    </div>
    );
  }
}

export default connect(() => ({}), mapDispatchToProps)(CandidateList);
