<div align="center">
 <img src="/Frontend/img/logo.png" width="400px">
</div>

## DressSense
An intelligent app powered by the OpenAI API that provides personalized dressing advice based on real-time data for users' current city locations 

## Overview
This project was born out of my first week-long pair-programming session organized by Chingus. The purpose of the app is to help people make better dressing choices given the weather of the day. The app fetches current weather data in combination and sends a pre-written prompt to the openai API for get advice on what to dress given the current weather. 

## Features
1. A text input search field for city names with auto-complete and input validation.
2. 300+ choices of cities to choose or scroll from.
3. Text summary and actionable advice for what to dress given the day's weather.

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
ReactJS, Node.js, Express.js, CSS3

## Improvements
- Convert to TypeScript
- Improve responsiveness on mobile devices


## Demo
<div align="center">
 <img src="/Frontend/img/demo.png" height="600px">
</div>
 
