import React from "react";
import PropTypes from "prop-types";
import './ThreadDetail.scss'

const ThreadDetail = (props) => (
        <div className="thread-detail">

          {props.thread && props.thread.length > 0 ?
                  props.thread.map((item, index) => {
                    return <div className={`chat-message ${item.senderId === props.currentUser._id ? 'self' : 'friend'}`} key={index}>

                      <div className="message">
                        {item.content}
                      </div>

                      {item.senderId !== props.currentUser._id &&
                        <div className="user-initials">
                          {props.userList[item.senderId].fname[0]}{props.userList[item.senderId].lname[0]}
                        </div>
                      }

                      <div className="time">
                        {new Date(item.createdAt).toLocaleTimeString()}
                      </div>

                    </div>
                  })
                  :
                  'No thread selected'
          }
        </div>
);

ThreadDetail.propTypes = {
  thread: PropTypes.array,
  currentUser: PropTypes.object,
  // friendId:
};

export default ThreadDetail;
