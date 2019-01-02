import React, { Component } from 'react';
import './App.css';
import quizQuestions from './api/quizQuestions4';
import Quiz from './components/Quiz';
import update from 'immutability-helper';
import Result from './components/Result';
import { shuffle } from 'lodash';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
     counter: 0,
     questionId: 1,
     question: '',
     answerOptions: [],
     answer: '',
        answersCount: {
         Correct: 0,
         Wrong: 0,
     },
     result: ''
    };
    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
  }
  componentWillMount() {
    const shuffledQuestionOptions = shuffle(quizQuestions);
    const shuffledAnswerOptions = shuffledQuestionOptions.map((question) => shuffle(question.answers));


    this.setState({
      question: shuffledQuestionOptions[0].question,
      answerOptions: shuffledAnswerOptions[0]
    });
  }

  setUserAnswer(answer) {
    const updatedAnswersCount = update(this.state.answersCount, {
      [answer]: {$apply: (currentValue=0) => ++currentValue}
    });
    this.setState({
      answersCount: updatedAnswersCount,
      answer: answer
    });
  }

  setNextQuestion() {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;
    this.setState({
      counter: counter,
      questionId: questionId,
      question: quizQuestions[counter].question,
      answerOptions: shuffle(quizQuestions[counter].answers),
      answer: ''
    });
  }

  handleAnswerSelected(event) {
    this.setUserAnswer(event.currentTarget.value);
    if (this.state.questionId < quizQuestions.length) {
        setTimeout(() => this.setNextQuestion(), 300);
      } else {
        setTimeout(() => this.setResults(this.getResults()), 300);
      }
  }

  getResults() {
    const answersCount = this.state.answersCount;
    const answersCountKeys = Object.keys(answersCount);
    const answersCountValues = answersCountKeys.map((key) => answersCount[key]);
    const maxAnswerCount = Math.max.apply(null, answersCountValues);

    return answersCountKeys.filter((key) => answersCount[key] === maxAnswerCount);
  }

  setResults (result) {
    if (result.length === 1) {
      this.setState({ result: result[0] });
    } else {
      this.setState({ result: result[0] + ' and ' + result[1] });
    }
  }
  renderQuiz() {
      return (
        <Quiz
          answer={this.state.answer}
          answerOptions={this.state.answerOptions}
          questionId={this.state.questionId}
          question={this.state.question}
          questionTotal={quizQuestions.length}
          onAnswerSelected={this.handleAnswerSelected}
        />
      );
    }

    renderResult() {
        return (
            <Result
                quizResult={this.state.answersCount.Correct}
                quizLength={quizQuestions.length}
            />
      );
    }
    render() {
        console.log(this.state.answersCount.Correct);
    return (
      <div className="App">
        <div className="App-header">
          <h2>ITF TKD Quiz programmerad i React av Petri</h2>
          <h3>Beta version</h3>
        </div>
        {this.state.result ? this.renderResult() : this.renderQuiz()}
      </div>
    )
  }
}
export default App;
