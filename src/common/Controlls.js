import React, { Component } from "react";

export default class Controlls extends Component {
  render() {
    return (
      <div className="controls">
        <button
          className="play"
          onClick={() => this.props.playPauseMedia}
          data-icon="P"
          aria-label="play pause toggle"
        />
        <button
          className="stop"
          onClick={() => this.props.stopMedia}
          data-icon="S"
          aria-label="stop"
        />
        <div className="timer">
          <div />
          <span aria-label="timer">00:00</span>
        </div>
        <button
          className="rwd"
          onClick={() => this.props.videoBackward}
          data-icon="B"
          aria-label="rewind"
        />
        <button
          className="fwd"
          onClick={() => this.props.videoForward}
          data-icon="F"
          aria-label="fast forward"
        />
      </div>
    );
  }
}
