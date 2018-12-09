import React, { Component } from "react";
import "./App.scss";
import Videoplayer from "./videoplayer/Videoplayer";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faStop,
  faPlay,
  faPause,
  faFastForward,
  faFastBackward
} from "@fortawesome/free-solid-svg-icons";

library.add(faStop, faPlay, faPause, faFastForward, faFastBackward);
class App extends Component {
  render() {
    return (
      <div className="App">
        <Videoplayer />
      </div>
    );
  }
}

export default App;
