import React, { useState, useEffect } from "react";
import Home from "../Home/Home";
import Questions from "./Questions";
import End from "./End";
import Answers from "./Answers";

import { Link } from "react-router-dom";
import "./Quiz.scss";

const Quiz = () => {
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
                const res = await fetch("/api/questions", {
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

    const handleExit = () => {
        localStorage.clear();
        window.location.pathname = "/auth";
    };

    return (
        <div className="container">
            <a href="/admin" className="adminpage">
                <Link to='/admin'> <button className="buttonexit">Admin Page</button></Link>

            </a>
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

            <button className="buttonexit" onClick={handleExit}>
                Log Out
            </button>
        </div>
    );
};

export default Quiz;