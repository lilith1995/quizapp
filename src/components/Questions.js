import React, { useState, useEffect, useRef } from "react";
import ProgressBar from "./ProgressBar";
import CircularIndeterminate from "./Loader";


const Questions = ({
  data,
  onAnswerUpdate,
  numberOfQuestions,
  activeQuestion,
  onSetActiveQuestion,
  onSetStep,
}) => {
  let [percentRange, setProgress] = useState(0);
  const [checked, setChecked] = useState("");
  const [error, setError] = useState("");
  const radiosWrapper = useRef();
  const [loading, setLoading] = useState(false);

  const changeHandler = (e) => {
    setChecked(e.target.value);
    if (error) {
      setError("");
    }
  };

  const nextClickHandler = (e) => {
    if (checked === "") {
      return setError("Please select one option!");
    }
    if (!loading) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false)
      }, 2000)
    }
    onAnswerUpdate(prevState => [...prevState, { q: data.question, a: checked }]);
    setChecked('');
    setProgress(percentRange < 100 ? percentRange + 10 : 100)
    if (activeQuestion < numberOfQuestions - 1) {
      onSetActiveQuestion(activeQuestion + 1);
    } else {
      onSetStep(3);
    }
  };
  useEffect(() => {
    if (loading === true) {
    }
    else {
      const findCheckedInput = radiosWrapper.current.querySelector('input:checked');
      if (findCheckedInput) {
        findCheckedInput.checked = false;
      }
    }

  }, [data]);
  
  return (
    <>
      {loading ? <CircularIndeterminate /> :
        <div className="questionspanel">
          <ProgressBar percentRange={percentRange} />
          <h2 className="question">{data.description}</h2>
          <div className="control" ref={radiosWrapper}>
            {data.choices.map((choices, i) => (
              <label className="radio" key={i}>
                <input
                  type="radio"
                  name="answer"
                  value={choices}
                  onChange={changeHandler}
                />
                {choices}
              </label>
            ))}
          </div>
          {error && <div className="errortext">{error}</div>}
          <button className="buttonnext" onClick={nextClickHandler}>
            Next Question
          </button>
        </div>
      }
  </>
  )
}

export default Questions;
