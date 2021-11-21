import express from "express";
import cors from "cors";
import axios from "axios";

export interface EventBusEvent {
  type: string;
  data: string;
}

const events: EventBusEvent[] = [];

const app = express();

app.use(cors());
app.use(express.json());

app.get("/events", (req, res) => {
  res.send(events);
});

app.post("/events", async (req, res) => {
  const event = req.body;
  events.push(event);

  await axios("http://localhost:3021/events", {
    method: "POST",
    data: event,
  });
  await axios("http://localhost:3022/events", {
    method: "POST",
    data: event,
  });
  await axios("http://localhost:3023/events", {
    method: "POST",
    data: event,
  });
  await axios("http://localhost:3024/events", {
    method: "POST",
    data: event,
  });

  res.status(200);
  res.end();
});

const server = app.listen(3020, () => {
  console.log("Events Bus start listening on port 3020");
});

export interface PostCreatedEvent {
  type: "PostCreated";
  data: PostCreatedData;
}

export interface CommentCreatedEvent {
  type: "CommentCreated";
  data: [];
}

export interface CommentUpdatesEvent {
  type: "CommentUpdated";
  data: {};
}

export interface CommentModeratedEvent {
  type: "CommentModerated";
  data: {};
}

export interface PostCreatedData {
  id: string;
  title: string;
}
