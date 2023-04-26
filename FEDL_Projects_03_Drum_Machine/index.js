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

const Pad = ({note, volumeBar}) => {

  const [hoverButton, setHoverButton] = useState(false)
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [])

  function handleKeyPress(event) {
    if (event.keyCode === note.keyCode) {
      setDisplayText(note.keyTrigger);
      playSound(note.keyTrigger)
    }
  }

  const playSound = () => {
    const audioTag = document.getElementById(String.fromCharCode(note.keyCode));
    // const audioTag = document.getElementById(note.keyTrigger);
    // const audioTag = new Audio(audioUrl)
    audioTag.play()
    setHoverButton(true);
    setTimeout(() => setHoverButton(false), 200)
    audioTag.currentTime = 0;
    audioTag.volume = volumeBar;
   
  }

  return(
    <div class="drum-pad" id={note.id}>
    <button id={note.id} onClick={playSound}>
      <audio class="clip" id={note.keyTrigger} src={note.url}></audio>
      {note.keyTrigger}
    </button>
     <div id="display" text={note.keyTrigger}></div>
    </div>
  )
}

const Drums = ({bank, volumeBar}) => {
    return(
      <div class="grid">
      <Pad key={bank[0].id} note={bank[0]} volumeBar={volumeBar}/>
      <Pad key={bank[1].id} note={bank[1]} volumeBar={volumeBar}/>
      <Pad key={bank[2].id} note={bank[2]} volumeBar={volumeBar}/>
      <Pad key={bank[3].id} note={bank[3]} volumeBar={volumeBar}/>
      <Pad key={bank[4].id} note={bank[4]} volumeBar={volumeBar}/>
      <Pad key={bank[5].id} note={bank[5]} volumeBar={volumeBar}/>
      <Pad key={bank[6].id} note={bank[6]} volumeBar={volumeBar}/>
      <Pad key={bank[7].id} note={bank[7]} volumeBar={volumeBar}/>
      <Pad key={bank[8].id} note={bank[8]} volumeBar={volumeBar}/>
      </div>
    )
}

const App = () => {

  const [volumeBar, setVolumeBar] = useState(1)
  const [bank, setBar] = useState(false)

  return(
    <div class="title" id="drum-machine">
          
      <h2>Drum Machine</h2>
      {bank ? <>You are playing bankOne</> : <>You are playing bankTwo</>}
      {bank ? <Drums bank={bankOne} volumeBar={volumeBar}/> : <Drums bank={bankTwo} volumeBar={volumeBar}/>}
                
        
      <h1>Change the bank!</h1>
      <button onClick={() => setBar(!bank)}>{bank ? <>bankTwo</> : <>bankOne</>}</button>
    </div>
  )
}

/*{bankTwo.map(bank => (
          <Pad key={bank.id} bank={bank} volumeBar={volumeBar}/>
        ))} */

/*<input type="range" step="0.01" onChange={(e) => setVolumeBar(e.target.value)} value={volumeBar} max="1" min="0" className="w-50"/>*/

ReactDOM.render(<App />, document.getElementById("app"))