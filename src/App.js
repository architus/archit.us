import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer"

import Login from "./login/Login";
import Home from "./home/Home";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <div>
          <Route exact path="/" component={Login} />
          <Route exact path="/home" component={Home} />
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
