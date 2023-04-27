import { useState } from 'react'
import './App.css'

function App() {

  const [input, setInput] = useState("")

  async function getCityLongLat(){
    console.log("I am clicked")
    const api_key = "e954d4b02d39f016fc2015cb929cffa9";

   try{
     const response = await fetch(
       `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&APPID=e954d4b02d39f016fc2015cb929cffa9`
     );
     const data = await response.json()
     console.log(data)
    } 
   catch(error){
    console.error("Error fetching data:", error)
   } 
   
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
        Get Weather Data
      </button>
    </>
  );
}

export default App
