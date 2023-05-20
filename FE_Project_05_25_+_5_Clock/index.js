const {useState, useEffect, useRef} = React;

const App = () => {
  const [sessionTime, setSessionTime] = useState(25*60)
  const [breakLength, setBreakLength] = useState(5)
  const breakRef = useRef(breakLength)
  const [sessionLength, setSessionLength] = useState(25)
  const [timer, setTimer] = useState(false)
  const timerRef = useRef(timer)


  useEffect(() => {
    setBreakLength(5)
    setSessionLength(25)
  }, [])

  const clockForm = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return (
      (minutes < 10 ? '0' + minutes : minutes)
      + ':' +
      (seconds < 10 ? '0' + seconds : seconds)
    )
  }

  const breakDecrease = () => {
    breakLength <= 1
    ? setBreakLength(1)
    : setBreakLength(breakLength - 1)
  }

  const breakIncrease = () => {
    breakLength == 60
    ? setBreakLength(60)
    : setBreakLength(breakLength + 1)
  }

  const sessionDecrease = () => {
    sessionLength <= 1
    ? (setSessionLength(1), setSessionTime(1*60))
    : (setSessionLength(sessionLength - 1), setSessionTime((sessionLength - 1)*60))
  }

  const sessionIncrease = () => {
    sessionLength == 60
    ? (setSessionLength(60), setSessionTime(60*60))
    : (setSessionLength(sessionLength + 1), setSessionTime((sessionLength + 1)*60))
  }

  useEffect(() => {
    setTimer(timer)
    timerRef.current = timer
    playTimer(timer)
    console.log(timerRef.current)
  }, [timer, timerRef, setTimer])

  useEffect(() => {
    setBreakLength(breakLength)
    breakRef.current = breakLength
    console.log(breakRef.current)
  }, [breakLength, breakRef, setBreakLength])

  const playTimer = () => {
    let i = sessionTime
    const timerInterval = setInterval(() => {
      if (timerRef.current && i > 0) {
        setSessionTime((prevTime) => prevTime - 1)
        i--
        if (i % (breakRef.current*60) === 0) {
          console.log('match')
          console.log(breakLength*60)
          console.log(i)
          console.log(breakRef.current*60)
        }
      } else {
        clearInterval(timerInterval)
      }
    }, 1000)  
  }

  const resetTimer = () => {
    setSessionTime(25*60)
    setBreakLength(5)
    setSessionLength(25)
    setTimer(false)
  }

  return(
    <div >
        <h3>Session Time</h3>
        <div id="timer-label">Session: </div>
        <div id="time-left"><h2>{clockForm(sessionTime)}</h2></div>
        <button id="start_stop" onClick={() => {setTimer(!timer)}}>START/STOP</button><button id="reset" onClick={() => resetTimer()}>RESET</button>

        <div id="break-label"><h3>Break Lenght</h3></div>
        <div id="break-length">{breakLength}</div>
        <button id="break-decrement" onClick={() => breakDecrease()}>break dec</button>
        <button id="break-increment" onClick={() => breakIncrease()}>break inc</button>
      
        <div id="session-label"><h3>Session Length</h3></div>
        <div id="session-length">{sessionLength}</div>
        <button id="session-decrement" onClick={() => sessionDecrease()}>sess dec</button>
        <button id="session-increment" onClick={() => sessionIncrease()}>sess inc</button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("app"))