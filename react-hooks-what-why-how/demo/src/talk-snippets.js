// 1. Initialize state fields
const [seconds, setSeconds] = useState(0);
const [isActive, setIsActive] = useState(false);

// 2. Create callbacks for buttons
function toggle() {
  setIsActive(!isActive);
}

function reset() {
  setSeconds(0);
  setIsActive(false);
}

// 3. Replace start button
<button
  className={`button ${isActive ? "button--active" : null}`}
  onClick={toggle}
>
  {isActive ? "Pause" : "Start"}
</button>

// 4. Add useEffect and interval
useEffect(() => {
  let interval = null;
  if (isActive) {
    interval = setInterval(() => {
      setSeconds(seconds + 1);
    }, 1000);
  } else if (!isActive && seconds !== 0) {
    clearInterval(interval);
  }
  return () => clearInterval(interval);
}, [isActive, seconds]);

// 5. Extract into custom hook
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

// 6. Create useLogging hook
function useLogging(dep) {
  useEffect(() => {
    console.log(`new value: ${dep}`);
  }, [dep]);
}

// 7. Create composed custom hook
function useTimerWithLogging() {
  const [seconds, isActive, toggle, reset] = useTimer();
  useLogging(seconds);

  return [seconds, isActive, toggle, reset];
}