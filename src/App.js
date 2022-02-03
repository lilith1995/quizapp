import React from 'react';
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import ProtectedRoute from './util/ProtectedRoute';
import Admin from "./components/Admin/Admin";
import Auth from "./components/Auth/Auth";
import Quiz from "./components/Quiz/Quiz";


import './App.scss';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/auth" component={Auth} />
        <ProtectedRoute exact path='/' component={Quiz} />
        <ProtectedRoute role="admin" exact path="/admin" component={Admin} />
      </Switch>
    </BrowserRouter >
  );
}

export default App;