import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addQuestionAndSync } from '../actions/questions'
import { Redirect } from 'react-router-dom'

class NewQuestion extends Component {
	state = {
		optionAText: '',
		optionBText: ''
	}

	handleTextUpdate (e) {
		if (e.target.getAttribute("data-first") === "true") {
			this.setState({
				optionAText: e.target.value
			});
		} else {
			this.setState({
				optionBText: e.target.value
			})
		}
	}

	submitQuestion(e) {
		e.preventDefault();
		if (this.props.authUser !== null) {
			let question = {
				author: this.props.authUser,
				optionOneText: this.state.optionAText,
				optionTwoText: this.state.optionBText,
			}
			this.props.dispatch(addQuestionAndSync(question));
			this.setState({
				optionAText: '',
				optionBText: ''
			});
			this.props.history.push('/');
		} else {
			this.props.history.push('/logout/');	
		}
	}

	render() {
		if (this.props.authUser == null) {
			return (<Redirect to='/logout' />);
		}
		return (
				<div className='new-question-container'>
					<h1>Create New Question</h1>
					<h2>Would you rather</h2>
					<div className='user-question'><input type='text' value={this.state.optionAText} data-first='true' placeholder='Enter your first question' onChange={this.handleTextUpdate.bind(this)}/></div>
					<div>or</div>
					<div className='user-question'><input type='text' value={this.state.optionBText} placeholder='Enter your second question' onChange={this.handleTextUpdate.bind(this)}/></div>
					<input className='new-question-button' type='button' value='Submit Question' onClick={this.submitQuestion.bind(this)}/>
				</div>
			);
	}
}

function mapStateToProps ({authUser}) {
	return {
		authUser
	}
}
 
export default connect(mapStateToProps)(NewQuestion);