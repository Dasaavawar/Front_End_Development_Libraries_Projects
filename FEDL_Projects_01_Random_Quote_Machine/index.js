const {useState, useEffect} = React;

const QuoteBox = () => {
    
  const colorsObj = {
  '0': '#16a085',
  '1': '#27ae60',
  '2': '#2c3e50',
  '3': '#f39c12',
  '4': '#e74c3c',
  '5': '#9b59b6',
  '6': '#FB6964',
  '7': '#342224',
  '8': '#472E32',
  '9': '#BDBB99',
  '10': '#77B1A9',
  '11': '#73A857',
  '12': '#EE82EE',
  '13': '#FFA07A',
  '14': '#40E0D0',
  '15': '#FFD700',
  '16': '#8A2BE2',
  '17': '#FF69B4',
  '18': '#00BFFF',
  '19': '#7FFFD4',
  '20': '#FFC0CB',
  '21': '#00FFFF',
  '22': '#FF4500',
  '23': '#6495ED',
  '24': '#DC143C',
  '25': '#9400D3',
  '26': '#00FA9A',
  '27': '#9932CC',
  '28': '#FF6347',
  '29': '#6B8E23',
  '30': '#FF7F50',
  '31': '#1E90FF',
  '32': '#00FF00',
  '33': '#FF00FF',
  '34': '#FFA500'
}
  
  const colors = Object.values(colorsObj);

  const randomColorIndex = (colorIndex) => {
    let index = Math.floor(Math.random() * (colors.length - 1))
  if (index >= colorIndex) {
    index += 1;
  }
    return index;
}

  const baseURL = "https://type.fit/api/quotes"

  const [quotes, setQuotes] = React.useState([])
  const [colorIndex, setColorIndex] = React.useState(randomColorIndex())
  const [quoteIndex, setQuoteIndex] = React.useState("")
  const [randomQuote, setRandomQuote] = React.useState("")

  const randomQuoteIndex = (quoteIndex) => {
    let index = Math.floor(Math.random() * (quotes.length - 1))
  if (index >= quoteIndex) {
    index += 1;
  }
    return index;
}

  useEffect(() => {
    setColorIndex(randomColorIndex())
    document.documentElement.style.setProperty('--color', `${colors[colorIndex]}`)
    
    axios.get(baseURL).then(response => {
        setQuotes(response.data)
        let initIndex = Math.floor(Math.random() * (response.data.length - 1))
        setRandomQuote(response.data[initIndex])
    })

  }, []);
  
  function handleNewQuote() {
    setColorIndex(randomColorIndex())
    document.documentElement.style.setProperty('--color', `${colors[colorIndex]}`)
    setRandomQuote(quotes[randomQuoteIndex()])
  }
  
  return (
    <div id="quote-box">
      <p id="text">“{randomQuote.text}”</p>
      <h2 id="author">- {randomQuote.author?.trim() ? <>{randomQuote.author}</> : <>Anonymous</>}</h2>
      <div class="actions">
      <button id="new-quote" class="button" onClick={handleNewQuote}>New Quote~</button>
      <button class="button">
        <a id="tweet-quote" href="https://twitter.com/intent/tweet" >Tweet</a>
      </button>
      </div>
    </div>
  )}

const App = () => {
  return(
  <QuoteBox />
  )
}

ReactDOM.render(<App />, document.getElementById("app"))