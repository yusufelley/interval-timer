import React, { useState } from "react";

export const quickButtonsDefault = {
  set1: {
    numSets: 2,
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
};

export const defaultTimerInstructions = {
  numSets: 0,
  timeOn: 0,
  timeOff: 0,
  currentTimer: "TIME_ON",
  timerStarted: false,
  resume: 0,
  isActive: false,
};

export const defaultCardProps = {
  name: "",
  category: "",
  numSets: 0,
  timeOn: 0,
  timeOff: 0,
};

export const defaultPresetCardProps = {
  card1: {
    numSets: 2,
    timeOn: 10,
    timeOff: 20,
  },
  card2: { numSets: 3, timeOn: 30, timeOff: 15 },
  card3: { numSets: 5, timeOn: 60, timeOff: 20 },
};
