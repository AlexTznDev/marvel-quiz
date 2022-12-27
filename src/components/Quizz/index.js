import React, { Component, Fragment } from 'react'
import Levels from '../Levels'
import ProgressBar from '../ProgressBar'
import { QuizMarvel } from '../QuizMarvel'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import QuizOver from '../QuizOver';
import { FaChevronRight } from 'react-icons/fa'



const initialState = {
  levelNames: ["debutant", "confirme", "expert"],
  quizLevel: 0,
  maxQuestions: 10,
  storedQuestions: [],
  question: null,
  option: [],
  idQuestion: 0,
  btnDisable: true,
  userAnwer: null,
  score: 0,
  showWelcome: false,
  percent: null,
  quizEnd: false
}

class Quiz extends Component {

  constructor(props) {

    super(props)

    this.state = initialState

    this.storeDataRef = React.createRef()
  }








  loadQuestions = quizz => {

    const fetchArrayQuiz = QuizMarvel[0].quizz[quizz]

    if (fetchArrayQuiz.length >= this.state.maxQuestions) {
      //methode map en enlevant des données a ne pas presenter type reponse avec la methode app
      //answer + ... pour dire le reste au quel on donne un nom dans ce cas 
      //keepRest

      //permet de creer un curent pour y enregistrer le tableau avec cette fois ci la reponse pour comparer la reponse du prospet et la reponse juste
      this.storeDataRef.current = fetchArrayQuiz



      const newArray = fetchArrayQuiz.map(({ answer, ...keepRest }) => keepRest);

      this.setState({ storedQuestions: newArray })


    } 
  }


  loadLevelQuestion = param => {

    this.setState({
      ...initialState,
      quizLevel: param,
    })
    // console.log(param); 
    // console.log(this.state)
    this.loadQuestions(this.state.levelNames[param])
  }


  showToastMsg = (pseudo) => {
    if (this.state.showWelcome === false) {

      this.setState({
        showWelcome: true
      }
      )

      toast(`welcome ${pseudo}, et bonne chance!`, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }




  componentDidMount() {


    this.loadQuestions(this.state.levelNames[this.state.quizLevel]);


  }


  componentDidUpdate(prevProps, prevState) {


    //un destructuring serait possible de la meme facon que dans le render mais je prefere le garder avec les
    //this. pour pouvoir garder cette methode aussi 

    if (this.state.storedQuestions !== prevState.storedQuestions) {

      this.setState({
        question: this.state.storedQuestions[this.state.idQuestion].question,
        option: this.state.storedQuestions[this.state.idQuestion].options,
      })

    }
    if (this.state.idQuestion !== prevState.idQuestion) {
      this.setState({
        question: this.state.storedQuestions[this.state.idQuestion].question,
        option: this.state.storedQuestions[this.state.idQuestion].options,
        userAnwer: null,
        btnDisable: true
      })
    }
    if (this.state.quizEnd !== prevState.quizEnd) {
      const gradePercent = this.getPercent(this.state.maxQuestions, this.state.score);
      this.gameOver(gradePercent)
    }

    if (this.props.userData.pseudo !== prevProps.userData.pseudo) {
      this.showToastMsg(this.props.userData.pseudo)
    }
  }

  submitAnswer = (selectedAnswer) => {
    this.setState({
      userAnwer: selectedAnswer,
      btnDisable: false
    })
  }
  nextQuestion = () => {
    if (this.state.idQuestion === this.state.maxQuestions - 1) {

      this.setState(
        {
          quizEnd: true
        }
      )

    } else {
      this.setState((prevState) => ({
        idQuestion: prevState.idQuestion + 1,

      }))
    }
    const goodAnswer = this.storeDataRef.current[this.state.idQuestion].answer;
    if (this.state.userAnwer === goodAnswer) {
      this.setState(prevState => ({
        score: prevState.score + 1
      }))
      toast.success('Bravo +1', {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error('Raté O point', {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }



  }

  getPercent = (maxQuest, ourScore) => (ourScore / maxQuest) * 100;


  gameOver = (percent) => {



    if (percent >= 50) {


      this.setState({
        quizLevel: this.state.quizLevel + 1,
        percent: percent,
        quizEnd: true
      }
      )
    } else {
      this.setState({
        percent: percent,
      }
      )
    }


  }

  render() {

//destructuring state

    const {
      levelNames,
      quizLevel,
      maxQuestions,
      question,
      option,
      idQuestion,
      btnDisable,
      userAnwer,
      score,
      percent,
      quizEnd
    } = this.state

//fin destructuring


    const displayOption = option.map((option, index) => {
      return (
        <p
          key={index}
          className={`answerOptions ${userAnwer === option ? 'selected' : null}`}
          onClick={() => this.submitAnswer(option)}>
          <FaChevronRight />  {option}</p>
      )
    })


    return quizEnd ?
      (<QuizOver
        ref={this.storeDataRef}
        levNames={levelNames}
        score={score}
        maxQuestions={maxQuestions}
        quizLevel={quizLevel}
        percent={percent}
        loadLevelQuestion={this.loadLevelQuestion}

      />) : (
        <Fragment>
          <ToastContainer />

          <Levels
            levelNames={levelNames}
            quizLevel={quizLevel}
          />

          <ProgressBar
            idQuestion={idQuestion}
            maxQuestions={maxQuestions} />

          <h2>{question}</h2>
          {displayOption}

          <button
            disabled={btnDisable}
            className='btnSubmit'
            onClick={this.nextQuestion}
          >{idQuestion < maxQuestions - 1 ? ('Suivant') : ('Terminer')}</button>
        </Fragment>
      )

  }
}

export default React.memo(Quiz)
