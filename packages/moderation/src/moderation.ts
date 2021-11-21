import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/moderation", (req, res) => {
  res.send("Hi there from moderation");
});

app.post("/moderation", (req, res) => {
  const event = req.body;

  axios("http://localhost:3021/moderation", {
    method: "POST",
    data: event,
  });
  axios("http://localhost:3022/moderation", {
    method: "POST",
    data: event,
  });

  res.status(200);
  res.end();
});

app.post("/events", (req, res) => {
  const event = req.body;
  console.log(event);
  res.status(200);
  res.end();
});

const server = app.listen(3024, () => {
  console.log("Moderation service start listening on port 3024");
});
