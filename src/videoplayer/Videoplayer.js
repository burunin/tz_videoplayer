import React, { Component } from "react";
import source from "../../src/videoplayer/video.mp4";
import "./Videoplayer.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Videoplayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mediaTime: 0
    };
    this.state = { progress: 0, currentTime: 0 };
    this.video = React.createRef();
    this.timerWrapper = React.createRef();
    this.intervalFwd = undefined;
    this.intervalRwd = undefined;
  }

  stopMedia() {
    this.video.current.pause();
    this.video.current.currentTime = 0;
    // rwd.classList.remove('active');
    // fwd.classList.remove('active');
    clearInterval(this.intervalRwd);
    clearInterval(this.intervalFwd);
    // play.setAttribute('data-icon','P');
  }

  setTime() {
    var minutes = Math.floor(this.video.current.currentTime / 60);
    var seconds = Math.floor(this.video.current.currentTime - minutes * 60);
    var minuteValue;
    var secondValue;

    if (minutes < 10) {
      minuteValue = "0" + minutes;
    } else {
      minuteValue = minutes;
    }

    if (seconds < 10) {
      secondValue = "0" + seconds;
    } else {
      secondValue = seconds;
    }

    this.setState({
      mediaTime: minuteValue + ":" + secondValue,
      progressBarLength:
        this.timerWrapper.current.clientWidth *
        (this.video.current.currentTime / this.video.current.duration)
    });
  }

  render() {
    const progressWidth = { width: this.state.progressBarLength + "px" };

    return (
      <div className="player">
        <video
          autoPlay={true}
          ref={this.video}
          onTimeUpdate={() => this.setTime()}
          onEnded={() => this.stopMedia()}
        >
          <source src={source} type="video/mp4" />
        </video>
        <div className="controls">
          <button className="play">
            <FontAwesomeIcon
              icon="play"
              size="4x"
              className="control-icon play"
            />
          </button>
          <button className="stop" onClick={() => this.stopMedia()}>
            <FontAwesomeIcon
              icon="stop"
              size="4x"
              className="control-icon stop"
            />
          </button>
          <div className="timer" ref={this.timerWrapper}>
            <div style={progressWidth} />
            <FontAwesomeIcon icon="envelope" />
            <span>{this.state.mediaTime}</span>
          </div>
          <button className="rwd" data-icon="B" aria-label="rewind" />
          <button className="fwd" data-icon="F" aria-label="fast forward" />
        </div>
      </div>
    );
  }
}
