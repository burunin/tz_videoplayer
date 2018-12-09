import React, { Component } from "react";
import "./App.css";
import Header from "./common/Header";
import Videoplayer from "./videoplayer/Videoplayer";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStop, faPlay } from "@fortawesome/free-solid-svg-icons";

library.add(faStop, faPlay);
class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Videoplayer />
      </div>
    );
  }
}

export default App;
