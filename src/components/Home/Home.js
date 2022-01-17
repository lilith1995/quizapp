import React, { useState, useEffect, useRef } from 'react';
import CircularIndeterminate from "../Loader/Loader";

const Home = ({ onQuizStart }) => {

  // const [user, setUser] = useState({
  //   id: "",
  //   name: "",
  //   email: ""
  // });

  const [loading, setLoading] = useState(false);

  // const getCurrentUser = () => {
  //   fetch('api/users/current', {
  //     method: "GET",
  //     headers: {
  //       'Content-Type': 'application/json',
  //     }
  //   }).then(res => res.json())
  //     .then(data => {
  //       setUser(data);
  //       console.log(data)
  //       setLoading(false)
  //     })
  // }

  // useEffect(getCurrentUser, [])

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