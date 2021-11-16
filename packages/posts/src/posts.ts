import express from "express";
import cors from "cors";
import { randomBytes } from "crypto";

interface CreatePost {
  title: string;
}
interface Posts {
  [key: string]: CreatePost;
}

const posts: Posts = {};

const app = express();
app.use(cors());
app.use(express.json());

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", (req, res) => {
  const { title } = req.body as CreatePost;
  const id = randomBytes(10).toString("hex");
  posts[id] = { title };
  res.end();
});

app.listen(3021, () => {
  console.log("Service posts start and listening on port 3021");
});
