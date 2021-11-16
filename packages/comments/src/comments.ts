import express from "express";
import cors from "cors";
import { randomBytes } from "crypto";

interface CreateComments {
  content: string;
}
interface Comments {
  [key: string]: CreateComments;
}

const comments: Comments = {};

const app = express();
app.use(cors());
app.use(express.json());

app.get("/comments", (req, res) => {
  res.send(comments);
});

app.post("/comments", (req, res) => {
  const { content } = req.body as CreateComments;
  const id = randomBytes(10).toString("hex");
  comments[id] = { content };
  res.end();
});

app.listen(3022, () => {
  console.log("Service comments start listening on port 3022");
});
