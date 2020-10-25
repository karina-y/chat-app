import React from "react";
import PropTypes from "prop-types";
import './ThreadCard.scss'

const ThreadCard = (props) => (
        <div className={`thread-card flex-center ${props.activeThreadId === props.threadId ? 'active' : ''}`} onClick={() => props.selectThread(props.threadId)}>

          {/* ideally we'd have multiple images/names for a group chat but for now just using the last person to send a message that wasn't ron */}
          <div className="profile-icon">
            <img src={props.friend.picture} />
          </div>

          <div className="thread-preview">
            <p><b>{props.friend.fname} {props.friend.lname[0]}.</b></p>
            <p>{props.message.content.substr(0,20)}...</p>
          </div>

        </div>
);

ThreadCard.propTypes = {
  selectThread: PropTypes.func.isRequired,
  threadId: PropTypes.string,
  activeThreadId: PropTypes.string,
  message: PropTypes.object,
  userList: PropTypes.object,
  friend: PropTypes.object
};

export default ThreadCard;
