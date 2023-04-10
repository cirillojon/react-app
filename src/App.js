import React, { Component } from "react";
import "./App.css";
import Routes from "./routes";
import Navbar from "./Navbar";
import LambdaDemo from "./LambdaDemo"; 
import './theme.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Routes />
        <LambdaDemo />
      </div>
    );
  }
}

export default App;
