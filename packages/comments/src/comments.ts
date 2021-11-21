import express from "express";
import cors from "cors";
import axios from "axios";
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

app.post("/posts/:id/comments", async (req, res) => {
  const { id } = req.params;
  const { content } = req.body as CreateComments;
  const commentsId = randomBytes(10).toString("hex");
  const currentComments = comments[id] || [];
  currentComments.push({ id: commentsId, content });
  comments[id] = currentComments;

  await axios("http://localhost:3020/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      type: "CommentCreated",
      data: { id: commentsId, content, postId: id },
    },
  });

  res.status(201).send(currentComments);
});

app.post("/events", (req, res) => {
  const event = req.body;
  console.log(event);
  res.status(200);
  res.end();
});

app.listen(3022, () => {
  console.log("Service comments start listening on port 3022");
});
