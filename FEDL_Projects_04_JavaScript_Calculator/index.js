const {useState, useEffect} = React;

/*const Volume = () => {
  return(
    <h4>Volume</h4>
  )
} 
*/

const App = () => {
  const [expression, setExpression] = useState("")

  return(
    <div className="calculator">
      <div className="grid">
        <button  class="button" className="padButton-AC">AC</button>
        <button  class="button" className="padButton-C">C</button>
        <button  class="button" className="padButton-div">/</button>
        <button  class="button" className="padButton-mul">x</button>
        <button onClick={() => display("7")} class="button" className="padButton-svn">7</button>
        <button class="button" className="padButton-eit">8</button>
        <button class="button" className="padButton-nin">9</button>
        <button class="button" className="padButton-dif">-</button>
        <button class="button" className="padButton-fou">4</button>
        <button class="button" className="padButton-fiv">5</button>
        <button class="button" className="padButton-six">6</button>
        <button class="button" className="padButton-plu">+</button>
        <button class="button" className="padButton-one">1</button>
        <button class="button" className="padButton-two">2</button>
        <button class="button" className="padButton-tre">3</button>
        <button class="button" className="padButton-eql">=</button>
        <button class="button" className="padButton-zro">0</button>
        <button class="button" className="padButton-dot">.</button>
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("app"))