import dotenv from "dotenv";
dotenv.config();
import bodyParser from 'body-parser'
import express from 'express'
import cors from 'cors'

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  organization: "org-mxOvRl2yB41IF7mVZAz83rFd",
  apiKey: process.env.OPEN_AI_API_KEY,
});

const openai = new OpenAIApi(configuration)


const app = express();
app.use(bodyParser.json());
app.use(cors())

app.get("/api_key", (req, res) => {
  res.json({ apiKey: process.env.OPEN_WEATHER_API_KEY});
});

app.post("/", async (req, res) => {
    const {message} = req.body
    const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content:message}],
    temperature: 0.5
  });
  
  res.json({
    message: response.data.choices[0].message.content,
  });

});

app.listen(3080, () => {
  console.log("listening on port 3080");
});
