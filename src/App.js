import React, { useState, useEffect } from 'react';

import Home from "./components/Home";
import Questions from "./components/Questions";
import End from './components/End';
import Modal from './components/Modal';

import './App.scss';

const App = () => {
  const [step, setStep] = useState(1);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState([]);

const getData=()=>{
    fetch("./questionnaire.json"
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then(function(response){
        console.log(response)
        return response.json();
      })
      .then(function(myJson) {
        console.log(myJson);
        setInput(myJson)
      });
  }
  useEffect(()=>{
    getData()
  },[])

  const quizStartHandler = () => {
    setStep(2);
  }

  const resetClickHandler = () => {
    setActiveQuestion(0);
    setAnswers([]);
    setStep(2);
  }

  return (
    <div className="App">
      {step === 1 && <Home onQuizStart={quizStartHandler} />}
      {step === 2 && <Questions 
        data={input.data[activeQuestion]}
        onAnswerUpdate={setAnswers}
        numberOfQuestions={input.data.length}
        activeQuestion={activeQuestion}
        onSetActiveQuestion={setActiveQuestion}
        onSetStep={setStep}
      />}
      {step === 3 && <End 
        results={answers}
        data={input.data}
        onReset={resetClickHandler}
        onAnswersCheck={() => setShowModal(true)}
      />}

      {showModal && <Modal 
        onClose={() => setShowModal(false)}
        results={answers}
        data={input.data}
      />}
    </div>
  );
}

export default App;
