import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import axios from 'axios';

import { AuthContext } from './helpers/AuthContext';
import Admin from "./components/Admin/Admin";
import Auth from "./components/Auth/Auth";
import Quiz from "./components/Quiz/Quiz";


import './App.scss';


function App() {

  const [authState, setAuthState] = useState(false);

  useEffect(() => {
    axios.get('/api/auth', {
      headers: {
      accessToken: localStorage.getItem('accessToken'),
    }}).then((response) => {
      if (response.data.error) {
        setAuthState(false)
      } else {
        setAuthState(true);
      }
    })
  }, []);


  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Switch>
          <Route path="/auth">
            {authState ? <Redirect to='/' /> : <Auth />}
          </Route>
          <Route path="/">
            {authState ? <Quiz /> : <Redirect to='/auth' />}
          </Route>
          <Route path="/admin">
            {authState ? <Admin /> : <Redirect to='/auth' />}
          </Route>
        </Switch>
      </AuthContext.Provider>
    </BrowserRouter >
  );
}

export default App;