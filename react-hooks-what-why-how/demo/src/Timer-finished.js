import React, { useState, useEffect} from 'react';
import './Timer.css';

function useTimer(initialSeconds = 0, isAlreadyActive = false) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(isAlreadyActive);

  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setSeconds(0);
    setIsActive(false);
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return [seconds, isActive, toggle, reset];
}

function useLogging(dep) {
  useEffect(() => {
    console.log(`new value: ${dep}`);
  }, [dep])
}

function useTimerWithLogging() {
  const [seconds, isActive, toggle, reset] = useTimer();
  useLogging(seconds);

  return [seconds, isActive, toggle, reset];
}

function Timer() {
  const [seconds, isActive, toggle, reset] = useTimerWithLogging();

  return (
    <div className="Timer">
      <div className="Timer__count">
        {seconds}s
      </div>
      <div className="Timer__controls">
        <button className={`button ${isActive ? 'button--active' : null}`} onClick={toggle}>
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button className="button" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;