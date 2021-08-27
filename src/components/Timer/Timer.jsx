import React, { useState, useEffect, useRef } from "react";
import "./Timer.css";
import {
  quickButtonsDefault,
  defaultTimerInstructions,
  defaultCardProps,
  defaultPresetCardProps,
} from "../../utils/utils";
import { Card } from "../Card/Card.jsx";

export const Timer = () => {
  const [quickButtons, setQuickButtons] = useState(quickButtonsDefault);
  const [timerInstructions, setTimerInstructions] = useState(
    defaultTimerInstructions
  );

  const [second, setSecond] = useState("00");
  const [minute, setMinute] = useState("00");
  const [counter, setCounter] = useState(0);
  const [showQuickButtons, setShowQuickButtons] = useState(false);
  const [showDebug, setShowDebug] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [cardProps, setCardProps] = useState(defaultCardProps);
  const [presetCardProps, setpresetCardProps] = useState(
    defaultPresetCardProps
  );

  const handleStart = () => {
    if (timerInstructions.numSets > 0) {
      timerInstructions.timerStarted = true;
      setCounter(timerInstructions.timeOn);
      setTimerInstructions({
        ...timerInstructions,
        isActive: !timerInstructions.isActive,
      });
      setShowQuickButtons(false);
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
      setTimerInstructions(defaultTimerInstructions);
      console.log("CHECK IS ACTIVE: " + timerInstructions.isActive);
    }

    if (timerInstructions.isActive && counter >= 0) {
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
        timerInstructions.resume = counter;
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [timerInstructions.isActive, counter]);

  return (
    <div className="content-wrapper">
      {/* TIMER TEXT */}
      <span
        className="timer-display"
        onClick={() => {
          setShowQuickButtons(true);
        }}
      >
        <div className="timer text">
          <span className="minute">{minute}</span>
          <span>:</span>
          <span className="second">{second}</span>
        </div>
        {timerInstructions.timerStarted && (
          <div className="text">SETS: {timerInstructions.numSets}</div>
        )}
      </span>

      {showQuickButtons && (
        <div className="quick-timer-wrapper">
          {/* SET BUTTONS */}
          <div>
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
          <div>
            <button
              className="btn start"
              onClick={() => {
                handleStart();
              }}
            >
              start
            </button>
            <button
              className="btn reset circle"
              onClick={() => {
                setShowQuickButtons(false);
              }}
            >
              x
            </button>
          </div>
        </div>
      )}

      {/* START STOP BUTTONS */}
      <div className="start-stop-wrapper">
        {timerInstructions.timerStarted && !timerInstructions.isActive ? (
          <button
            className="btn resume"
            onClick={() => {
              setCounter(timerInstructions.resume);
              setTimerInstructions({ ...timerInstructions, isActive: true });
            }}
          >
            resume
          </button>
        ) : (
          <button
            className={timerInstructions.isActive ? "btn pause" : "btn start"}
            onClick={() => {
              handleStart();
            }}
          >
            {timerInstructions.isActive ? "Pause" : "Start"}
          </button>
        )}
        <button
          className={timerInstructions.isActive ? "btn disabled" : "btn reset"}
          onClick={() => {
            if (!timerInstructions.isActive) {
              setSecond("00");
              setMinute("00");
              setTimerInstructions(defaultTimerInstructions);
            } else {
              alert("PAUSE TIMER TO ENABLE RESET BUTTON");
            }
          }}
        >
          reset
        </button>
      </div>
      <button
        className={showDebug ? "btn debug settings" : "btn settings"}
        onClick={() => {
          setShowDebug(!showDebug);
        }}
      >
        DEBUG
      </button>

      {/* PRESENT CARDS */}

      {!timerInstructions.timerStarted && !showQuickButtons && (
        <>
          <div className="text large">Preset Cards</div>

          <div className="preset-card-container">
            <button
              onClick={() => {
                setTimerInstructions({
                  ...timerInstructions,
                  numSets: defaultPresetCardProps.card1.numSets,
                  timeOn: defaultPresetCardProps.card1.timeOn,
                  timeOff: defaultPresetCardProps.card1.timeOff,
                });
                handleStart();
              }}
            >
              <Card
                sets={defaultPresetCardProps.card1.numSets}
                on={defaultPresetCardProps.card1.timeOn}
                off={defaultPresetCardProps.card1.timeOff}
              />
            </button>
            <button
              onClick={() => {
                setTimerInstructions({
                  ...timerInstructions,
                  numSets: defaultPresetCardProps.card2.numSets,
                  timeOn: defaultPresetCardProps.card2.timeOn,
                  timeOff: defaultPresetCardProps.card2.timeOff,
                });
                handleStart();
              }}
            >
              <Card
                sets={defaultPresetCardProps.card2.numSets}
                on={defaultPresetCardProps.card2.timeOn}
                off={defaultPresetCardProps.card2.timeOff}
              />
            </button>
            <button
              onClick={() => {
                setTimerInstructions({
                  ...timerInstructions,
                  numSets: defaultPresetCardProps.card3.numSets,
                  timeOn: defaultPresetCardProps.card3.timeOn,
                  timeOff: defaultPresetCardProps.card3.timeOff,
                });
                handleStart();
              }}
            >
              <Card
                sets={defaultPresetCardProps.card3.numSets}
                on={defaultPresetCardProps.card3.timeOn}
                off={defaultPresetCardProps.card3.timeOff}
              />
            </button>
          </div>
        </>
      )}

      {/* DEBUG TIMER INSTRUCTIONS */}
      {showDebug && (
        <div className="text">{JSON.stringify(timerInstructions)}</div>
      )}
    </div>
  );
};
