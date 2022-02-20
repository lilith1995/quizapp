import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import axios from 'axios';

import { AuthContext } from './helpers/AuthContext';
import Admin from "./components/Admin/Admin";
import Auth from "./components/Auth/Auth";
import Quiz from "./components/Quiz/Quiz";


import './App.scss';
import { faLessThan } from '@fortawesome/free-solid-svg-icons';


function App() {

  const [authState, setAuthState] = useState({
    name: "",
    status: false
  });

  useEffect(() => {
    axios.get('/api/auth', {
      headers: {
      accessToken: localStorage.getItem('accessToken'),
    }}).then((response) => {
      if (response.data.error) {
        setAuthState({...authState, status: false})
      } else {
        setAuthState({
          name: response.data.name,
          status: true
        });
      }
    })
  }, []);

  const handleExit = () => {
    localStorage.clear();
    setAuthState({ ...authState, status: false })
  };

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Switch>
          <Route path="/auth">
            {!authState.status ? <Auth /> : <Redirect to='/' />}
          </Route>
          <Route path="/" exact component={Quiz} />
          <Route path="/admin" exact component={Admin} />
        </Switch>
      </AuthContext.Provider>
    </BrowserRouter >
  );
}

export default App;