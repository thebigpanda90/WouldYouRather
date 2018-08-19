import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import {logout} from '../actions/users'

class NavBar extends Component {
	leaderBoardClick(e) {
		if (this.props.authUser === null) {
			e.preventDefault();
			this.props.history.push('/logout/');
		}
	}

	logoutCurrentUser(e) {	
		if (this.props.authUser != null) {	
			this.dispatch(logout());
		}
	}

	render() {
		let logInOutText = 'Logout';
		if (this.props.authUser === null) {
			logInOutText = 'Log In';
		}
		return (
			<nav>
				<NavLink to='/' exact>Home</NavLink>
				<NavLink to='/leaderboard' exact onClick={this.leaderBoardClick.bind(this)}>Leaderboard</NavLink>
				<NavLink to='/add' exact>New Question</NavLink>
				{this.props.authUser !== null && (
					<div className='current-user'>
						You are logged in as {this.props.users[this.props.authUser].name}
					</div>)
				}
				<NavLink to='/logout' exact onClick={this.logoutCurrentUser.bind(this)}>{logInOutText}</NavLink>
			</nav>
			)
	}
}

function mapStateToProps({authUser, users}) {
	return {
		authUser: authUser !== null && authUser.constructor !== Object ? authUser : null,
		users
	}
}

export default withRouter(connect(mapStateToProps)(NavBar));