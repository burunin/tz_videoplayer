import React from "react";
import ReactDOM from "react-dom";
import { shallow, mount } from "enzyme";
import Videoplayer from "./Videoplayer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
jest.useFakeTimers();

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

  test("check Constructor", () => {
    wrapper.instance().super = jest.fn();
    expect(wrapper.state()).toEqual({
      mediaTime: 0,
      progress: 0,
      currentTime: 0,
      paused: false
    });
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
      wrapper.instance().play();
      expect(wrapper.state().paused).toBe(false);
    });

    test("check play", () => {
      wrapper = mount(<Videoplayer />);
      wrapper.instance().video.current.pause = jest.fn();
      wrapper.instance().pause();
      expect(wrapper.state().paused).toBe(true);
    });

    test("check play", () => {
      wrapper = mount(<Videoplayer />);
      wrapper.instance().video = {
        current: {
          paused: true
        }
      };
      wrapper.instance().video.current.play = jest.fn();
      wrapper.instance().video.current.pause = jest.fn();
      wrapper.find(".control-icon.play").simulate("click");
      expect(wrapper.state().paused).toBe(false);
    });

    test("check play", () => {
      wrapper = mount(<Videoplayer />);
      wrapper.instance().video = {
        current: {
          paused: false
        }
      };
      wrapper.instance().video.current.play = jest.fn();
      wrapper.instance().video.current.pause = jest.fn();
      wrapper.find(".control-icon.play").simulate("click");
      expect(wrapper.state().paused).toBe(true);
    });

    test("check pause", () => {
      wrapper = mount(<Videoplayer />);
      wrapper.instance().video.current.pause = jest.fn();
      wrapper.find(".stop.control-icon").simulate("click");
      expect(wrapper.instance().video.current.pause).toHaveBeenCalled();
      expect(wrapper.state().paused).toBe(true);
      expect(wrapper.instance().intervalFwd).toBeUndefined();
      expect(wrapper.instance().intervalRwd).toBeUndefined();
    });

    test("check mediaBackward", () => {
      wrapper = mount(<Videoplayer />);
      wrapper.instance().video.current.play = jest.fn();
      wrapper.instance().video.current.pause = jest.fn();
      wrapper.instance().windBackward = jest.fn().mockImplementation(() => 1);
      wrapper.find(".rwd.control-icon").simulate("click");
      jest.useFakeTimers();
      expect(wrapper.instance().windBackward()).toEqual(1);
      expect(wrapper.instance().intervalRwd).toBe(1);
    });

    test("check mediaForward", () => {
      wrapper = mount(<Videoplayer />);
      wrapper.instance().video.current.play = jest.fn();
      wrapper.instance().video.current.pause = jest.fn();
      wrapper.instance().windForward = jest.fn().mockImplementation(() => 1);
      wrapper.find(".fwd.control-icon").simulate("click");
      jest.useFakeTimers();
      expect(wrapper.instance().windForward()).toEqual(1);
      expect(wrapper.instance().intervalFwd).toBe(2);
    });

    test("check windBackward stop", () => {
      wrapper.instance().stopMedia = jest.fn().mockReturnValue(1);
      var mockVideo = { currentTime: 0, duration: 0 };
      wrapper.instance().windBackward(mockVideo);
      expect(wrapper.instance().stopMedia()).toBe(1);
    });

    test("check windForward stop ", () => {
      var mockVideo = {
        currentTime: 0,
        duration: 0
      };
      wrapper.instance().stopMedia = jest.fn().mockReturnValue(1);
      wrapper.instance().windForward(mockVideo);
      expect(wrapper.instance().stopMedia()).toBe(1);
    });

    test("check windBackward forward", () => {
      wrapper.instance().stopMedia = jest.fn().mockReturnValue(1);
      var mockVideo = { currentTime: 5, duration: 0 };
      wrapper.instance().windBackward(mockVideo);
      expect(mockVideo.currentTime).toBe(3);
    });

    test("check windForward forward", () => {
      var mockVideo = { currentTime: 5, duration: 20 };
      wrapper.instance().stopMedia = jest.fn().mockReturnValue(1);
      wrapper.instance().windForward(mockVideo);
      expect(mockVideo.currentTime).toBe(7);
    });

    test("check setTime", () => {
      wrapper.instance().video = {
        current: {
          currentTime: 3,
          duration: 15
        }
      };
      wrapper.instance().timerWrapper = {
        current: { clientWidth: 100 }
      };

      wrapper.find(".video-screen").simulate("timeUpdate");
      wrapper.instance().setTime();
      expect(wrapper.state().mediaTime).toBe("00:03");
      expect(wrapper.state().progressBarLength).toBe(20);
    });

    test("check setTime", () => {
      wrapper.instance().video = {
        current: { currentTime: 50, duration: 150 }
      };
      wrapper.instance().timerWrapper = { current: { clientWidth: 300 } };

      wrapper.find(".video-screen").simulate("timeUpdate");
      wrapper.instance().setTime();
      expect(wrapper.state().mediaTime).toBe("00:50");
      expect(wrapper.state().progressBarLength).toBe(100);
    });
  });
});
