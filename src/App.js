import React from 'react';
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import Quiz from "./components/Quiz/Quiz";


import './App.scss';
const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/auth">
          <Auth />
        </Route>
        <Route path='/'> <Quiz /></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;