import { useEffect, useState } from "react";
import "./App.css";
import cityData from './cities.js'
import SearchResults from "./components/searchResults";


function App() {
  const [input, setInput] = useState("");
  const [weatherData, setWeatherData] = useState("")
  const [AiSuggestion, setAiSuggestion] = useState("")

  const [cityDataArr, setCityDataArr] = useState(cityData)
  const [filteredData, setFilteredData] = useState([])
  const [isCityList, setIsCityList] = useState(true)
  const [isSearchBtnVisible, setIsSearchBtnVisible] = useState(false)
  const [isLoadingData, setIsLoadingData] = useState(false)
  const [suggestionContent, setSuggestionContent] = useState(
    <h2>Ready when you are!</h2>
  );


  async function getApiKey() {
    const response = await fetch("https://ai-weather-dressing-advisor.onrender.com/api_key");
    const data = await response.json();
    const apiKey = data.apiKey;
    // use apiKey in your weather API request
    getWeatherData(apiKey);
  }


  async function getWeatherData(apiKey) {
    setIsLoadingData(true)
    const city = filteredData[0]
    const lon = city.lon
    const lat = city.lat
  
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setWeatherData(data);
    
      
    } catch (error) {
      console.log(error, "error fetching the api key");
    }
  }


  // make fetch call to open API when weatherdata exists
  useEffect(()=>{
    if(weatherData && filteredData[0] && input === filteredData[0].name){

      const sentence =
        "Give suggestions for what to wear today given the following weather data in my city. The temperature data given are in kelvins,so in your response please convert any temperature you use into celsius. Give a summary and 3-5 suggestions in bullet points." +
        JSON.stringify(weatherData);

      fetch("https://ai-weather-dressing-advisor.onrender.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: sentence,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          const suggestion = data.message;
          setAiSuggestion(suggestion);
          setIsLoadingData(false);
        })
        .catch((error) => {
          setIsLoadingData(false);
          console.log(error);
        });
    }
  
  },[weatherData])

  // verifying if input exists and populating city list if no input is detected

  useEffect(()=>{
    if (input.length > 0) {
      const lowercaseUserInput = input.toLowerCase();
      const filteredDataArr = cityDataArr.filter((place) => {
        place.lowercaseName = place.name.toLowerCase();
        return place.lowercaseName.indexOf(lowercaseUserInput) >= 0;
      });

      setFilteredData(filteredDataArr);
    }
    if (input === "") {
      setIsCityList(true);
      setFilteredData(cityData);
    }
  }, [input])

  // disable visibility of city list and search button based on state of input 
  
  useEffect(()=>{
    if(filteredData.length === 1 && filteredData[0].name === input){
      setIsCityList(false);
      setIsSearchBtnVisible(true)
    }
    else{
      setIsCityList(true);
      setIsSearchBtnVisible(false);
    }

  },[filteredData])


  // conditionally render text based on loading status
  useEffect(()=>{
    
    if(!AiSuggestion && isLoadingData){
      setSuggestionContent(<h2>Getting your suggestion ... </h2>)
    }
    else if(AiSuggestion && !isLoadingData){
      setSuggestionContent(<pre>{AiSuggestion}</pre>);
    }

  },[isLoadingData, AiSuggestion])

  return (
    <>
      <h1>☀️Are you dressed for the weather? ☔️ </h1>
      <p>
        Tell me your location, and AI will give you suggestions for what to
        dress for the day{" "}
      </p>

      <main className="main">
        <section className="input-container">
          <input
            type="search"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <div className="inline">
            {isSearchBtnVisible && (
              <button onClick={() => getApiKey()}>Get Suggestion</button>
            )}
          </div>
        </section>

        <div className="search-result-container">
          {isCityList && (
            <SearchResults filteredData={filteredData} setInput={setInput} />
          )}
        </div>

        <div className="ai-response-container">{suggestionContent}</div>
      </main>
    </>
  );
}

export default App;
