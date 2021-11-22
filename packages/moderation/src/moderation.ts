import express from "express";
import cors from "cors";
import axios from "axios";

export interface CommentModeratedEvent {
  type: "CommentModerated";
  data: {
    id: string;
    postId: string;
    content: string;
    status: "pending" | "approved" | "rejected";
  };
}

export interface CommentCreatedEvent {
  type: "CommentCreated";
  data: {
    id: string;
    content: string;
    postId: string;
    status: "pending" | "approved" | "rejected";
  };
}
export interface CommentUpdatedEvent {
  type: "CommentUpdated";
  data: {
    id: string;
    content: string;
    postId: string;
    status: "pending" | "approved" | "rejected";
  };
}

export interface PostCreatedEvent {
  type: "PostCreated";
  data: { id: string; title: string };
}

const app = express();

app.use(cors());
app.use(express.json());

app.post("/events", async (req, res) => {
  const event: CommentCreatedEvent | PostCreatedEvent = req.body;

  if (event.type === "CommentCreated") {
    event.data.content.toLocaleLowerCase().match(/orange/g)
      ? (event.data.status = "rejected")
      : (event.data.status = "approved");
    await axios("http://event-bus-srv:3020/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        type: "CommentModerated",
        data: event.data,
      },
    });
  }

  res.status(200);
  res.end();
});

const server = app.listen(3024, () => {
  console.log("Moderation service start listening on port 3024");
});
