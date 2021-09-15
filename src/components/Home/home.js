import React from 'react';

import "./home.scss";

const Home = ({onStartClick }) => {
    return (
        <div className="home">
                <div className="content">
                    <h1>Can You Get A Perfect Score?</h1>
                    <p>Start the quiz and try!</p>
                    <button className="startbutton" onclick ={onStartClick}>Let's go!</button>
                </div>
            </div>

    )
}

export default Home;