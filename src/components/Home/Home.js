import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import CircularIndeterminate from "../Loader/Loader";

const Home = ({ onQuizStart }) => {

  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <CircularIndeterminate />
    )
  }
  else {
    return (
      <div className="homepanel">

        <div className="homepanel_content">
          <h1>Can you get the perfect score?</h1>
          <h2>Start and try!</h2>
          <button className="buttonstart" onClick={onQuizStart}>Check it out</button>
        </div>
      </div>
    );
  }
}
export default Home;