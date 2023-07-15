const { createRoot } = ReactDOM
const {useState} = React

marked.setOptions({
  breaks: true  
})

const renderer = new marked.Renderer()

const Console = ({text, handleText}) => {
  return(
    <>
    <div className="console-container">
    <div className="console-title-bar"><h2>Console</h2></div>
    <textarea id="editor" className="console-content" spellCheck={false} onChange={handleText} defaultValue={text}></textarea>
    </div>
    </>
  )}

const Render = ({text}) => {
  return(
    <>
    <div className="render-container">
    <div className="render-title-bar"><h2>Render</h2></div>
    <div id="preview" className="render-content"
    dangerouslySetInnerHTML={{
      __html: marked(text, {renderer: renderer}),
    }}></div>
    </div>
    </>
  )}

const App = () => {

  const defaultText = `# Welcome to The Markdown Previewer!
  ## ReactJS vibes...
  \n<code>import neo as neo
  from * import assembly, fortran, shell, haskell, qiskit, c++, etc...</code>
  \n<h1>Neo is typing...</h1>
  \n<blockquote>'Choice is an illusion'</blockquote> - that's the greatest lesson from the second movie
  \n<h3>List of things to do to become a Fullstack Software Engineer:</h3>
  \n<ul><li>Watch TechLead videos</li><li>Use many different frameworks</li><li>Never stop learning</li></ul>
  \n<p>Maybe first one is depecrated, gotta check <b>StackOverflow</b>...</p>
  \n<p>Don't you know how to reach it? Click <a href="https://stackoverflow.com/">here</a></p>
  \n<p>or you can actually ask <b>ChatGPT</b>, no, it doesn't stands for 'chat' as in <em>French</em></p>
  \n
  \n<h2>Are we achieving the singularity by the end of this decade?</h2>
  \n<pre>Let's find out!</pre>
  \n<h4>Nash man</h4>
  \n![Hash Hash Hash](http://s2.glbimg.com/AZc21w-7oQOTCP7Rpd2762va1Uw=/e.glbimg.com/og/ed/f/original/2015/05/25/john-nash-abel.jpg)
  \n[Nash man work](https://en.wikipedia.org/wiki/Nash_embedding_theorems)
  \n<p>Do you know him? He is among the <strong>healthiest</strong> mathematics **PhDs**...</p>
  \n\`<>is this a monad?</>\`
  \` <div>no way!</div> \`
  \`\`\`
  error 404<Component/>
  \`\`\`
  \n
  \n To do list:
  1. try
  2. while life try
  3. while life try harder
  \n
  The oath:
  > Financially independent retire early, FIRE.
  \n
  \n***Nightwalk***`;
  const [text, setText] = React.useState(defaultText)
  
  function handleText(event) {
    setText(event.target.value)
  }
  
  return(
    <div>
      <div className="app-title"><h1>The Markdown Previewer</h1></div>
      <div className="app-container">
      <Console text={text} handleText={handleText}/>
      <Render text={text}/>
      </div>
    </div>
  )
}

createRoot(document.getElementById("root")).render(<App />)
