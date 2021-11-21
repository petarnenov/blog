import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/query", (req, res) => {
  res.send("Hi there from query");
});

app.post("/query", (req, res) => {
  const event = req.body;

  //   fetch('http://localhost:3000/query', {
  //     method: 'POST',
  //     body: JSON.stringify(event),
  //   });
  fetch("http://localhost:3021/query", {
    method: "POST",
    body: JSON.stringify(event),
  });
  fetch("http://localhost:3022/query", {
    method: "POST",
    body: JSON.stringify(event),
  });

  res.status(200);
  res.end();
});

const server = app.listen(3023, () => {
  console.log("Query service start listening on port 3020");
});
