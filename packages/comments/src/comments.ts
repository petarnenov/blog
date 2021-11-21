import express from "express";
import cors from "cors";
import axios from "axios";
import { randomBytes } from "crypto";

interface CreateComments {
  postId: string;
  id: string;
  content: string;
  status: "approved" | "rejected" | "pending";
}
interface Comments {
  [key: string]: CreateComments[];
}

export interface CommentUpdatedEvent {
  type: "CommentUpdated";
  data: CreateComments;
}

export interface CommentCreatedEvent {
  type: "CommentCreated";
  data: CreateComments;
}

export interface CommentModeratedEvent {
  type: "CommentModerated";
  data: {
    id: string;
    postId: string;
    content: string;
    status: "pending" | "approved" | "rejected";
  };
}

export interface PostCreatedEvent {
  type: "PostCreated";
  data: { id: string; title: string };
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
  const { content, status } = req.body as CreateComments;
  const commentsId = randomBytes(10).toString("hex");
  const currentComments = comments[id] || [];
  currentComments.push({
    id: commentsId,
    content,
    status: "pending",
    postId: id,
  });
  comments[id] = currentComments;

  await axios("http://localhost:3020/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      type: "CommentCreated",
      data: { id: commentsId, content, postId: id, status },
    },
  });

  res.status(201).send(currentComments);
});

app.post("/events", async (req, res) => {
  const event:
    | CommentCreatedEvent
    | CommentUpdatedEvent
    | CommentModeratedEvent
    | PostCreatedEvent = req.body;
  if (event.type === "CommentModerated") {
    const { data } = event;
    await axios("http://localhost:3020/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        type: "CommentUpdated",
        data,
      },
    });
  }
  res.status(200);
  res.end();
});

app.listen(3022, () => {
  console.log("Service comments start listening on port 3022");
});
