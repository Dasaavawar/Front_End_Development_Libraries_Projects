const {useState, useEffect} = React;

const bankOne = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];

const bankTwo = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Chord-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Chord-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Chord-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Shaker',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Open-HH-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Closed-HH-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: 'Punchy-Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Side-Stick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Snare',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
  }
];

const Pad = ({note, volumeBar, onDisplayChange, onSequenceChange}) => {
  
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [volumeBar])

  function handleKeyPress(event) {
    if (event.keyCode === note.keyCode) {
      playSound(note.keyCode)
    }
  }

  const handleDisplayChange = () => {
    onDisplayChange(note.id)
  }

  const handleSequenceChange = () => {
    onSequenceChange(note.keyTrigger)
  }

  const playSound = () => {
    const audioTag = document.getElementById(String.fromCharCode(note.keyCode))
    audioTag.currentTime = 0
    audioTag.volume = volumeBar
    audioTag.play()
    handleDisplayChange()
    handleSequenceChange()
    const buttonRef = document.getElementById(note.id)
    buttonRef.classList.add("red-button")
    setTimeout(() => buttonRef.classList.remove("red-button"), 200)
  }

  return(
    <div>
    <button className="drum-pad" id={note.id} onClick={() => {playSound(note.keyCode)}}>
      <audio className="clip" id={note.keyTrigger} src={note.url}></audio>
      {note.keyTrigger}
    </button>
    </div>
  )
}

const Drums = (props) => {
  const [displayText, setDisplayText] = useState('')
  const [sequence, setSequence] = useState(Array(12).fill(" "))
  const [remix, setRemix] = useState(true)

  useEffect(() => {
    if (props.powerSwitch || !props.powerSwitch) {
      setDisplayText("")
      setSequence(Array(12).fill(" "))
    }
  }, [props.powerSwitch])

  const handleDisplayChange = (value) => {
    if (props.powerSwitch) {
      setDisplayText(value)
    } else if (!props.powerSwitch) {
      setDisplayText("")
    }    
  }

  const handleSequenceChange = (value) => {
    if (props.powerSwitch) {
      setSequence(prevCounting => {
        if (prevCounting.length >= 12) {
          return [...prevCounting.slice(1), value]
        } else {
          return [...prevCounting, value]
        }
      })
    } else if (!props.powerSwitch) {
      setSequence(Array(12).fill(" "))
    }
  }

  const playSequence = () => {
    for (let i = 0; i < sequence.length; i++) {
      const keyTrigger = sequence[i]
      const note = props.bank.find((note) => note.keyTrigger === keyTrigger)
      if (note) {
        setTimeout(() => {
          const audioTag = document.getElementById(String.fromCharCode(note.keyCode))
          audioTag.currentTime = 0
          audioTag.volume = props.volumeBar
          audioTag.play()
          setDisplayText(note.id)
          const buttonRef = document.getElementById(note.id)
          buttonRef.classList.add("red-button")
          setTimeout(() => buttonRef.classList.remove("red-button"), 200)
        }, i * 400)
      }
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [])

  function handleKeyPress(event) {
    if (event.keyCode === 32) {
      event.preventDefault()
      const buttonRef = document.getElementById("space")
      buttonRef.click()
    } else if (event.keyCode === 82) {
      event.preventDefault()
      const buttonRef = document.getElementById("reset")
      buttonRef.click()
    } else if (event.keyCode === 89) {
      event.preventDefault()
      const buttonRef = document.getElementById("play")
      buttonRef.click()
    } else if (event.keyCode === 80) {
      event.preventDefault()
      const buttonRef = document.getElementById("pause")
      buttonRef.click()
    }
  }

  return(
    <div className="grid">
      
      {Array.from({length: 9}, (_, i) => (
      <Pad
      key={props.bank[i].id}
      note={props.bank[i]}
      volumeBar={props.powerSwitch ? props.volumeBar : 0}
      onDisplayChange={handleDisplayChange}
      onSequenceChange={handleSequenceChange}
      sequence={sequence}
      bank={props.bank}
      />
      ))}
      
      <>
      <h2>Display:</h2>
      <div id="display">{props.powerSwitch && displayText}</div>
      <h2>Repeater:</h2>
      <div id="repeater">{props.powerSwitch && Object.entries(sequence)}
      <button id="reset" onClick={() => {setSequence(Array(12).fill(" ")); props.handleButtonClick("reset")}}>(R) Reset</button>
      <button id="space" onClick={() => {handleSequenceChange(" "); props.handleButtonClick("space")}}>(Space) Space</button>
      <button id="play" onClick={() => {setRemix(true); playSequence(); props.handleButtonClick("play")}}>(Y) Play</button>
      <button id="pause" onClick={() => {setRemix(false); props.handleButtonClick("pause")}}>(P) Pause</button>
      </div>
      </>
    </div>
  )
}

const App = () => {

  const [volumeBar, setVolumeBar] = useState(1)
  const [remixSpeed, setRemixSpeed] = useState(0)
  const [bank, setBank] = useState(false)
  const [powerSwitch, setPowerSwitch] = useState(true)

  useEffect(() => {
    if (powerSwitch) {
      setVolumeBar(1)
    } else if (!powerSwitch) {
      setVolumeBar(0)
    }
  }, [powerSwitch])

  const handleButtonClick = (id) => {
    const buttonRef = document.getElementById(id)
    buttonRef.classList.add("red-button")
    setTimeout(() => buttonRef.classList.remove("red-button"), 200)
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [])

  function handleKeyPress(event) {
    if (event.keyCode === 97 || event.keyCode === 49) {
      event.preventDefault()
      const buttonRef = document.getElementById("heater-kit-button")
      buttonRef.click()
    } else if (event.keyCode === 98 || event.keyCode === 50) {
      event.preventDefault()
      const buttonRef = document.getElementById("smooth-piano-kit-button")
      buttonRef.click()
    } else if (event.keyCode === 66) {
      event.preventDefault()
      const buttonRef = document.getElementById("power-on")
      buttonRef.click()
    } else if (event.keyCode === 78) {
      event.preventDefault()
      const buttonRef = document.getElementById("power-off")
      buttonRef.click()
    }
  }

  return(
    <div className="title" id="drum-machine">
          
      <h2>Drum Machine</h2>
      {powerSwitch ? <>{bank ? <>Heater Kit currently playing</>
      : <>Smooth Piano Kit currently playing</>}</> : <>Drum Machine off</>}
      {bank ? <Drums bank={bankOne} volumeBar={volumeBar} powerSwitch={powerSwitch} handleButtonClick={handleButtonClick}/>
      : <Drums bank={bankTwo} volumeBar={volumeBar} powerSwitch={powerSwitch} handleButtonClick={handleButtonClick}/>}
      <h2>Change to:</h2>
      <button id="heater-kit-button" onClick={() => {setBank(true); handleButtonClick("heater-kit-button")}}>(1) Heater Kit</button>
      <button id="smooth-piano-kit-button" onClick={() => {setBank(false); handleButtonClick("smooth-piano-kit-button")}}>(2) Smooth Piano Kit</button>
      <h2>Power</h2>
      <button id="power-on" onClick={() => {setPowerSwitch(true); handleButtonClick("power-on")}}>(B) Power On</button>
      <button id="power-off" onClick={() => {setPowerSwitch(false); handleButtonClick("power-off")}}>(N) Power Off</button>
      <h2>Volume ({Math.floor(volumeBar * 100)})</h2>
      <input type="range" step="0.01" onChange={(e) => setVolumeBar(e.target.value)} value={powerSwitch ? volumeBar : "0"} max="1" min="0" className="w-50" disabled={!powerSwitch}/>
      <h2>Remix speed ({Math.floor(remixSpeed * 100)})</h2>
      <input type="range" step="0.01" onChange={(e) => setRemixSpeed(e.target.value)} value={powerSwitch ? remixSpeed : "0"} max="1" min="0" className="w-50" disabled={!powerSwitch}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("app"))