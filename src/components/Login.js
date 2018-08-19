import React, { Component } from 'react'
import { connect } from 'react-redux'
import { userLogin } from '../actions/authUser'
import { Redirect } from 'react-router-dom'

class Login extends  Component {
	state = {
		hasLoggedIn: false,
		selectedUser: "none"
	}

	selectUser = (e) => {
		this.setState({
			selectedUser: e.target.value
		});
	}

	logInUser = (e) => {
		this.props.dispatch(userLogin(this.state.selectedUser));

		this.setState({
			hasLoggedIn: true
		});
	}

	render() {
		if (this.state.hasLoggedIn) {
			return <Redirect to='/' />;
		}
		return (
			<div className='login-container'>
				{this.state.selectedUser !== "none" && 
				<div>
					<img src={this.props.usersComplete[this.state.selectedUser].avatarURL} 
						width='150' 
						height='auto' 
						alt={`Avatar of ${this.props.usersComplete[this.state.selectedUser].avatarURL}`}/>
				</div>
				}
				<div>
					<select className='login-user-select' onChange={this.selectUser.bind(this)} value={this.state.selectedUser}>
					<option key='none' value='none'>No one is currently logged in</option>
					{this.props.users.length > 0 && (this.props.users.map((user) => (<option key={user.id} value={user.id}>{user.name}</option>)))}
					</select>
					<input className='login-button' type='button' value='Log In!' onClick={this.logInUser.bind(this)} />
				</div>
			</div>
			);
	}
}

function mapStateToProps ({users}) {
	var userKeys = Object.keys(users);
	var userArr = userKeys.map((key) => users[key]);
	return {
		users: userArr,
		usersComplete: users
	}
}

export default connect(mapStateToProps)(Login);