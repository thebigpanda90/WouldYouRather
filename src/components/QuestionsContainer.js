import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Question from './Question'

class QuestionsContainer extends Component {
	state = {
		showUnAnsweredQuestionsColumn: true
	}

	showUnAnsweredQuestionsColumn(e) {
		e.preventDefault();
		this.setState({
			showUnAnsweredQuestionsColumn: true
		});
	}

	showAnsweredQuestionsColumn(e) {
		e.preventDefault();
		this.setState({
			showUnAnsweredQuestionsColumn: false
		});
	}

	showQuestionIfApplicable(question) {
		let userVotedForOptionOne = question.optionOne.votes.filter((vote) => vote === this.props.authUser).length > 0;
		let userVotedForOptionTwo = question.optionTwo.votes.filter((vote) => vote === this.props.authUser).length > 0;
		if ((this.state.showUnAnsweredQuestionsColumn && !userVotedForOptionTwo && !userVotedForOptionOne) ||
			((!this.state.showUnAnsweredQuestionsColumn && (userVotedForOptionOne || userVotedForOptionTwo)))) {
			return (
					<div key={question.id} >
						<Question id={question.id} liteView={true}/>
					</div>
				);			
		} else {
			return ;
		}
	}

	render() {
		if (this.props.authUser == null) {
			return (<Redirect to='/logout' />);
		}

		return (
			<div className='question-container'>
				<div className='tab-container'>
					<button className={this.state.showUnAnsweredQuestionsColumn ? 'tab-link active' : 'tab-link' } onClick={this.showUnAnsweredQuestionsColumn.bind(this)} >Unanswered Questions</button>
					<button className={!this.state.showUnAnsweredQuestionsColumn ? 'tab-link active' : 'tab-link' } onClick={this.showAnsweredQuestionsColumn.bind(this)} >Answered Questions</button>
				</div>
				<div>
					{this.props.questions.length > 0 && (
						this.props.questions.map((question) => this.showQuestionIfApplicable(question)))
					}
				</div>
			</div>				
		)
	}
}


function mapStateToProps ({questions, users, authUser}) {
	var questionKeys = Object.keys(questions);
	var questionArr = questionKeys.map((key) => questions[key]);
	return {
		questions: questionArr.sort((question1, question2) => question1.timestamp < question2.timestamp),
		users,
		authUser
	}
}

export default connect(mapStateToProps)(QuestionsContainer);