import React, { Component } from 'react'
import { connect } from 'react-redux'
import { submitAnswerAndSync } from '../actions/questions'
import { withRouter, Redirect } from 'react-router-dom'

class Question extends Component {
	state = {
		optionOneChecked: false,
		optionTwoChecked: false
	}
	submitAnswer(e) {
		e.preventDefault();
		console.log(e);
		if (this.props.authUser === null) {
			this.props.history.push('/logout/');
		} else {
			let answer = '';
			if (this.state.optionOneChecked) {
				answer = 'optionOne';
			}
			if (this.state.optionTwoChecked) {
				answer = 'optionTwo';
			}
			if (answer !== '') {
				this.props.dispatch(submitAnswerAndSync({authedUser: this.props.authUser, qid: this.props.selectedQuestion.id, answer: answer}));
				this.setState({
					optionOneChecked: false,
					optionTwoChecked: false
				})
			}
		}
	}

	checkboxChange(e) {
		let option = e.target.getAttribute('data-option');
		let checked = e.target.value === "on";
		if (option === "one") {
			this.setState({
				optionOneChecked: checked
			});
		}
		if (option === "two") {
			this.setState({
				optionTwoChecked: checked
			});
		}
	}

	viewQuestion(e, id) {
		e.preventDefault();
		if (this.props.authUser === null) {
			this.props.history.push('/logout/');
		} else {
			this.props.history.push('question/' + id);
		}
	}

	render() {
		if (this.props.authUser == null) {
			return (<Redirect to='/logout' />);
		}
		//show 404 page if question doesn't exist
		if (this.props.selectedQuestion == null) {
			return (<div>Oops that question doesn't exist</div>);
		}
		let currentUserAnsweredQuestion = false;
		let optionOneAnswered = this.props.authUser != null && this.props.selectedQuestion.optionOne.votes.filter((vote) => vote === this.props.authUser).length > 0;
		if(this.props.authUser && (this.props.selectedQuestion.optionOne.votes.filter((vote) => vote === this.props.authUser).length > 0 ||
			this.props.selectedQuestion.optionTwo.votes.filter((vote) => vote === this.props.authUser).length > 0)) {
			currentUserAnsweredQuestion = true;
		}		
		let className = '';
		if (this.props.liteView) {
			className = 'question';
		} else {
			className = 'question-full'
		} 

		let totalVotes = this.props.selectedQuestion.optionOne.votes.length + this.props.selectedQuestion.optionTwo.votes.length;
		let optionOneNumberResultText = `${this.props.selectedQuestion.optionOne.votes.length} votes out of ${totalVotes} total votes`;
		let optionOnePercentageResultText = `${(this.props.selectedQuestion.optionOne.votes.length/totalVotes).toPrecision(4) * 100} percent of people voted for this`;
		let optionTwoNumberResultText = `${this.props.selectedQuestion.optionTwo.votes.length} votes out of ${totalVotes} total votes`;
		let optionTwoPercentageResultText = `${(this.props.selectedQuestion.optionTwo.votes.length/totalVotes).toPrecision(4) * 100} percent of people voted for this`;
		return (	
			<div className={className}>
				<img className='question-image' src={this.props.users[this.props.selectedQuestion.author].avatarURL} 
					width='100' 
					height='auto' 
					alt={`Avatar of ${this.props.users[this.props.selectedQuestion.author].name}`}/>
				<div className='question-text'>
					<h3>{this.props.users[this.props.selectedQuestion.author].name} asks:</h3>
					<h1>Would You Rather ...</h1>
					{this.props.liteView && (
						<div>
							<div className='lite-question'>
								<span>{this.props.selectedQuestion.optionOne.text}</span>
							</div>
							<div className='lite-question-or'>or</div>
							<div className='lite-question'>
								<span>{this.props.selectedQuestion.optionTwo.text}</span>
							</div>
							<input type='button' className='view-question-button' value='View Question' onClick={(e) => this.viewQuestion(e, this.props.selectedQuestion.id)} />
						</div>)
					}
					{!this.props.liteView && !currentUserAnsweredQuestion && (
						<div>
							<div className='lite-question'>
								<input type='checkbox' onChange={this.checkboxChange.bind(this)} data-option='one' /> <span>{this.props.selectedQuestion.optionOne.text}</span>
							</div>
							<div className='lite-question-or'>or</div>
							<div className='lite-question'>
								<input type='checkbox' onChange={this.checkboxChange.bind(this)} data-option='two' /> <span>{this.props.selectedQuestion.optionTwo.text}</span>
							</div>
							<input className='view-question-button'  type='button' value='Submit' onClick={this.submitAnswer.bind(this)}/>
						</div>)
					}
					{!this.props.liteView && currentUserAnsweredQuestion && (
						<div>
							<div className={optionOneAnswered ? 'chosen-answer': ''}>
								{this.props.selectedQuestion.optionOne.text}
								<div className='question-results'>
									<div className='question-stat'>{optionOneNumberResultText}</div>
									<div className='question-stat'>{optionOnePercentageResultText}</div>
								</div>
								{optionOneAnswered && (
									<span>You chose this option!</span>)
								}						
							</div>
							<div className={!optionOneAnswered ? 'answered-question-data chosen-answer': 'answered-question-data'}>
								{this.props.selectedQuestion.optionTwo.text}
								<div className='question-results'>
									<div className='question-stat'>{optionTwoNumberResultText}</div>
									<div className='question-stat'>{optionTwoPercentageResultText}</div>
								</div>
								{!optionOneAnswered && (
									<span>You chose this option!</span>)
								}
							</div>
						</div>)
					}
				</div>				
			</div>
		)
	}
}

function mapStateToProps ({questions, users, authUser}, props) {
	let questionKeys = Object.keys(questions);
	let questionArr = questionKeys.map((key) => questions[key]);
	let id = props.id === undefined ? props.match.params.id : props.id;

	return {
		questions: questionArr,
		users,
		selectedQuestion: questions[id],
		authUser, 
		liteView: props.liteView
	}
}

export default withRouter(connect(mapStateToProps)(Question));