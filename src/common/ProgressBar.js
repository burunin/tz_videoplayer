import React, { Component } from "react";
import "./ProgressBar.css";

export default class ProgressBar extends Component {
  getInitialState() {
    return {
      value: "0%"
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }
  onInputRangeChanged = (event, data) => {
    console.log(data);
    console.log(event);
    this.setState({
      value: data.value + "%"
    });
  };

  render() {
    var style = {
      width: this.state.value
    };

    return (
      <div className="progress">
        <div className="progress__bar" style={style} />
        <span className="progress__value">{this.state.value}</span>
      </div>
    );
  }
}
