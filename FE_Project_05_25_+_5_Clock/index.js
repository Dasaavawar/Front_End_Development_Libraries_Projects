const {useState, useEffect, useRef} = React;

const App = () => {
  const [sessionTime, setSessionTime] = useState(25*60)
  const [sessionLength, setSessionLength] = useState(25)
  const [breakLength, setBreakLength] = useState(5)
  const [sessionWord, setSessionWord] = useState('ready')
  const [timer, setTimer] = useState(false)
  
  const sessionTimeRef = useRef(sessionTime)
  const sessionRef = useRef(sessionLength)
  const breakRef = useRef(breakLength) 
  const timerRef = useRef(timer)
  const focusRef = useRef(false)
  const audioRef = useRef(null)

  const clockForm = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return (
      (minutes < 10 ? '0' + minutes : minutes)
      + ':' +
      (seconds < 10 ? '0' + seconds : seconds)
    )
  }

  useEffect(() => {
    setBreakLength(5)
    setSessionLength(25)
  }, [])

  useEffect(() => {
    setTimer(timer)
    timerRef.current = timer
    playTimer(timer)
    // console.log('timeRef value', timerRef.current)
  }, [timer, timerRef, setTimer])

  useEffect(() => {
    setBreakLength(breakLength)
    breakRef.current = breakLength
    // console.log('breakLength', breakLength)
  }, [setBreakLength, breakLength, breakRef])

  useEffect(() => {
    setSessionLength(sessionLength)
    sessionRef.current = sessionLength
    // console.log('sessionLength', sessionLength)
  }, [setSessionLength, sessionLength, sessionRef])

  useEffect(() => {
    setSessionTime(sessionTime)
    sessionTimeRef.current = sessionTime
    // console.log('sessionTime', sessionTime)
  }, [setSessionTime, sessionTime, sessionTimeRef, i])

  const playSound = () => {
    audioRef.current.currentTime = 0
    audioRef.current.play()
  }

  const stopSound = () => {
    audioRef.current.pause()
    audioRef.current.currentTime = 0
  }
  
  let i = sessionTimeRef.current
  const playTimer = () => {
    const timerInterval = setInterval(() => {
      // console.log('i', i)
      if (timerRef.current && i > 0) {
        setSessionTime((prevTime) => prevTime - 1)
        i--
      } else if (i === 0) {
        if (focusRef.current == true) {
          focusRef.current = false
          setSessionWord('new session')
          const newSessionTime = (sessionRef.current*60)
          i = newSessionTime
          setSessionTime(newSessionTime)
          // console.log('new session', newSessionTime)
          clearInterval(timerInterval)
          playSound()
        } else if (focusRef.current == false) {
          focusRef.current = true
          setSessionWord('break')
          const newBreakTime = (breakRef.current*60)
          i = newBreakTime
          setSessionTime(newBreakTime)
          // console.log('break', newBreakTime)
          clearInterval(timerInterval)
          playSound()
        }
        playTimer()
      } else {
        clearInterval(timerInterval)
        setSessionWord('ready')
      }
    }, 1000)  
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

  const resetTimer = () => {
    setSessionTime(25*60)
    setBreakLength(5)
    setSessionLength(25)
    setTimer(false)
    setSessionWord('ready')
    stopSound()
  }

  const handleStartStop = () => {
    setTimer(!timer)
    if (timer) {
      setTimer(false)
      setSessionWord('ready')
    } else {
      setTimer(true)
      setSessionWord('focus')
      stopSound()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [])

  function handleKeyPress(event) {
    if (event.keyCode === 82) {
      event.preventDefault()
      const resetButtonRef = document.getElementById("reset")
      resetButtonRef.click()
      resetButtonRef.classList.add("pressed-button")
      setTimeout(() => resetButtonRef.classList.remove("pressed-button"), 300)
    } else if (event.keyCode === 87) {
      event.preventDefault()
      const startStopButtonRef = document.getElementById("start_stop")
      startStopButtonRef.click()
      startStopButtonRef.classList.add("pressed-button")
      setTimeout(() => startStopButtonRef.classList.remove("pressed-button"), 300)
    } else if (event.keyCode === 89) {
      event.preventDefault()
      const breakDecButtonRef = document.getElementById("break-decrement")
      setTimer(false)
      breakDecButtonRef.click()
      breakDecButtonRef.classList.add("pressed-button")
      setTimeout(() => breakDecButtonRef.classList.remove("pressed-button"), 300)
    } else if (event.keyCode === 85) {
      event.preventDefault()
      const breakIncButtonRef = document.getElementById("break-increment")
      setTimer(false)
      breakIncButtonRef.click()
      breakIncButtonRef.classList.add("pressed-button")
      setTimeout(() => breakIncButtonRef.classList.remove("pressed-button"), 300)
    } else if (event.keyCode === 74) {
      event.preventDefault()
      const sessionDecButtonRef = document.getElementById("session-decrement")
      setTimer(false)
      sessionDecButtonRef.click()
      sessionDecButtonRef.classList.add("pressed-button")
      setTimeout(() => sessionDecButtonRef.classList.remove("pressed-button"), 300)
    } else if (event.keyCode === 75) {
      event.preventDefault()
      const sessionIncButtonRef = document.getElementById("session-increment")
      setTimer(false)
      sessionIncButtonRef.click()
      sessionIncButtonRef.classList.add("pressed-button")
      setTimeout(() => sessionIncButtonRef.classList.remove("pressed-button"), 300)
    }
  }

  return(
    <div>        
        <audio id="beep" ref={audioRef} src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"/>

        <div id='apple'></div>

        <div id="clock-grid">
        <div id="main-title">Pomodoro Clock</div>

          <div id="time-part">
            <div id="time-label">Session Time</div>
            <div id="time-left">{clockForm(sessionTime)}</div>
            Start/Stop <button id="start_stop" onClick={handleStartStop}>W</button><button id="reset" onClick={() => resetTimer()}>R</button> Reset
          </div>
          
          <div id="status-part">
            <div id="timer-label">Status: {sessionWord}</div>
          </div>

          <div id="break-part">
            <div id="break-label">Break Lenght</div>
            <div id="break-length">{breakLength}</div>
            Decrease <button id="break-decrement" onClick={() => breakDecrease()}>Y</button><button id="break-increment" onClick={() => breakIncrease()}>U</button> Increase
          </div>

          <div id="session-part">
            <div id="session-label">Session Length</div>
            <div id="session-length">{sessionLength}</div>
            Decrease <button id="session-decrement" onClick={() => sessionDecrease()}>J</button><button id="session-increment" onClick={() => sessionIncrease()}>K</button> Increase
          </div>
        </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("app"))