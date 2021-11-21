import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/events", (req, res) => {
  res.send("Hi there from events");
});

app.post("/events", (req, res) => {
  const event = req.body;

  fetch("http://localhost:3021/events", {
    method: "POST",
    body: JSON.stringify(event),
  });
  fetch("http://localhost:3022/events", {
    method: "POST",
    body: JSON.stringify(event),
  });
  fetch("http://localhost:3023/events", {
    method: "POST",
    body: JSON.stringify(event),
  });
  fetch("http://localhost:3024/events", {
    method: "POST",
    body: JSON.stringify(event),
  });

  res.status(200);
  res.end();
});

const server = app.listen(3020, () => {
  console.log("Events Bus start listening on port 3020");
});
