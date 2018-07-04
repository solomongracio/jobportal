import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import { MSG_ADDED } from '../../constants/actionTypes';

const mapDispatchToProps = dispatch => ({
  onSubmit: payload =>
    dispatch({ type: MSG_ADDED, payload })
});

class CommentInput extends React.Component {
  constructor() {
    super();
    this.state = {
      body: ''
    };

    this.setBody = ev => {
      this.setState({ body: ev.target.value });
    };

    this.createComment = ev => {
      ev.preventDefault();
      console.log(this.props);
      const msg = {
        userId: this.props.currentUser.role === 'Admin'?this.props.chatList[0].userId:this.props.currentUser.userId,
        msgData: this.state.body,
        userName: this.props.currentUser.userName,
        msgFrom: this.props.currentUser.role === 'General'?'C':'R',
        jobId: this.props.jobId
      }
      console.log(msg)
      const payload = agent.Comments.create(msg);
      this.setState({ body: '' });
      this.props.onSubmit(payload);
    };
  }

  render() {
    return (
      <form className="card comment-form" onSubmit={this.createComment}>
        <div className="card-block">
          <textarea className="form-control"
            placeholder="Type your message.."
            value={this.state.body}
            onChange={this.setBody}
            rows="3">
          </textarea>
        </div>
        <div className="card-footer">
          <img
            src="../images/smile.jpg"
            className="comment-author-img"
           />
          <button
            className="btn btn-sm btn-primary"
            type="submit">
              Send
          </button>
        </div>
      </form>
    );
  }
}

export default connect(() => ({}), mapDispatchToProps)(CommentInput);
