// import React, { useState, useEffect, useRef } from 'react';

import "./questions.scss"

const Questions = ({ }) => {
    const nextclickhandler = (e) => {

    }
    return (
        <div className="main">
            <div className="content">
                <h1>Question</h1>
                <label className="radio">
                    <input type="radio" name="answer" value="" onChange={() => { }} />
                    Choice here
                </label>
                <label className="radio">
                    <input type="radio" name="answer" value="" onChange={() => { }} />
                    Choice here
                </label>
                <label className="radio">
                    <input type="radio" name="answer" value="" onChange={() => { }} />
                    Choice here
                </label>
                <label className="radio">
                    <input type="radio" name="answer" value="" onChange={() => { }} />
                    Choice here
                </label>
                <div className="message">error here</div>
                <button className="startbutton" onclick={nextclickhandler}>Next</button>
            </div>
        </div>)
};

export default Questions;