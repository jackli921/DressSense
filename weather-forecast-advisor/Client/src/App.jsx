import { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");

  async function getApiKey() {
    const response = await fetch("http://localhost:3000/api_key");
    const data = await response.json();
    const apiKey = data.apiKey;
    // use apiKey in your weather API request
    getWeatherData(apiKey);
  }

  async function getWeatherData(apiKey) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&APPID=${apiKey}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      makePrompt(data);
    } catch (error) {
      console.log(error, "error fetching the api key");
    }
  }

  // create a function to concatenate human prompt with weather data
  function makePrompt(data) {
    const sentence =
      "Could you give me some suggestions for what to wear today given the following weather data in my city, which is also inside the weather data " +
      JSON.stringify(data);
    console.log(sentence);
    // function call
  }

  // create a new function to make an API call to the OPENAI API

  return (
    <>
      <h1>☀️Are you dressed for the weather? ☔️ </h1>
      <p>
        Tell me your location, and AI will give you suggestions for what to
        dress for the day{" "}
      </p>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={() => getApiKey()}>Get Suggestion</button>
    </>
  );
}

export default App;
