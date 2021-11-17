import express from "express";
import cors from "cors";
import { randomBytes } from "crypto";

interface CreateComments {
  id: string;
  content: string;
}
interface Comments {
  [key: string]: CreateComments[];
}

const comments: Comments = {};

const app = express();
app.use(cors());
app.use(express.json());

app.get("/posts/:id/comments", (req, res) => {
  const { id } = req.params;
  res.send(comments[id] || []);
});

app.post("/posts/:id/comments", (req, res) => {
  const { id } = req.params;
  const { content } = req.body as CreateComments;
  const commentsId = randomBytes(10).toString("hex");
  const currentComments = comments[id] || [];
  currentComments.push({ id: commentsId, content });
  comments[id] = currentComments;
  res.status(201).send(currentComments);
});

app.listen(3022, () => {
  console.log("Service comments start listening on port 3022");
});
