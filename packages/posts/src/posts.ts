import express from "express";
import cors from "cors";
import axios from "axios";
import { randomBytes } from "crypto";

export interface CreatePost {
  id: string;
  title: string;
}
interface Posts {
  [key: string]: CreatePost;
}

const posts: Posts = {};

const app = express();
app.use(cors());
app.use(express.json());

app.post("/posts", async (req, res) => {
  const { title } = req.body as CreatePost;
  const id = randomBytes(10).toString("hex");
  posts[id] = { id, title };

  await axios("http://localhost:3020/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: {
      type: "PostCreated",
      data: posts[id],
    },
  });

  res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  const event = req.body;
  console.log(event);
  res.status(200);
  res.end();
});

app.listen(3021, () => {
  console.log("v22");
  console.log("Service posts start and listening on port 3021");
});
