import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class UserCard extends Component {
	render() {
		if (this.props.authUser == null) {
			return (<Redirect to= {{
				    pathname: "/logout",
				    state: { referrer: '/leaderboard' }
				  	}} />);
		}
		return (
			<div className='user-container'>
			<h1>Leaderboard</h1>
				{this.props.users.length > 0 && (this.props.users.map((user) => (
					<div className='user' key={user.id}>
						<img src={user.avatarURL} width='100' height='auto' alt={`Avatar of ${user.name}`}/>
						<div className='user-data-container'>
						<h4>{user.name}</h4>
						<div className='user-data'>Answered questions {Object.keys(user.answers).length}</div>
						<div className='user-data'>Created questions {user.questions.length}</div>
						<div className='user-data'>Total Score:{Object.keys(user.answers).length + user.questions.length}</div>
						</div>
					</div>
				)))}
			</div>
		);
	}
}

function mapStateToProps ({users, authUser}) {
	var userKeys = Object.keys(users);
	var userArr = userKeys.map((key) => users[key]);
	return {
		authUser,
		users: userArr.sort((user1, user2) => ((Object.keys(user1.answers).length + user1.questions.length) < (Object.keys(user2.answers).length + user2.questions.length)))
	}
}
 
export default connect(mapStateToProps)(UserCard);