import express from "express";
import cors from "cors";

export interface Comment {
  [key: string]: string;
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
  const event: PostCreatedEvent | CommentCreatedEvent = req.body;

  if (event.type === "PostCreated") {
    const { id, title } = event.data;
    posts[id] = {
      id,
      title,
      comments: [],
    };
  }

  if (event.type === "CommentCreated") {
    const { id, content, postId } = event.data;
    posts[postId].comments.push({
      id,
      content,
    });
  }

  res.status(200);
  res.end();
});

const server = app.listen(3023, () => {
  console.log("Query service start listening on port 3023");
});
