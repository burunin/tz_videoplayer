import React, { Component } from "react";
import source from "../../src/assets/video.mp4";
import "./Videoplayer.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Videoplayer extends Component {
  constructor(props) {
    super(props);
    this.state = { mediaTime: 0, progress: 0, currentTime: 0, paused: false };
    this.video = React.createRef();
    this.timerWrapper = React.createRef();
    this.intervalFwd = undefined;
    this.intervalRwd = undefined;
  }

  componentDidMount() {
    return this.video.current.canplay ? this.play() : 0;
  }

  stopMedia(e) {
    this.pause();
    this.video.current.currentTime = 0;
    clearInterval(this.intervalRwd);
    clearInterval(this.intervalFwd);
    return e ? e.stopPropagation() : 0;
  }

  play() {
    this.setState({ paused: false });
    return this.video.current.play();
  }

  pause() {
    this.setState({ paused: true });
    return this.video.current.pause();
  }

  playPauseMedia() {
    clearInterval(this.intervalRwd);
    clearInterval(this.intervalFwd);
    if (this.video.current.paused) {
      this.video.current.play();
      this.setState({
        paused: false
      });
    } else {
      this.video.current.pause();
      this.setState({
        paused: true
      });
    }
  }

  mediaBackward() {
    clearInterval(this.intervalFwd);
    clearInterval(this.intervalRwd);
    this.pause();
    this.intervalRwd = setInterval(
      () => this.windBackward(this.video.current),
      200
    );
  }

  mediaForward() {
    clearInterval(this.intervalFwd);
    clearInterval(this.intervalRwd);
    this.pause();
    this.intervalFwd = setInterval(
      () => this.windForward(this.video.current),
      200
    );
  }

  windBackward(video) {
    if (video.currentTime <= 2) {
      this.stopMedia();
    } else {
      video.currentTime -= 2;
    }
  }

  windForward(video) {
    if (video.currentTime >= video.duration - 2) {
      this.stopMedia();
    } else {
      video.currentTime += 2;
    }
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
        <div className="video-container">
          <video
            autoPlay={true}
            className="video-screen"
            ref={this.video}
            onTimeUpdate={() => this.setTime()}
            onEnded={() => this.stopMedia()}
          >
            <source src={source} type="video/mp4" />
          </video>
        </div>
        <div className="controls">
          <div
            className="control-icon play"
            onClick={() => this.playPauseMedia()}
          >
            {this.state.paused ? (
              <FontAwesomeIcon
                icon="play"
                size="2x"
                className="control-icon play"
              />
            ) : (
              <FontAwesomeIcon
                icon="pause"
                size="2x"
                className="control-icon pause"
              />
            )}
          </div>
          <div className="control-icon stop" onClick={e => this.stopMedia(e)}>
            <FontAwesomeIcon icon="stop" size="2x" className="stop" />
          </div>
          <div
            className="control-icon rwd"
            onClick={() => this.mediaBackward()}
          >
            <FontAwesomeIcon icon="fast-backward" size="2x" className="stop" />
          </div>
          <div className="control-icon fwd" onClick={() => this.mediaForward()}>
            <FontAwesomeIcon icon="fast-forward" size="2x" className="stop" />
          </div>
          <div className="timer" ref={this.timerWrapper}>
            <div style={progressWidth} />
            <span>{this.state.mediaTime}</span>
          </div>
        </div>
      </div>
    );
  }
}
