import React, { Component } from "react";
import "./App.css";
import Routes from "./routes";
import Navbar from "./Navbar";
import LambdaDemo from "./LambdaDemo"; // Make sure the path is correct

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
