import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/moderation", (req, res) => {
  res.send("Hi there from moderation");
});

app.post("/moderation", (req, res) => {
  const event = req.body;

  fetch("http://localhost:3021/moderation", {
    method: "POST",
    body: JSON.stringify(event),
  });
  fetch("http://localhost:3022/moderation", {
    method: "POST",
    body: JSON.stringify(event),
  });

  res.status(200);
  res.end();
});

const server = app.listen(3024, () => {
  console.log("Moderation service start listening on port 3024");
});
