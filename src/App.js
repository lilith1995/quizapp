import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import Quiz from "./components/Quiz/Quiz";

import './App.scss';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/auth">
          {localStorage.token ? <Redirect to='/' /> : <Auth />}
        </Route>
        <Route path='/'>
          {localStorage.token ? <Quiz /> : <Redirect to='/auth' />}
        </Route>
        {/* <Route path='/admin'> <Admin /> </Route> */}
      </Switch>
    </Router>
  );
}
export default App;