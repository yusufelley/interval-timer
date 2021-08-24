import React, { useState, useEffect, useRef } from "react";
import "./Timer.css";

export const Timer = () => {
  const [second, setSecond] = useState("00");
  const [minute, setMinute] = useState("00");
  const [isActive, setIsActive] = useState(false);
  const [counter, setCounter] = useState(0);

  const [quickButtons, setQuickButtons] = useState({
    set1: {
      numSets: "2",
      active: "false",
    },
    set2: {
      numSets: "3",
      active: "false",
    },
    set3: {
      numSets: "5",
      active: "false",
    },
    on1: {
      duration: "5",
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
      duration: "3",
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

  const defaultTimerInstructions = {
    numSets: "0",
    timeOn: "0",
    timeOff: "0",
    currentTimer: "TIME_ON",
    timerStarted: "false",
    resume: "0",
  };

  const [timerInstructions, setTimerInstructions] = useState(
    defaultTimerInstructions
  );

  const handleStart = () => {
    if (timerInstructions.timerStarted) {
      setTimerInstructions({ ...timerInstructions });
    } else {
      setCounter(timerInstructions.timeOn);
      setIsActive(!isActive);
    }
  };

  useEffect(() => {
    let intervalId;

    if (counter < 0 && timerInstructions.currentTimer === "TIME_ON") {
      setTimerInstructions({ ...timerInstructions, currentTimer: "TIME_OFF" });
      setCounter(timerInstructions.timeOff);
    }

    if (counter < 0 && timerInstructions.currentTimer === "TIME_OFF") {
      setTimerInstructions({
        ...timerInstructions,
        numSets: timerInstructions.numSets - 1,
        currentTimer: "TIME_ON",
      });
      setCounter(timerInstructions.timeOn);
    }

    if (timerInstructions.numSets <= 0) {
      setIsActive(false);
      console.log("CHECK IS ACTIVE: " + isActive);
    }

    if (isActive && counter >= 0) {
      console.log("IS ACTIVE AND COUNTER >= 0: " + counter);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target.value);
  };

  return (
    <div className="content-wrapper">
      {/* TIMER TEXT */}
      <div className="timer-display">
        <div className="timer text">
          <span className="minute">{minute}</span>
          <span>:</span>
          <span className="second">{second}</span>
        </div>
        <div className="text">SETS</div>
      </div>

      <div className="quick-timer-wrapper">
        {/* SET BUTTONS */}
        <div className="quick-timer-btn">
          <button
            className="btn"
            onClick={() => {
              setTimerInstructions({
                ...timerInstructions,
                numSets: quickButtons.set1.numSets,
              });
            }}
          >
            {quickButtons.set1.numSets}
          </button>
          <button
            className="btn"
            onClick={() => {
              setTimerInstructions({
                ...timerInstructions,
                numSets: quickButtons.set2.numSets,
              });
            }}
          >
            {quickButtons.set2.numSets}
          </button>
          <button
            className="btn"
            onClick={() => {
              setTimerInstructions({
                ...timerInstructions,
                numSets: quickButtons.set3.numSets,
              });
            }}
          >
            {quickButtons.set3.numSets}
          </button>
        </div>

        {/* TIME ON BUTTONS */}
        <div className="quick-timer-btn">
          <button
            className="btn"
            onClick={() => {
              setTimerInstructions({
                ...timerInstructions,
                timeOn: quickButtons.on1.duration,
              });
            }}
          >
            {quickButtons.on1.duration}
          </button>
          <button
            className="btn"
            onClick={() => {
              setTimerInstructions({
                ...timerInstructions,
                timeOn: quickButtons.on2.duration,
              });
            }}
          >
            {quickButtons.on2.duration}
          </button>
          <button
            className="btn"
            onClick={() => {
              setTimerInstructions({
                ...timerInstructions,
                timeOn: quickButtons.on3.duration,
              });
            }}
          >
            {quickButtons.on3.duration}
          </button>
        </div>

        {/* TIME OFF BUTTONS */}
        <div className="quick-timer-btn">
          <button
            className="btn"
            onClick={() => {
              setTimerInstructions({
                ...timerInstructions,
                timeOff: quickButtons.off1.duration,
              });
            }}
          >
            {quickButtons.off1.duration}
          </button>
          <button
            className="btn"
            onClick={() => {
              setTimerInstructions({
                ...timerInstructions,
                timeOff: quickButtons.off2.duration,
              });
            }}
          >
            {quickButtons.off2.duration}
          </button>
          <button
            className="btn"
            onClick={() => {
              setTimerInstructions({
                ...timerInstructions,
                timeOff: quickButtons.off3.duration,
              });
            }}
          >
            {quickButtons.off3.duration}
          </button>
        </div>
      </div>

      {/* START STOP BUTTONS */}
      <div className="start-stop-wrapper">
        <button
          className={isActive ? "btn pause" : "btn start"}
          onClick={() => {
            handleStart();
          }}
        >
          {isActive ? "Pause" : "Start"}
        </button>
        <button
          className={isActive ? "btn disbaled" : "btn reset"}
          onClick={() => {
            if (!isActive) {
              setIsActive(false);
              setSecond("00");
              setMinute("00");
              setTimerInstructions(defaultTimerInstructions);
            }
          }}
        >
          RESET
        </button>
      </div>

      {/* DEBUG TIMER INSTRUCTIONS */}
      <div className="text">{JSON.stringify(timerInstructions)}</div>

      {/* SETTINGS */}
      <div>
        <div className="text">SETTINGS</div>
        <form onSubmit={handleSubmit}>
          <div>
            <select type="dropdown" name="set-sets" id="set-sets">
              <option value="set1">set1</option>
              <option value="set2">set2</option>
              <option value="set3">set3</option>
            </select>
            <input type="text" placeholder="sets" id="set-sets" />
          </div>

          <div>
            <select name="" id="">
              <option value="on1">on1</option>
              <option value="on2">on2</option>
              <option value="on3">on3</option>
            </select>
            <input type="text" placeholder="on" />
          </div>

          <div>
            <select name="" id="">
              <option value="off1">off1</option>
              <option value="off2">off2</option>
              <option value="off3">off3</option>
            </select>
            <input type="text" placeholder="off" />
          </div>

          <button className="btn" type="submit">
            SUBMIT CHANGES
          </button>
        </form>
      </div>
    </div>
  );
};