import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import App from "./App";
import Videoplayer from "./videoplayer/Videoplayer";

describe("App", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  test("should have the `video` element", () => {
    expect(wrapper.contains(<Videoplayer />)).toBe(true);
  });
});
