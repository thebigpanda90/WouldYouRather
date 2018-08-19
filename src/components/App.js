import React, { Component } from 'react';
import Login from './Login'
import Question from './Question'
import QuestionsContainer from './QuestionsContainer'
import NewQuestion from './NewQuestion'
import NavBar from './NavBar'
import UserCard from './UserCard'
import { handleInitialData } from '../actions/shared'
import { connect } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import '../App.css'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">          
          <NavBar />
          <Route path='/leaderboard' exact component={UserCard} />
          <Route path='/add' exact component={NewQuestion} />
          <Route path='/logout' exact component={Login} />
          <Route path='/' exact component={QuestionsContainer} />
          <Route path='/question/:id' component={Question} />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect()(App);


/*
  There should always be a logged in user, redir if direct route is hit.
  login/logout functionality)


  LoginScreen - 
    LoginComponent

  PollDetailsScreen - (questions/question_id)
    Answered Polls
    UnAnswered Polls

  NewQuestionScreen

  LeaderBoardScreen

  NavigationComponent
*/