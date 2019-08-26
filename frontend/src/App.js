import React, { Component } from "react";
import "./App.css";
import Routes from "./routes";
import AddAnswer from "./components/answer/AddAnswer";

class App extends Component {
  render() {
    return (
      <div>
        <Routes />
      </div>
    );
  }
}

export default App;
