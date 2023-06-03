<div align="center">
 <img src="/Frontend/img/logo.png" width="300px">
</div>

## AI Weather-Clothing Advisory
Input your current location, and get your suggestion for what to dress! 

## Overview
This project was born out of my first week-long pair programming session organized by Chingus. The purpose was to utilize current weather data in combination with LLMs such as ChatGPT to get advice on what to dress given the current weather. The challenges lied in connecting all logic for passing data between front and backend, especially:
- Making call to get the open weather API key from the backend.
- Making call to open weather to get the weather data.
- Making call to OpenAI model with weather data for a response.

## Features
1. One search box for user input with automatic input validation.
2. City list of 300+ choices of cities to choose or scroll from.
3. A 2-3 sentence summary suggestion and suggestions in bullet points.

## Installation
To run this project locally:

1. Clone this project locally.
2. ```cd``` to Backend folder and add a .env file.
3. Inside .env file, add your own OpenAI API Key, OpenWeather API Keys, and your desired port number.
4. In the Backend folder, open ```index.js``` and remove corsOption from ```app.use(cors())``` and save.
6. Run ```npm install``` to install dependencies for the backend and run ```node index.js``` to start the backend server.
8. Open another terminal, navigate into the Frontend folder.
9. Open ```app.js``` and replace all fetch call urls with a localhost port number you have specified for the backend.  
10. Run npm install to install dependencies and run ```npm run dev``` to build the frontend project.


## Technologies
- ReactJS
- Node
- Express
- CSS3

## Improvements
- Convert to TypeScript
- Improve responsiveness on mobile devices


## Demo
<div align="center">
 <img src="/Frontend/img/demo.png" height="600px">
</div>
 
