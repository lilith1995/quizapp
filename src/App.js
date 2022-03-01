import React, { useCallback, useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import axios from 'axios';
import { useHistory } from "react-router-dom";

import { AuthContext } from './helpers/AuthContext';
import Admin from "./components/Admin/Admin";
import Auth from "./components/Auth/Auth";
import Quiz from "./components/Quiz/Quiz";


import './App.scss';

function App() {

  const history = useHistory();

  const [authState, setAuthState] = useState({
    name: "",
    isAdmin: false,
    status: false
  });
  const token = localStorage.getItem('accessToken');
  console.log(token);

  const handlerequest = async () => {
    try {

      const res = await axios.get('/api/auth', {
        headers: {
          "x-auth-token": token,
        }
      })
      console.log(res, "res");
      setAuthState({
        ...authState, isAdmin: res.data.isAdmin
      });
      console.log(authState)
    } catch (err) {
      console.log(err, "err")
      setAuthState({ ...authState, status: false })

    }
  }

  useEffect(() => {
    handlerequest();
  }, []);

  console.log("isAdmin", authState.isAdmin);
  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Switch>
          <Route path="/auth">
            {!authState.status ? <Auth /> : <Redirect to='/' />}
          </Route>
          <Route path="/" exact component={Quiz} />
          <Route path="/admin">
            {authState.isAdmin ? <Admin /> : () => <Redirect to='/' />}
          </Route>
        </Switch>
      </AuthContext.Provider>
    </BrowserRouter >
  );
}

export default App;