import React, { useEffect, useState } from 'react';

const End = ({ results, data, onReset, onAnswersCheck}) => {
  const [correctAnswers, setCorrectAnswers] = useState(0);

  useEffect(() => {
    let correct = 0;
    results.forEach((result, index) => {
      if(result.a === data[index].answer) {
        correct++;
      }
    });
    setCorrectAnswers(correct);
  }, []);

  return(
    <div className="endpanel">
        <div className="content">
          <h1>Your result</h1>
          <h2>{correctAnswers} of {data.length}</h2>
          <button className="buttonanswers" onClick={onAnswersCheck}>Check your answers</button>
          <button className="buttontry" onClick={onReset}>Try again</button>
        </div>
      </div>
  );
}

export default End;