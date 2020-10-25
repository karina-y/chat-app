import React, { Component } from "react";
import autobind from "react-autobind";
import ThreadCard from '../components/ThreadCard'
import users from '../dummydata/users.json'
import message from '../dummydata/message.json'
import ThreadDetail from '../components/ThreadDetail'
import './ChatHome.scss'

class ChatHome extends Component {
  constructor(props) {
	super(props);

	this.state = {
	  currentUser: null,
	  activeThread: null,
	  userList: null,
	  threads: null,
	  activeThreadId: null
	};

	autobind(this);
  }

  componentDidMount() {

	//normally i'd check what user is logged in and grab their data, for this project though let's say you're logged in as ron swanson
	const currentUser = users.find(x => x._id === "eaad29fc-b57d-4c70-9058-88d9d30a1f1c")
	const isSender = message.filter(x => x.senderId === currentUser._id)
	const isRecipient = message.filter(x => (x.recipientId === currentUser._id || x.recipientId.includes(currentUser._id)) )

	//get id's of messages
	const ids = new Set(isSender.map(x => x._id));

	//filter out duplicates
	const messages = [...isSender, ...isRecipient.filter(x => !ids.has(x._id))];

	let userList = {};
	let threads = {};

	//i also would expose only pertinent non-sensitive user data which would normally be done on the backend
	for (let i = 0; i < users.length; i++) {
	  let currUser = users[i];

	  //this is what we'll use to access user data through messaging, ie name or initials, id for starting a new chat, etc
	  userList[currUser._id] = {
		_id: currUser._id,
		fname: currUser.fname,
		lname: currUser.lname,
		picture: currUser.picture
	  }
	}

	//group threads by id
	for (let i = 0; i < messages.length; i++) {
	  let currMessage = messages[i];

	  if (threads[currMessage.threadId]) {
		threads[currMessage.threadId].push(currMessage)

		//sort by date
		threads[currMessage.threadId].sort(function(a,b){return new Date(a.createdAt) - new Date(b.createdAt)})

	  } else {
		threads[currMessage.threadId] = [
		  currMessage
		]
	  }
	}

	this.setState({
	  currentUser,
	  threads,
	  userList,
	})
  }

  selectThread(id) {
	this.setState({
	  activeThread: this.state.threads[id],
	  activeThreadId: id
	})
  }

  getFriend(thread) {
	let friendId = null;

	//loop through the thread backwards and find the last message sent by someone other than ron
	for (let i = thread.length-1; i >= 0; i--) {
	  if (thread[i].senderId !== this.state.currentUser._id) {
		//return whichever id isn't our current user
		friendId = thread[i].senderId;
		break;
	  }
	}

	return this.state.userList[friendId];
  }

  render() {
	const getFriend = this.getFriend;
	const selectThread = this.selectThread;
	const threads = this.state.threads;
	const activeThreadId = this.state.activeThreadId;
	const currentUser = this.state.currentUser;

	return (
			<div className="chat-home">
			  {/*  threads on the left */}
			  <div className="thread-list">
				{threads ?
						Object.keys(threads).map((keyName, index) => {
						  return <ThreadCard message={threads[keyName][threads[keyName].length-1]}
											 threadId={keyName}
											 friend={getFriend(threads[keyName])}
											 selectThread={selectThread}
											 activeThreadId={activeThreadId}
											 key={index}/>
						})
						:
						<p>No threads available, start a new chat!</p>
				}

			  </div>

			  {/* selected thread on the right */}
			  {this.state.activeThread && this.state.activeThread.length > 0 ?
					  <ThreadDetail thread={this.state.activeThread}
									currentUser={currentUser}
									userList={this.state.userList} />
					  :
					  <div className="thread-detail">
						<p>No thread selected</p>
					  </div>
			  }
			</div>
	);
  }
}

export default ChatHome;
