const {useState, useEffect} = React;

const App = () => {
  const [expression, setExpression] = useState('0')

  const regex = /[+\-*/]{2}$/
  const max_length = 32

  const appendNumber = (number) => {
    if (expression.toString().length >= max_length) {
      setExpression((prevText) => prevText)
    } else if (expression == "0") {
      setExpression(number)
    } else if (expression.toString().slice(-2) === "*0" || expression.toString().slice(-2) === "/0" || expression.toString().slice(-2) === "-0" || expression.toString().slice(-2) === "+0") {
      setExpression((prevText) => prevText.slice(0, -1) + number)
    } else {
      setExpression((prevText) => prevText + number) 
    }
  }

  const handleClick = (id) => {
    switch (id) {
      case "clear":
        setExpression("0")
        const ClearButtonRef = document.getElementById("clear")
        ClearButtonRef.classList.add("pressed-button")
        setTimeout(() => ClearButtonRef.classList.remove("pressed-button"), 300)
        break;
      case "delete":
        if (expression == "0") {
          setExpression("0")
        } else if (expression.length == 1) {
          setExpression("0")
        } else {
          setExpression((prevText) => prevText.slice(0, -1))
        }
        const DeleteButtonRef = document.getElementById("delete")
        DeleteButtonRef.classList.add("pressed-button")
        setTimeout(() => DeleteButtonRef.classList.remove("pressed-button"), 300)
        break;
      case "decimal":
        if (expression.toString().length >= max_length) {
          setExpression((prevText) => prevText)
        } else if (expression.toString().slice(-1) === "." || (expression.toString().split(/[+*\-\/]/).pop().indexOf(".") !== -1)) {
          setExpression((prevText) => prevText)
        } else if (expression.toString().slice(-1) === "+" || expression.toString().slice(-1) === "-" || expression.toString().slice(-1) === "*" || expression.toString().slice(-1) === "/") {
          setExpression((prevText) => prevText + "0.")
        } else {
          setExpression((prevText) => prevText + ".")
        }
        const DecimalButtonRef = document.getElementById("decimal")
        DecimalButtonRef.classList.add("pressed-button")
        setTimeout(() => DecimalButtonRef.classList.remove("pressed-button"), 300)
        break;
      case "equals":
        try {
          eval(expression).toFixed(4).replace(/\.?0+$/, '')
          setExpression(eval(expression).toFixed(4).replace(/\.?0+$/, ''))
        } catch (error) {
          setExpression((prevText) => prevText)
        }
        const EqualsButtonRef = document.getElementById("equals")
        EqualsButtonRef.classList.add("pressed-button")
        setTimeout(() => EqualsButtonRef.classList.remove("pressed-button"), 300)
        break;
      case "add":
        if (expression.toString().slice(-1) === "+" || expression.toString().length >= max_length) {
          setExpression((prevText) => prevText)
        } else if (expression.toString().slice(-2) === "**") {
          setExpression((prevText) => prevText)
        } else if (regex.test(expression)) {
          setExpression((prevText) => prevText.slice(0, -2) + "+")
        } else if (expression.toString().slice(-1) === "-" || expression.toString().slice(-1) === "/" || expression.toString().slice(-1) === "*") {
          setExpression((prevText) => prevText.slice(0, -1) + "+")
        } else {
          setExpression((prevText) => prevText + "+")
        }
        const AddButtonRef = document.getElementById("add")
        AddButtonRef.classList.add("pressed-button")
        setTimeout(() => AddButtonRef.classList.remove("pressed-button"), 300)
        break;
      case "subtract":
        if (expression.toString().slice(-1) === "-" || expression.toString().length >= max_length) {
          setExpression((prevText) => prevText)
        } else if (expression.toString().slice(-2) === "**") {
          setExpression((prevText) => prevText + "-")
        } else if (regex.test(expression)) {
          setExpression((prevText) => prevText.slice(0, -2) + "-")
        } else if (expression.toString().slice(-1) === "+") {
          setExpression((prevText) => prevText.slice(0, -1) + "-")
        } else {
          setExpression((prevText) => prevText + "-")
        }
        const SubtractButtonRef = document.getElementById("subtract")
        SubtractButtonRef.classList.add("pressed-button")
        setTimeout(() => SubtractButtonRef.classList.remove("pressed-button"), 300)
        break;
      case "multiply":
        if (expression.toString().slice(-2) === "**" || expression.toString().length >= max_length) {
          setExpression((prevText) => prevText)
        } else if (regex.test(expression)) {
          setExpression((prevText) => prevText.slice(0, -2) + "*")
        } else if (expression.toString().slice(-1) === "*") {
          setExpression((prevText) => prevText + "*")
        } else if (expression.toString().slice(-1) === "-" || expression.toString().slice(-1) === "/" || expression.toString().slice(-1) === "+") {
          setExpression((prevText) => prevText.slice(0, -1) + "*")
        } else {
          setExpression((prevText) => prevText + "*")
        }
        const MultiplyButtonRef = document.getElementById("multiply")
        MultiplyButtonRef.classList.add("pressed-button")
        setTimeout(() => MultiplyButtonRef.classList.remove("pressed-button"), 300)
        break;
      case "divide":
        if (expression.toString().slice(-1) === "/" || expression.toString().length >= max_length) {
          setExpression((prevText) => prevText)
        } else if (regex.test(expression)) {
          setExpression((prevText) => prevText.slice(0, -2) + "/")
        } else if (expression.toString().slice(-1) === "-" || expression.toString().slice(-1) === "*" || expression.toString().slice(-1) === "+") {
          setExpression((prevText) => prevText.slice(0, -1) + "/")
        } else {
          setExpression((prevText) => prevText + "/")
        }
        const DivideButtonRef = document.getElementById("divide")
        DivideButtonRef.classList.add("pressed-button")
        setTimeout(() => DivideButtonRef.classList.remove("pressed-button"), 300)
        break;
      case "zero":
        appendNumber("0")
        const zeroButtonRef = document.getElementById("zero")
        zeroButtonRef.classList.add("pressed-button")
        setTimeout(() => zeroButtonRef.classList.remove("pressed-button"), 300)
        break;
      case "one":
        appendNumber("1")
        const OneButtonRef = document.getElementById("one")
        OneButtonRef.classList.add("pressed-button")
        setTimeout(() => OneButtonRef.classList.remove("pressed-button"), 300)
        break;
      case "two":
        appendNumber("2")
        const TwoButtonRef = document.getElementById("two")
        TwoButtonRef.classList.add("pressed-button")
        setTimeout(() => TwoButtonRef.classList.remove("pressed-button"), 300)
        break;
      case "three":
        appendNumber("3")
        const ThreeButtonRef = document.getElementById("three")
        ThreeButtonRef.classList.add("pressed-button")
        setTimeout(() => ThreeButtonRef.classList.remove("pressed-button"), 300)
        break;
      case "four":
        appendNumber("4")
        const FourButtonRef = document.getElementById("four")
        FourButtonRef.classList.add("pressed-button")
        setTimeout(() => FourButtonRef.classList.remove("pressed-button"), 300)
        break;
      case "five":
        appendNumber("5")
        const FiveButtonRef = document.getElementById("five")
        FiveButtonRef.classList.add("pressed-button")
        setTimeout(() => FiveButtonRef.classList.remove("pressed-button"), 300)
        break;
      case "six":
        appendNumber("6")
        const SixButtonRef = document.getElementById("six")
        SixButtonRef.classList.add("pressed-button")
        setTimeout(() => SixButtonRef.classList.remove("pressed-button"), 300)
        break;
      case "seven":
        appendNumber("7")
        const SevenButtonRef = document.getElementById("seven")
        SevenButtonRef.classList.add("pressed-button")
        setTimeout(() => SevenButtonRef.classList.remove("pressed-button"), 300)
        break;
      case "eight":
        appendNumber("8")
        const EightButtonRef = document.getElementById("eight")
        EightButtonRef.classList.add("pressed-button")
        setTimeout(() => EightButtonRef.classList.remove("pressed-button"), 300)
        break;
      case "nine":
        appendNumber("9")
        const NineButtonRef = document.getElementById("nine")
        NineButtonRef.classList.add("pressed-button")
        setTimeout(() => NineButtonRef.classList.remove("pressed-button"), 300)
        break;
      default:
        setExpression("0")
        break;
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [])

  function handleKeyPress(event) {
    if (event.keyCode === 48 || event.keyCode === 96) {
      event.preventDefault()
      const buttonRef = document.getElementById("zero")
      buttonRef.click()
    } else if (event.keyCode === 49 || event.keyCode === 35) {
      event.preventDefault()
      const buttonRef = document.getElementById("one")
      buttonRef.click()
    } else if (event.keyCode === 50 || event.keyCode === 40) {
      event.preventDefault()
      const buttonRef = document.getElementById("two")
      buttonRef.click()
    } else if (event.keyCode === 51 || event.keyCode === 34) {
      event.preventDefault()
      const buttonRef = document.getElementById("three")
      buttonRef.click()
    } else if (event.keyCode === 52 || event.keyCode === 37) {
      event.preventDefault()
      const buttonRef = document.getElementById("four")
      buttonRef.click()
    } else if (event.keyCode === 53 || event.keyCode === 12) {
      event.preventDefault()
      const buttonRef = document.getElementById("five")
      buttonRef.click()
    } else if (event.keyCode === 54 || event.keyCode === 39) {
      event.preventDefault()
      const buttonRef = document.getElementById("six")
      buttonRef.click()
    } else if (event.keyCode === 55 || event.keyCode === 36) {
      event.preventDefault()
      const buttonRef = document.getElementById("seven")
      buttonRef.click()
    } else if (event.keyCode === 56 || event.keyCode === 38) {
      event.preventDefault()
      const buttonRef = document.getElementById("eight")
      buttonRef.click()
    } else if (event.keyCode === 57 || event.keyCode === 33) {
      event.preventDefault()
      const buttonRef = document.getElementById("nine")
      buttonRef.click()
    } else if (event.keyCode === 190 || event.keyCode === 110) {
      event.preventDefault()
      const buttonRef = document.getElementById("decimal")
      buttonRef.click()
    } else if (event.keyCode === 171 || event.keyCode === 107) {
      event.preventDefault()
      const buttonRef = document.getElementById("add")
      buttonRef.click()
    } else if (event.keyCode === 175 || event.keyCode === 109) {
      event.preventDefault()
      const buttonRef = document.getElementById("subtract")
      buttonRef.click()
    } else if (event.keyCode === 0 || event.keyCode === 106) {
      event.preventDefault()
      const buttonRef = document.getElementById("multiply")
      buttonRef.click()
    } else if (event.keyCode === 174 || event.keyCode === 111) {
      event.preventDefault()
      const buttonRef = document.getElementById("divide")
      buttonRef.click()
    } else if (event.keyCode === 8 || event.keyCode === 67) {
      event.preventDefault()
      const buttonRef = document.getElementById("delete")
      buttonRef.click()
    } else if (event.keyCode === 46 || event.keyCode === 65) {
      event.preventDefault()
      const buttonRef = document.getElementById("clear")
      buttonRef.click()
    } else if (event.keyCode === 13) {
      event.preventDefault()
      const buttonRef = document.getElementById("equals")
      buttonRef.click()
    }
  }

  return(
    <div className="calculator" id="calculator">
      <div className="grid">
      <div className="calculator-title">Numpad Calculator</div>
        <div className="screen" id="display">{expression}</div>
        <button className="button" id="clear" onClick={() => handleClick("clear")}>AC</button>
        <button className="button" id="delete" onClick={() => handleClick("delete")}>C</button>
        <button className="button" id="equals" onClick={() => handleClick("equals")}>=</button>
        <button className="button" id="seven" onClick={() => handleClick("seven")}>7</button>
        <button className="button" id="eight" onClick={() => handleClick("eight")}>8</button>
        <button className="button" id="nine" onClick={() => handleClick("nine")}>9</button>
        <button className="button" id="divide" onClick={() => handleClick("divide")}>%</button>
        <button className="button" id="four" onClick={() => handleClick("four")}>4</button>
        <button className="button" id="five" onClick={() => handleClick("five")}>5</button>
        <button className="button" id="six" onClick={() => handleClick("six")}>6</button>
        <button className="button" id="multiply" onClick={() => handleClick("multiply")}>x</button>
        <button className="button" id="one" onClick={() => handleClick("one")}>1</button>
        <button className="button" id="two" onClick={() => handleClick("two")}>2</button>
        <button className="button" id="three" onClick={() => handleClick("three")}>3</button>
        <button className="button" id="subtract" onClick={() => handleClick("subtract")}>-</button>
        <button className="button" id="zero" onClick={() => handleClick("zero")}>0</button>
        <button className="button" id="decimal" onClick={() => handleClick("decimal")}>.</button>
        <button className="button" id="add" onClick={() => handleClick("add")}>+</button>       
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("app"))