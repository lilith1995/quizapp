import React, { useState } from 'react';

import Home from "./components/Home";
import Questions from "./components/Questions";
import End from './components/End';
import Modal from './components/Modal';

import './App.scss';
import questionnaire from './data/questionnaire.json';


const App = () => {
  const [step, setStep] = useState(1);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showModal, setShowModal] = useState(false);

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
        data={questionnaire.data[activeQuestion]}
        onAnswerUpdate={setAnswers}
        numberOfQuestions={questionnaire.data.length}
        activeQuestion={activeQuestion}
        onSetActiveQuestion={setActiveQuestion}
        onSetStep={setStep}
      />}
      {step === 3 && <End 
        results={answers}
        data={questionnaire.data}
        onReset={resetClickHandler}
        onAnswersCheck={() => setShowModal(true)}
      />}

      {showModal && <Modal 
        onClose={() => setShowModal(false)}
        results={answers}
        data={questionnaire.data}
      />}
    </div>
  );
}


export default App;
