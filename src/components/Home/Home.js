import React, { useState, useEffect, useRef } from 'react';
import CircularIndeterminate from "../Loader/Loader";

const Home = ({ onQuizStart }) => {

  const [user, setUser] = useState({
    id: "",
    name: "",
    email: ""
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCurrentUser = async (e) => {
      var headers = {}
      try {
        const res = await fetch("/api/users/current", {
          method: "GET",
          mode: "cors",
          headers: headers
        })
        console.info("RESPONSE", await res.clone().json());
        const data = await res.json();
        setUser([...data]);
      } catch (e) {
        console.error("failed to fetch", e);
      }
    };
    getCurrentUser();
  }, []);

  if (loading) {
    return (
      <CircularIndeterminate />
    )
  }
  else {
    return (
      <div className="homepanel">
        <div className="homepanel_content">
          <h1>Can you get the perfect score?{user.name}</h1>
          <h2>Start and try!</h2>
          <button className="buttonstart" onClick={onQuizStart}>Check it out</button>
        </div>
      </div>
    );
  }
}
export default Home;