import React, { useState, useEffect, useRef } from "react";
import "./Timer.css";

export const Timer = () => {
  const [second, setSecond] = useState("00");
  const [minute, setMinute] = useState("00");
  const [isActive, setIsActive] = useState(false);
  const [counter, setCounter] = useState(0);

  const [quickButtons, setQuickButtons] = useState({
    set1: {
      numSets: "2 SETS",
      active: "false",
    },
    set2: {
      numSets: "3 SETS",
      active: "false",
    },
    set3: {
      numSets: "5 SETS",
      active: "false",
    },
    on1: {
      duration: "20",
      active: "false",
    },
    on2: {
      duration: "30",
      active: "false",
    },
    on3: {
      duration: "60",
      active: "false",
    },
    off1: {
      duration: "20",
      active: "false",
    },
    off2: {
      duration: "30",
      active: "false",
    },
    off3: {
      duration: "60",
      active: "false",
    },
  });

  useEffect(() => {
    let intervalId;

    if (counter < 0) {
      setIsActive(false);
    }

    if (isActive && counter >= 0) {
      intervalId = setInterval(() => {
        const secondCounter = counter % 60;
        const minuteCounter = Math.floor(counter / 60);

        const computedSecond =
          String(secondCounter).length === 1
            ? `0${secondCounter}`
            : secondCounter;
        const computedMinute =
          String(minuteCounter).length === 1
            ? `0${minuteCounter}`
            : minuteCounter;

        setSecond(computedSecond);
        setMinute(computedMinute);

        setCounter((counter) => counter - 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isActive, counter]);

  return (
    <div className="content-wrapper">
      <div className="timer-display">
        <div className="timer text">
          <span className="minute">{minute}</span>
          <span>:</span>
          <span className="second">{second}</span>
        </div>
        <div className="text">SETS</div>
      </div>

      <div className="quick-timer-wrapper">
        <div className="quick-timer-btn">
          <button className="btn" onClick={() => {}}>
            {quickButtons.set1.numSets}
          </button>
          <button className="btn">{quickButtons.set2.numSets}</button>
          <button className="btn">{quickButtons.set3.numSets}</button>
        </div>
        <div className="quick-timer-btn">
          <button className="btn">{quickButtons.on1.duration}</button>
          <button className="btn">{quickButtons.on2.duration}</button>
          <button className="btn">{quickButtons.on3.duration}</button>
        </div>
        <div className="quick-timer-btn">
          <button className="btn">{quickButtons.off1.duration}</button>
          <button className="btn">{quickButtons.off2.duration}</button>
          <button className="btn">{quickButtons.off3.duration}</button>
        </div>
      </div>
      <div className="start-stop-wrapper">
        <button
          className="btn"
          onClick={() => {
            setCounter(3);
            setIsActive(!isActive);
          }}
        >
          {isActive ? "Pause" : "Start"}
        </button>
        <button className="btn">RESET</button>
      </div>
    </div>
  );
};
