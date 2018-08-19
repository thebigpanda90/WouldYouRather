import { _saveQuestion, _saveQuestionAnswer } from '../_DATA'
import { getUsersAndQuestions } from './shared'
import { receiveUsers } from './users'
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

export function addQuestion(question) {
	return {
		type: ADD_QUESTION,
		question
	}
}

export function addQuestionAndSync(question) {
	return (dispatch) => {
		return _saveQuestion(question)
			.then((formattedQuestion) => {
				dispatch(addQuestion(formattedQuestion));
			});
	};
}

export function submitAnswerAndSync(question) {
	return (dispatch) => {
		return _saveQuestionAnswer(question)
			.then(() => {
				getUsersAndQuestions()
				.then((values) => {					
			        dispatch(receiveUsers(values[0]));
			        dispatch(receiveQuestions(values[1]));
				});
			});
	};
}