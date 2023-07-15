const { createRoot } = ReactDOM
const {useState, useEffect, useRef, createRef} = React

const bankOne = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: './sounds/bankOne/Heater-1.mp3' // 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: './sounds/bankOne/Heater-2.mp3' // 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: './sounds/bankOne/Heater-3.mp3' // 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: './sounds/bankOne/Heater-4_1.mp3' // 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: './sounds/bankOne/Heater-6.mp3' // 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH-1',
    url: './sounds/bankOne/Dsc_Oh.mp3' // 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: './sounds/bankOne/Kick_n_Hat.mp3' // 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: './sounds/bankOne/RP4_KICK_1.mp3' // 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH-1',
    url: './sounds/bankOne/Cev_H2.mp3' // 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
]

const bankTwo = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Chord-1',
    url: './sounds/bankTwo/Chord_1.mp3' // 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Chord-2',
    url: './sounds/bankTwo/Chord_2.mp3' // 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Chord-3',
    url: './sounds/bankTwo/Chord_3.mp3' // 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Shaker',
    url: './sounds/bankTwo/Give_us_a_light.mp3' // 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Open-HH-2',
    url: './sounds/bankTwo/Dry_Ohh.mp3' // 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Closed-HH-2',
    url: './sounds/bankTwo/Bld_H1.mp3' // 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: 'Punchy-Kick',
    url: './sounds/bankTwo/punchy_kick_1.mp3' // 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Side-Stick',
    url: './sounds/bankTwo/side_stick_1.mp3' // 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Snare',
    url: './sounds/bankTwo/Brk_Snr.mp3' // 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
  }
]

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

  const [volume, setVolume] = useState(1)
  const [speed, setSpeed] = useState(1250)
  const [caseAnimation, setCaseAnimation] = useState(0)
  
  const volumeRef = useRef(volume)
  const speedRef = useRef(speed)
  const caseRef = useRef(caseAnimation)

  useEffect(() => {
    setVolume(props.volumeBar)
    setSpeed(props.remixSpeed)
    speedRef.current = speed
    volumeRef.current = volume
  }, [props.volumeBar, props.remixSpeed, speed, speedRef, volume, volumeRef])
  
  useEffect(() => {
    props.setRemix(props.remix);
    props.remixRef.current = props.remix;
    playSequence(props.remix);
  }, [props.remix, props.remixRef, props.setRemix])

  useEffect(() => {
    props.onRefFromDrum(caseRef.current)
  }, [props.onRefFromDrum])

  const playNote = (note) => {
    const audioTag = document.getElementById(String.fromCharCode(note.keyCode))
    audioTag.currentTime = 0
    audioTag.volume = volumeRef.current
    audioTag.play()
    props.setDisplayText(note.id)
    const noteButtonRef = document.getElementById(note.id)
    noteButtonRef.classList.add("played-button")
    setTimeout(() => noteButtonRef.classList.remove("played-button"), 200)
  }

  const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  let i = props.padRefs.current
  const playSequence = async () => {
    while (props.remixRef.current && i < props.sequence.length) {
      const keyTrigger = props.sequence[i]
      const note = props.bank.find((note) => note.keyTrigger === keyTrigger)
      if (note) {
        playNote(note)
        setCaseAnimation(caseRef)
      }
      else if (!note) {
        props.handleDisplayChange("Muted-Note")
        props.handleButtonClick("muted-note")
        setCaseAnimation(caseRef)
      }
      props.padRefs.current = i;
      caseRef.current = i % 4
      i = (i + 1) % props.sequence.length
      await wait(speedRef.current)
    }
  }

  return(
    <div>
      <div className="drum-grid">
      {Array.from({length: 9}, (_, i) => (
      <Pad
      key={props.bank[i].id}
      note={props.bank[i]}
      volumeBar={props.powerSwitch ? props.volumeBar : 0}
      onDisplayChange={props.handleDisplayChange}
      onSequenceChange={props.handleSequenceChange}
      sequence={props.sequence}
      bank={props.bank}
      />
      ))}
      </div>
    </div>
  )
}

const App = () => {

  const [volumeBar, setVolumeBar] = useState(1)
  const [remixSpeed, setRemixSpeed] = useState(1250)
  const [bank, setBank] = useState(false)
  const [powerSwitch, setPowerSwitch] = useState(true)
  const [displayText, setDisplayText] = useState("Press-a-Key!")
  const [sequence, setSequence] = useState(Array(24).fill("M"))
  const [remix, setRemix] = useState(false)
  const [sequencerNote, setSequencerNote] = useState(false)

  const remixRef = useRef(false)
  const drumRef = useRef(null)
  const padRefs = useRef(0)

  useEffect(() => {
    if (powerSwitch) {
      setVolumeBar(1)
      setRemixSpeed(1250)
      setSequencerNote(false)
    } else if (!powerSwitch) {
      setVolumeBar(0)
      setRemixSpeed(3000)
      setSequencerNote(false)
    }
  }, [powerSwitch])

  useEffect(() => {
    if (powerSwitch || !powerSwitch) {
      setDisplayText("Press-a-Key!")
      setSequence(Array(24).fill("M"))
      setRemix(false)
    }
  }, [powerSwitch])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [])

  const handleRemix = () => {
    if (remix) {
      setRemix(false)
    } else {
      setRemix(true)
    }
  }
  
  const handleButtonClick = (id) => {
    if (id == "power") {
      const powerButtonRef = document.getElementById(id)
      powerButtonRef.classList.add("pressed-power-button")
      setTimeout(() => powerButtonRef.classList.remove("pressed-power-button"), 200)
    } else {
      const otherButtonRef = document.getElementById(id)
      otherButtonRef.classList.add("pressed-button")
      setTimeout(() => otherButtonRef.classList.remove("pressed-button"), 200)
    }
  }

  const handleDisplayChange = (value) => {
    if (powerSwitch) {
      setDisplayText(value)
    } else if (!powerSwitch) {
      setDisplayText("")
    }    
  }

  const handleSequenceChange = (value) => {
    if (powerSwitch && (remixRef.current == false)) {
      setSequence(prevCounting => {
        if (prevCounting.length >= 24) {
          return [...prevCounting.slice(1), value]
        } else {
          return [...prevCounting, value]
        }
      })
    } else if (!powerSwitch) {
      setSequence(Array(24).fill(" "))
    }
  }

  const handleDrumRef = (childRef) => {
    drumRef.current = childRef
  }

  function handleKeyPress(event) {
     if (event.keyCode === 86) {
      event.preventDefault()
      const powerButtonRef = document.getElementById("power")
      powerButtonRef.click()
      setTimeout(() => powerButtonRef.classList.remove("pressed-button"), 200)
    } else if (event.keyCode === 73) {
      event.preventDefault()
      const heaterKitButtonRef = document.getElementById("heater-kit-button")
      heaterKitButtonRef.click()
    } else if (event.keyCode === 79) {
      event.preventDefault()
      const pianoKitButtonRef = document.getElementById("smooth-piano-kit-button")
      pianoKitButtonRef.click()
    } else if (event.keyCode === 71) {
      event.preventDefault()
      const decVolumeButtonRef = document.getElementById("dec-volume")
      decVolumeButtonRef.click()
    } else if (event.keyCode === 72) {
      event.preventDefault()
      const incVolumeButtonRef = document.getElementById("inc-volume")
      incVolumeButtonRef.click()
    } else if (event.keyCode === 74) {
      event.preventDefault()
      const decRemixButtonRef = document.getElementById("dec-remix")
      decRemixButtonRef.click()
    } else if (event.keyCode === 75) {
      event.preventDefault()
      const incRemixButtonRef = document.getElementById("inc-remix")
      incRemixButtonRef.click()
    } else if (event.keyCode === 77) {
      event.preventDefault()
      const mutedNoteButtonRef = document.getElementById("muted-note")
      mutedNoteButtonRef.click()
    } else if (event.keyCode === 82) {
      event.preventDefault()
      const resetButtonRef = document.getElementById("reset")
      resetButtonRef.click()
    } else if (event.keyCode === 89) {
      event.preventDefault()
      const playPauseButtonRef = document.getElementById("play-pause")
      playPauseButtonRef.click()
    }
  }

  return(
    <div id="drum-machine">

      <div id="main-title">DRUM MIXER MACHINE</div>

      <div id="sequencer-part">
        <div id="sequencer-title">NOTES SEQUENCER DISPLAY</div>
        <div id="display">
          {sequence.map((n, i) => (
            <div id="sequencer-display" key={i} style={i == padRefs.current && sequencerNote ? { color: 'mediumorchid' } : { color: 'forestgreen' }}>{powerSwitch && n}</div>
          ))}
        </div>
      </div>

      <div id="drum-part">
        <div id="drum-title">DRUM PADS</div>
        <div id="drum-pads">
        {bank
        ? <Drums bank={bankOne} volumeBar={volumeBar} remixSpeed={remixSpeed} powerSwitch={powerSwitch} setDisplayText={setDisplayText}
        sequence={sequence} setSequence={setSequence} remix={remix} setRemix={setRemix} remixRef={remixRef} padRefs={padRefs}
        onRefFromDrum={handleDrumRef} handleDisplayChange={handleDisplayChange} handleSequenceChange={handleSequenceChange} handleButtonClick={handleButtonClick} />
        : <Drums bank={bankTwo} volumeBar={volumeBar} remixSpeed={remixSpeed} powerSwitch={powerSwitch} setDisplayText={setDisplayText}
        sequence={sequence} setSequence={setSequence} remix={remix} setRemix={setRemix} remixRef={remixRef} padRefs={padRefs}
        onRefFromDrum={handleDrumRef} handleDisplayChange={handleDisplayChange} handleSequenceChange={handleSequenceChange} handleButtonClick={handleButtonClick} />}
        </div>
      </div>

      <div id="note-part">
        <div id="note-title">NOTE DISPLAY</div>
        <div id="note-display">{powerSwitch && displayText}</div>
      </div>

      <div id="status-part">
        <div id="status-title">STATUS DISPLAY</div>
          <div id="status-display">{powerSwitch && (remix
          ? (<>{drumRef.current == 0 
          ? <>Playing</>
          : drumRef.current == 1 ? <>Playing.</>
          : drumRef.current == 2 ? <>Playing..</>
          : drumRef.current == 3 ? <>Playing...</>
          : null}</>)
          : <>Ready</>)}
          </div>
      </div>

      <div id="set-remix-part">
        <div id="set-remix-title">SET REMIX</div>
        <div id="set-remix-display">{powerSwitch && <>Reset S. - Play/Pause - M. Note</>}</div>
        <div id="set-remix-buttons">
          <button id="reset" onClick={() => {setRemix(false); padRefs.current = 0; setSequence(Array(24).fill("M")); handleButtonClick("reset")}}>R</button>
          <button id="play-pause" onClick={() => {setSequencerNote(true); handleRemix(); handleButtonClick("play-pause")}}>Y</button>
          <button id="muted-note" onClick={() => {handleSequenceChange("M"); handleDisplayChange("Muted-Note"); handleButtonClick("muted-note")}}>M</button>
        </div>
      </div>
      
      <div id="set-kit-part">
        <div id="set-kit-title">SET KIT</div>
        <div id="set-kit-display">{powerSwitch ? <>{bank ? <>Heater Band Kit</> : <>Smooth Piano Kit</>}</> : <></>}</div>
        <div id="set-kit-buttons">
          <button id="heater-kit-button" onClick={() => {setRemix(false); setBank(true); handleButtonClick("heater-kit-button")}}>I</button>
          <button id="smooth-piano-kit-button" onClick={() => {setRemix(false); setBank(false); handleButtonClick("smooth-piano-kit-button")}}>O</button>
        </div>
      </div>

      <div id="set-volume-part">
        <div id="set-volume-title">SET VOLUME</div>
        <div id="set-volume-display">{powerSwitch && <>Machines Volume: {Math.round(volumeBar * 100)} %</>}</div>
        <div id="set-volume-buttons">
          <button id="dec-volume" onClick={() => {setVolumeBar(prevVolume => Math.max(0, prevVolume - 0.05)); handleButtonClick("dec-volume")}} disabled={!powerSwitch}>G</button>
          <button id="inc-volume" onClick={() => {setVolumeBar(prevVolume => Math.min(1, prevVolume + 0.05)); handleButtonClick("inc-volume")}} disabled={!powerSwitch}>H</button>
        </div>
      </div>

      <div id="set-speed-part">
        <div id="set-speed-title">SET SPEED</div>
        <div id="set-speed-display">{powerSwitch && <>Remix Speed: {remixSpeed} ms</>}</div>
        <div id="set-speed-buttons">
          <button id="dec-remix" onClick={() => {setRemixSpeed(prevSpeed => Math.min(3000, prevSpeed + 50)); handleButtonClick("dec-remix")}} disabled={!powerSwitch}>J</button>
          <button id="inc-remix" onClick={() => {setRemixSpeed(prevSpeed => Math.max(50, prevSpeed - 50)); handleButtonClick("inc-remix")}} disabled={!powerSwitch}>K</button>        
        </div>
      </div>      
      
      <div id="power-part">
        <div id="power-title">POWER</div>
        <div id="power-button">
          <button id="power" onClick={() => {setPowerSwitch(!powerSwitch); setSequencerNote(!sequencerNote); padRefs.current = 0; handleButtonClick("power")}}>V</button>
        </div>
      </div>
    </div>
  )
}

createRoot(document.getElementById("root")).render(<App />)
