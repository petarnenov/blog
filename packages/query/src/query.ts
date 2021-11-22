import express from "express";
import cors from "cors";

export interface Comment {
  id: string;
  postId: string;
  content: string;
  status: "pending" | "approved" | "rejected";
}
export interface Post {
  [key: string]: {
    id: string;
    title: string;
    comments: Comment[];
  };
}

export interface PostCreatedEvent {
  type: "PostCreated";
  data: { id: string; title: string };
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

export interface CommentModeratedEvent {
  type: "CommentModerated";
  data: {
    id: string;
    content: string;
    postId: string;
    status: "pending" | "approved" | "rejected";
  };
}

const posts: Post = {};

const app = express();

app.use(cors());
app.use(express.json());

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const event:
    | PostCreatedEvent
    | CommentCreatedEvent
    | CommentModeratedEvent
    | CommentUpdatedEvent = req.body;

  console.log("event: ", JSON.stringify(event, null, 2));

  if (event.type === "PostCreated") {
    const { id, title } = event.data;
    posts[id] = {
      id,
      title,
      comments: [],
    };
  }

  if (event.type === "CommentCreated") {
    const { id, content, postId, status } = event.data;
    posts[postId].comments.push({
      id,
      postId,
      content,
      status,
    });
  }

  if (event.type === "CommentUpdated") {
    const { postId, status, id, content } = event.data;
    const currentComment = posts[postId].comments.find((c) => c.id === id);
    currentComment && (currentComment.status = status);
    currentComment && (currentComment.content = content);
  }

  res.status(200);
  res.end();
});

const server = app.listen(3023, () => {
  console.log("Query service start listening on port 3023");
});
