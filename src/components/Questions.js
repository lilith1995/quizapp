import React, { useState, useEffect, useRef } from 'react';

const Questions = ({ data, onAnswerUpdate, numberOfQuestions, activeQuestion, onSetActiveQuestion, onSetStep }) => {
  const [selected, setSelected] = useState('');
  const [error, setError] = useState('');
  const radiosWrapper = useRef();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const findCheckedInput = radiosWrapper.current.querySelector('input:checked');
    if(findCheckedInput) {
      findCheckedInput.checked = false;
    }
  }, [data]);

  const changeHandler = (e) => {
    setSelected(e.target.value);
    if(error) {
      setError('');
    }
  }
  
  const nextClickHandler = async(e) => {
    if(selected === '') {
      return setError('Please select one option!');
    }
    setLoading(true);
    await fetch("/").then(() => {
    onAnswerUpdate(prevState => [...prevState, { q: data.question, a: selected }]);
    setSelected('');
    if(activeQuestion < numberOfQuestions - 1) {
      onSetActiveQuestion(activeQuestion + 1);
    }else {
      onSetStep(3);
    }
    });
    setLoading(false);
  }

  return(
    <div className="questionspanel">
          <h2 className="question">{data.question}</h2>
          <div className="control" ref={radiosWrapper}>
            {data.choices.map((choice, i) => (
              <label className="radio" key={i}>
                <input type="radio" name="answer" value={choice} onChange={changeHandler} />
                {choice}
              </label>
            ))}
          </div>
          {error && <div className="errortext">{error}</div>}
      <button className="buttonnext" onClick={nextClickHandler}>{ loading ? ("Loding...") : ("Next Question")}</button>
      </div>
  );
}

export default Questions;