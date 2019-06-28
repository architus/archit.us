import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

import Header from "./components/Header";
import RestrictedRoute from "./components/RestrictedRoute";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <main>
          <Switch>
            <Route exact path="/" component={Index} />
            <Route exact path="/login" component={Login} />
            <RestrictedRoute exact path="/home" component={Home} />
            <Route component={NotFound} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
