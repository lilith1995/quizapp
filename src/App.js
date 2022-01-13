import { BrowserRouter, Switch } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import Quiz from "./components/Quiz/Quiz";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { UserContext } from "./components/context/context";
import { useEffect } from "react";

import './App.scss';

function App() {
  useEffect(() => {
    const getData = async () => {
      if (localStorage["token"]) {
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "x-access-token": localStorage["token"]
          }
        }

        const res = await fetch('/api/home/dashboard', options);
        const data = await res.json();
        console.log(data)
      }
    }
    getData();
  });

  return (
    <BrowserRouter>
      <Switch>
        <UserContext.Provider value={"aukgfh"}>
          <div className="App">
            <ProtectedRoute path={"/auth"} isAuth component={Auth} />
            <ProtectedRoute path={"/"} component={Quiz} />
          </div>
        </UserContext.Provider>
      </Switch>
    </BrowserRouter>
  )
}

export default App;