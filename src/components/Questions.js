
import React, { useState, useRef } from 'react';
import ProgressBar from './ProgressBar';

const Questions = ({ data, onAnswerUpdate, numberOfQuestions, activeQuestion, onSetActiveQuestion, onSetStep }) => {
  let [percentRange, setProgress] = useState(0);
  const [selected, setSelected] = useState('');
  const [error, setError] = useState('');
  const radiosWrapper = useRef();
  const [loading, setLoading] = useState(false);

  const changeHandler = (e) => {
    setSelected(e.target.value);
    if (error) {
      setError('');
    }
  };
  
  const nextClickHandler = (e) => {
    if (selected === '') {
      return setError('Please select one option!');
    }
    setLoading(true)
    setTimeout(() => {
      onAnswerUpdate(prevState => [...prevState, { q: data.question, a: selected }]);
      setLoading(false);
     setProgress(percentRange < 100 ? percentRange + 10 : 100)
    if (activeQuestion < numberOfQuestions - 1) {
      onSetActiveQuestion(activeQuestion + 1);
    } else {
      onSetStep(3);
      setSelected(false);
      }
      },3000)
  }

  return(
    <div className="questionspanel">
      <ProgressBar percentRange={percentRange}/>
          <h2 className="question">{data.question}</h2>
          <div className="control" ref={radiosWrapper}>
            {data.choices.map((choice, i) => (
              <label className="radio" key={i}>
                <input type="radio" name="answer" value={choice} checked={choice === selected} onChange ={changeHandler} />
                {choice}
              </label>
            ))}
          </div>
          {error && <div className="errortext">{error}</div>}
      <button className="buttonnext" onClick={nextClickHandler}>{ loading ? ("Loading...") : ("Next Question")}</button>
      </div>
  );
}

export default Questions;