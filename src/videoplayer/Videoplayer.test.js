import React from "react";
import ReactDOM from "react-dom";
import { shallow, mount } from "enzyme";
import Videoplayer from "./Videoplayer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faStop,
  faPlay,
  faPause,
  faFastForward,
  faFastBackward
} from "@fortawesome/free-solid-svg-icons";

library.add(faStop, faPlay, faPause, faFastForward, faFastBackward);

describe("App", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Videoplayer />);
  });

  test("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("should have the `video` element", () => {
    expect(
      wrapper.containsMatchingElement(
        <video>
          <source />
        </video>
      )
    ).toBe(true);
  });

  test("should have a `source` element", () => {
    expect(wrapper.containsMatchingElement(<source />)).toBe(true);
  });

  it("should render source element with src attribute", () => {
    const source = wrapper.find("source");
    expect(source.props()).toHaveProperty("src");
  });

  test("pass video events stopMedia", () => {
    wrapper.instance().stopMedia = jest.fn().mockReturnValue(1);
    wrapper.find(".video-screen").simulate("ended");
    expect(wrapper.instance().stopMedia).toHaveBeenCalled();
  });

  describe("Test if controlls working", () => {
    test("click play/pause", () => {
      wrapper.instance().playPauseMedia = jest.fn().mockReturnValue(0);
      wrapper.find(".control-icon.play").simulate("click");
      expect(wrapper.instance().playPauseMedia).toReturn();
    });
    test("click stop", () => {
      wrapper.instance().stopMedia = jest.fn().mockReturnValue(0);
      wrapper.find(".control-icon.stop").simulate("click");
      expect(wrapper.instance().stopMedia).toReturn();
    });

    test("click rewind", () => {
      wrapper.instance().mediaBackward = jest.fn().mockReturnValue(0);
      wrapper.find(".control-icon.rwd").simulate("click");
      expect(wrapper.instance().mediaBackward).toReturn();
    });

    test("click fast-forward", () => {
      wrapper.instance().mediaForward = jest.fn().mockReturnValue(0);
      wrapper.find(".control-icon.fwd").simulate("click");
      expect(wrapper.instance().mediaForward).toReturn();
    });
  });

  test("pass video events setTime", () => {
    wrapper.instance().setTime = jest.fn().mockReturnValue(1);
    wrapper.find(".video-screen").simulate("timeUpdate");
    expect(wrapper.instance().setTime).toHaveBeenCalled();
  });

  describe("test methods", () => {
    test("check stopMedia", () => {
      wrapper = mount(<Videoplayer />);
      wrapper.instance().pause = jest.fn();
      const e = { stopPropagation: jest.fn().mockReturnValue(1) };
      wrapper.find(".control-icon.stop").simulate("click");
      expect(wrapper.instance().pause).toHaveBeenCalled();
      expect(wrapper.instance().stopMedia()).toBe(0);
      expect(wrapper.instance().stopMedia(e)).toBe(1);
    });

    test("check play", () => {
      wrapper = mount(<Videoplayer />);
      wrapper.instance().video.current.play = jest.fn();
      wrapper.find(".control-icon.play").simulate("click");
      expect(wrapper.instance().video.current.play).toHaveBeenCalled();
      expect(wrapper.state().paused).toBe(false);
    });

    test("check pause", () => {
      wrapper = mount(<Videoplayer />);
      wrapper.instance().video.current.pause = jest.fn();
      wrapper.find(".stop.control-icon").simulate("click");
      expect(wrapper.instance().video.current.pause).toHaveBeenCalled();
      expect(wrapper.state().paused).toBe(true);
    });

    test("check pausePlayMedia1", () => {});
    test("check pausePlayMedia2", () => {});
  });
});
