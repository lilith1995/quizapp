import React, { useState, useEffect } from "react";
import Home from "./components/Home";
import Questions from "./components/Questions";
import End from "./components/End";
import Answers from "./components/Answers";

import "./App.scss";

const App = () => {
  const [step, setStep] = useState(1);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);

  const quizStartHandler = () => {
    setStep(2);
  };

  const resetClickHandler = () => {
    setActiveQuestion(0);
    setAnswers([]);
    setStep(2);
  };

  useEffect(() => {
    const handleRequest = async () => {
       var headers = {}
      try {
        const res = await fetch("http://localhost:3080/api/questions", {
          method: "GET",
          mode: "cors",
          headers: headers
        })
        console.info("RESPONSE", await res.clone().json());
        const data = await res.json();
        setData([...data]);
      } catch (e) {
        console.error("failed to fetch", e);
      }
    };
    handleRequest();
  }, []);

  return (
    <div className="App">
      {step === 1 && <Home onQuizStart={quizStartHandler} />}
      {step === 2 && (
        <Questions
          data={data[activeQuestion]}
          onAnswerUpdate={setAnswers}
          numberOfQuestions={data.length}
          activeQuestion={activeQuestion}
          onSetActiveQuestion={setActiveQuestion}
          onSetStep={setStep}
        />
      )}
      {step === 3 && (
        <End
          results={answers}
          data={data}
          onReset={resetClickHandler}
          onAnswersCheck={() => setShowModal(true)}
        />
      )}

      {showModal && (
        <Answers
          onClose={() => setShowModal(false)}
          results={answers}
          data={data}
        />
      )}
    </div>
  );
};

export default App;
