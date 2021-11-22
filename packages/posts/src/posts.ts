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

export interface PostCreatedEvent {
  type: "PostCreated";
  data: CreatePost;
}

const posts: Posts = {};
const handleEvents = (event: any) => {
  if (event.type === "PostCreated") {
    const { id, title } = event.data as CreatePost;
    posts[id] = { id, title };
  }
};

const app = express();
app.use(cors());
app.use(express.json());

app.post("/posts", async (req, res) => {
  const { title } = req.body as CreatePost;
  const id = randomBytes(10).toString("hex");

  await axios("http://localhost:3020/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: {
      type: "PostCreated",
      data: { id, title },
    },
  });

  res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  const event = req.body;
  handleEvents(event);
  res.status(200);
  res.end();
});

app.listen(3021, async () => {
  const events: { type: string; data: any }[] = await (
    await axios.get("http://localhost:3020/events")
  ).data;
  events.forEach(handleEvents);

  console.log("Service posts start and listening on port 3021");
});
