import { useEffect, useState } from "react";
import "./App.css";
import cityData from './cities.js'
import SearchResults from "./components/searchResults";



function App() {
  const [input, setInput] = useState("");
  const [weatherData, setWeatherData] = useState("")
  const [AiSuggestion, setAiSuggestion] = useState("")
  const [paragraphs, setParagraph] = useState("")
  const [cityDataArr, setCityDataArr] = useState(cityData)
  const [filteredData, setFilteredData] = useState([])
  const [isSidebarVisible, setIsSidebarVisible] = useState(true)



  async function getApiKey() {
    const response = await fetch("http://localhost:3080/api_key");
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
      setWeatherData(data);
      
    } catch (error) {
      console.log(error, "error fetching the api key");
    }
  }
  
  async function getAdvice(){
    try{
      const sentence =
        "Could you give me some suggestions for what to wear today given the following weather data in my city, which is also inside the weather data " +
        JSON.stringify(weatherData);

      const response = await fetch("http://localhost:3080", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: sentence,
        }),
      });

      const data = await response.json();
      const suggestion = data.message
      setAiSuggestion(suggestion);      
    }
    catch(error){
      console.log(error)
    }
  }

  function updateSearch() {
    if (input.length > 0) {
      const lowercaseUserInput = input.toLowerCase();
      const filteredDataArr = cityDataArr.filter((place) => {
        place.lowercaseName = place.name.toLowerCase();
        return (
          place.lowercaseName.indexOf(lowercaseUserInput) >= 0
        );
      });
      setFilteredData(filteredDataArr);
    }
  }

  useEffect(()=>{
    updateSearch()
    setIsSidebarVisible(true)
  },[input])


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
      
      <div className="search-result-container" >
        {isSidebarVisible &&       
        <SearchResults 
          setIsSidebarVisible ={setIsSidebarVisible}
          filteredData = {filteredData}
          setInput = {setInput}
        /> }
       </div>

      <button onClick={() => getApiKey()}>Get Weather Data</button>
      {weatherData && (
        <button onClick={() => getAdvice()}>Get Suggestions</button>
      )}
      {AiSuggestion && (
        <pre>
          {AiSuggestion}
        </pre>
      )}
    </>
  );
}

export default App;
