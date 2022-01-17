import React, { useState, useEffect, useRef } from 'react';
import CircularIndeterminate from "../Loader/Loader";

export const AllData = React.createContext({});


const Home = ({ onQuizStart }) => {

  const [user, setUser] = useState({
    id: "",
    name: "",
    email: ""
  });

  const [loading, setLoading] = useState(false);

  const getCurrentUser = () => {
    fetch('api/users/current', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(res => res.json())
      .then(data => {
        setUser(data);
        console.log(data)
        setLoading(false)
      })
  }

  useEffect(getCurrentUser, [])

  if (loading) {
    return (
      <CircularIndeterminate />
    )
  }
  else {
    return (
      <div className="homepanel">
        <AllData.Provider value={{ user, setUser }} >
          <div className="homepanel_content">
            <h1>Can you get the perfect score {user.name}?</h1>
            <h2>Start and try!</h2>
            <button className="buttonstart" onClick={onQuizStart}>Check it out</button>
          </div>
        </AllData.Provider>
      </div>
    );
  }
}
export default Home;