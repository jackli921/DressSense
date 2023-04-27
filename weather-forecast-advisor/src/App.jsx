import { useState } from 'react'
import './App.css'

function App() {

  const [input, setInput] = useState("")


  function getCityLongLat(){
    console.log("I am clicked")
  }

  
  return (
    <>
      <h1>Is this working right now?</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      {/* <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
       */}
      <button onClick={() => getCityLongLat()}>
        Convert to Longitude & Latitude
      </button>
    </>
  );
}

export default App
