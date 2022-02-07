import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import CircularIndeterminate from "../Loader/Loader";

const Home = ({ onQuizStart }) => {

  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState(null)



  // useEffect(() => {
  //   axios.get("/api/users/current").then((response) => {
  //     setUser(response.data);
  //   });
  // }, []);

  // useEffect(() => {
  //   const loggedInUser = localStorage.getItem("isAuthenticated");
  //   if (loggedInUser) {
  //     const foundUser = JSON.parse(loggedInUser);
  //     setUser(foundUser);
  //   }
  // }, []);

  if (loading) {
    return (
      <CircularIndeterminate />
    )
  }
  else {
    return (
      <div className="homepanel">

        <div className="homepanel_content">
          <h1>Can you get the perfect score?{user}</h1>
          <h2>Start and try!</h2>
          <button className="buttonstart" onClick={onQuizStart}>Check it out</button>
        </div>
      </div>
    );
  }
}
export default Home;