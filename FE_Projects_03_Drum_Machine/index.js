const {useState, useEffect, useRef} = React;

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
    buttonRef.classList.add("pressed-button")
    setTimeout(() => buttonRef.classList.remove("pressed-button"), 200)
  }

  return(
    <>
    <button className="drum-pad" id={note.id} onClick={() => {playSound(note.keyCode)}}>
      <audio className="clip" id={note.keyTrigger} src={note.url}></audio>
      {note.keyTrigger}
    </button>
    </>
  )
}

const Drums = (props) => {
  const [displayText, setDisplayText] = useState('')
  const [sequence, setSequence] = useState(Array(12).fill(" "))
  const [remix, setRemix] = useState(false)
  const remixRef = useRef(remix)

  const [volume, setVolume] = useState(1)
  const volumeRef = useRef(volume)
  const [speed, setSpeed] = useState(1750)
  const speedRef = useRef(speed)

  const [caseAnimation, setCaseAnimation] = useState(0)
  const caseRef = useRef(caseAnimation)

  useEffect(() => {
    if (props.powerSwitch || !props.powerSwitch) {
      setDisplayText("")
      setSequence(Array(12).fill(" "))
      setRemix(false)
    }
  }, [props.powerSwitch])

  useEffect(() => {
    if (props.bank) {

    }
  }, [])

  const handleDisplayChange = (value) => {
    if (props.powerSwitch) {
      setDisplayText(value)
    } else if (!props.powerSwitch) {
      setDisplayText("")
    }    
  }

  const handleSequenceChange = (value) => {
    if (props.powerSwitch && (remixRef.current == false)) {
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
      const buttonRef = document.getElementById("play-pause")
      buttonRef.click()
    }
  }

  useEffect(() => {
    setVolume(props.volumeBar)
    setSpeed(props.remixSpeed)
    speedRef.current = speed
    volumeRef.current = volume
    console.log(speedRef)
  }, [props.volumeBar, props.remixSpeed, speed, speedRef, volume, volumeRef])
  
  useEffect(() => {
    setRemix(remix);
    remixRef.current = remix;
    playSequence(remix);
  }, [remix, remixRef, setRemix]);

  const playSound = (note) => {
    const audioTag = document.getElementById(String.fromCharCode(note.keyCode))
    audioTag.currentTime = 0
    audioTag.volume = volumeRef.current
    audioTag.play()
    setDisplayText(note.id)
    const buttonRef = document.getElementById(note.id)
    buttonRef.classList.add("pressed-button")
    setTimeout(() => buttonRef.classList.remove("pressed-button"), 200)
  }

  const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const playSequence = async () => {
    let i = 0;
    while (remixRef.current && i < sequence.length) {
      const keyTrigger = sequence[i];
      const note = props.bank.find((note) => note.keyTrigger === keyTrigger);
      caseRef.current = i % 4
      if (note) {
        playSound(note)
      }
      i = (i + 1) % sequence.length
      await wait(speedRef.current)
    }
  }

  const handleRemix = () => {
    if (remix) {
      setRemix(false);
    } else {
      setRemix(true);
    }
  };

  return(
    <div className="machine">
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
      </div>
      
      <>
      <h2>Display:</h2>
      <div id="display">{props.powerSwitch && displayText}</div>
      <h2>Repeater:</h2>
      {remix ?  (<>{caseRef.current == 0 ? <>PLAYING</> : caseRef.current == 1 ? <>PLAYING.</> : caseRef.current == 2 ? <>PLAYING..</> : caseRef.current == 3 ? <>PLAYING...</> : null}</>) : <>READY</>}
      <div id="repeater">{"1" + sequence[0] + "2" + sequence[1] + "3" + sequence[2] + "4" + sequence[3] + "5" + sequence[4] + "6" + sequence[5] + "7" + sequence[6] + "8" + sequence[7] + "9" + sequence[8] + "10" + sequence[9] + "11" + sequence[10] + "12" + sequence[11]}
      <button id="reset" onClick={() => {setRemix(false); setSequence(Array(12).fill(" ")); props.handleButtonClick("reset")}}>(R) Reset</button>
      <button id="space" onClick={() => {handleSequenceChange(" "); props.handleButtonClick("space")}}>(Space) Muted note</button>
      <button id="play-pause" onClick={() => {handleRemix(); props.handleButtonClick("play-pause")}}>(Y) {remix ? <>Pause</> : <>Play</>}</button>
      </div>
      </>
    </div>
  )
}

const App = () => {

  const [volumeBar, setVolumeBar] = useState(1)
  const [remixSpeed, setRemixSpeed] = useState(1750)
  const [bank, setBank] = useState(false)
  const [toggleBank, setToggleBank] = useState(false)
  const [powerSwitch, setPowerSwitch] = useState(true)

  useEffect(() => {
    if (powerSwitch) {
      setVolumeBar(1)
      setRemixSpeed(1750)
    } else if (!powerSwitch) {
      setVolumeBar(0)
      setRemixSpeed(3000)
    }
  }, [powerSwitch])
  
  const handleButtonClick = (id) => {
    const buttonRef = document.getElementById(id)
    buttonRef.classList.add("pressed-button")
    setTimeout(() => buttonRef.classList.remove("pressed-button"), 200)
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
    } else if (event.keyCode === 86) {
      event.preventDefault()
      const buttonRef = document.getElementById("power")
      buttonRef.click()
    } else if (event.keyCode === 71) {
      event.preventDefault()
      const buttonRef = document.getElementById("dec-volume")
      buttonRef.click()
    } else if (event.keyCode === 72) {
      event.preventDefault()
      const buttonRef = document.getElementById("inc-volume")
      buttonRef.click()
    } else if (event.keyCode === 75) {
      event.preventDefault()
      const buttonRef = document.getElementById("dec-remix")
      buttonRef.click()
    } else if (event.keyCode === 74) {
      event.preventDefault()
      const buttonRef = document.getElementById("inc-remix")
      buttonRef.click()
    }
  }

  return(
    <div className="title" id="drum-machine">
          
      <h2>Drum Machine</h2>
      {powerSwitch ? <>{bank ? <>Heater Band Kit</>
      : <>Smooth Piano Kit</>}</> : <>Drum Machine off</>}
      {bank ? <Drums bank={bankOne} volumeBar={volumeBar} remixSpeed={remixSpeed} powerSwitch={powerSwitch} handleButtonClick={handleButtonClick}/>
      : <Drums bank={bankTwo} volumeBar={volumeBar} remixSpeed={remixSpeed} powerSwitch={powerSwitch} handleButtonClick={handleButtonClick}/>}
      <h2>Change to:</h2>
      <button id="heater-kit-button" onClick={() => {setBank(true); handleButtonClick("heater-kit-button")}}>(1) Heater Kit</button>
      <button id="smooth-piano-kit-button" onClick={() => {setBank(false); handleButtonClick("smooth-piano-kit-button")}}>(2) Piano Kit</button>
      <h2>Volume ({Math.round(volumeBar * 100)})</h2>
      <button id="dec-volume" onClick={() => {setVolumeBar(prevVolume => Math.max(0, prevVolume - 0.05)); handleButtonClick("dec-volume")}} disabled={!powerSwitch}>(G) dec. volume</button>
      <button id="inc-volume" onClick={() => {setVolumeBar(prevVolume => Math.min(1, prevVolume + 0.05)); handleButtonClick("inc-volume")}} disabled={!powerSwitch}>(H) inc. volume</button>
      <input id="volume-bar" type="range" step="0.01" onChange={(e) => setVolumeBar(+e.target.value)} value={volumeBar} max="1" min="0" className="w-50" disabled={!powerSwitch}/>
      <h2>Remix speed ({remixSpeed} ms)</h2>
      <button id="inc-remix" onClick={() => {setRemixSpeed(prevSpeed => Math.max(50, prevSpeed - 50)); handleButtonClick("inc-remix")}} disabled={!powerSwitch}>(J) inc. remix</button>
      <button id="dec-remix" onClick={() => {setRemixSpeed(prevSpeed => Math.min(3000, prevSpeed + 50)); handleButtonClick("dec-remix")}} disabled={!powerSwitch}>(K) dec. remix</button>
      <input id="remix-speed" type="range" step="10" onChange={(e) => setRemixSpeed(+e.target.value)} value={remixSpeed} min="50" max="3000" className="w-50" disabled={!powerSwitch}/>
      <h2>Power</h2>
      <button id="power" onClick={() => {setPowerSwitch(!powerSwitch); handleButtonClick("power")}}>(V) {powerSwitch ? <>Power Off</> : <>Power On</>}</button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("app"))