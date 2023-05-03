const {useState, useEffect} = React;

const App = () => {
  const [expression, setExpression] = useState('0')

  const regex = /[+\-*/]{2}$/
  const max_length = 36

  const handleClick = (id) => {
    switch (id) {
      case "clear":
        setExpression(0)
        break;
      case "delete":
        if (expression == 0) {
          setExpression(0)
        } else {
          setExpression((prevText) => prevText.slice(0, -1))
        }
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
        break;
      case "equals":
        setExpression(eval(expression).toFixed(4).replace(/\.?0+$/, ''))
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
        break;
      case "zero":
        if (expression == 0 || expression.toString().length >= max_length) {
          setExpression((prevText) => prevText)
        } else {
          setExpression((prevText) => prevText + "0") 
        }
        break;
      case "one":
        if (expression.toString().length >= max_length) {
          setExpression((prevText) => prevText)
        } else if (expression == 0) {
          setExpression(1)
        } else {
          setExpression((prevText) => prevText + "1") 
        }
        break;
      case "two":
        if (expression.toString().length >= max_length) {
          setExpression((prevText) => prevText)
        } else if (expression == 0) {
          setExpression(2)
        } else {
          setExpression((prevText) => prevText + "2") 
        }
        break;
      case "three":
        if (expression.toString().length >= max_length) {
          setExpression((prevText) => prevText)
        } else if (expression == 0) {
          setExpression(3)
        } else {
          setExpression((prevText) => prevText + "3") 
        }
        break;
      case "four":
        if (expression.toString().length >= max_length) {
          setExpression((prevText) => prevText)
        } else if (expression.toString().length >= max_length) {
          setExpression((prevText) => prevText)
        } else if (expression == 0) {
          setExpression(4)
        } else {
          setExpression((prevText) => prevText + "4") 
        }
        break;
      case "five":
        if (expression.toString().length >= max_length) {
          setExpression((prevText) => prevText)
        } else if (expression == 0) {
          setExpression(5)
        } else {
          setExpression((prevText) => prevText + "5") 
        }
        break;
      case "six":
        if (expression.toString().length >= max_length) {
          setExpression((prevText) => prevText)
        } else if (expression == 0) {
          setExpression(6)
        } else {
          setExpression((prevText) => prevText + "6") 
        }
        break;
      case "seven":
        if (expression.toString().length >= max_length) {
          setExpression((prevText) => prevText)
        } else if (expression == 0) {
          setExpression(7)
        } else {
          setExpression((prevText) => prevText + "7") 
        }
        break;
      case "eight":
        if (expression.toString().length >= max_length) {
          setExpression((prevText) => prevText)
        } else if (expression == 0) {
          setExpression(8)
        } else {
          setExpression((prevText) => prevText + "8") 
        }
        break;
      case "nine":
        if (expression.toString().length >= max_length) {
          setExpression((prevText) => prevText)
        } else if (expression == 0) {
          setExpression(9)
        } else {
          setExpression((prevText) => prevText + "9") 
        }
        break;
      default:
        setExpression(0)
        break;
    }
  };

  return(
    <div className="calculator" id="calculator">
      <div className="screen" id="display">{expression}</div>
      <div className="grid">
        <button className="button" id="clear" onClick={() => handleClick("clear")}>AC</button>
        <button className="button" id="delete" onClick={() => handleClick("delete")}>C</button>
        <button className="button" id="equals" onClick={() => handleClick("equals")}>=</button>
        <button className="button" id="seven" onClick={() => handleClick("seven")}>7</button>
        <button className="button" id="eight" onClick={() => handleClick("eight")}>8</button>
        <button className="button" id="nine" onClick={() => handleClick("nine")}>9</button>
        <button className="button" id="divide" onClick={() => handleClick("divide")}>/</button>
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