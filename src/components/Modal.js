import React from 'react';

const Modal = ({ onClose, results, data }) => {
  return(
    <div className="modalpanel">
      <div className="modalbackground" onClick={onClose}></div>
        <header className="modalheader">
          <h2 className="modal-card-title">Your answers</h2>
        </header>
        <section className="modalcontent">
          <ul>
            {results.map((result, i) => (
              <li key={i} className="answers">
                <p><strong>{result.q}</strong></p>
                <p className={result.a === data[i].answer? "correct":"incorrect"}>Your answer: {result.a}</p>
                {result.a !== data[i].answer && <p className="correct">Correct answer: {data[i].answer}</p>}
              </li>
            ))}
          </ul>
        </section>
      </div>
  );
}

export default Modal;