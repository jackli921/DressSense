import dotenv from "dotenv";
dotenv.config();
import express from 'express'
import cors from 'cors'
const app = express();


app.use(cors())

app.get("/api_key", (req, res) => {
  res.json({ apiKey: process.env.KEY });
});

app.get("/", (req, res) => {
  res.send("All Directory");
});
app.listen(3000, () => {
  console.log("listening on port 3000");
});
