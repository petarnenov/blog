import "./post-list.css";
import React, { useEffect } from "react";
import { useGetAllPosts } from "../hooks";
import CommentCreate from "./CommentCreate";

interface Props {}

const PostList: React.FC<Props> = () => {
  const { posts, apiGetAllPosts } = useGetAllPosts();

  useEffect(() => {
    apiGetAllPosts();
  }, []);

  const allPosts = Object.entries(posts).map((entry) => (
    <li key={entry[0]}>
      <div
        style={{
          background: "gray",
          width: "200px",
          margin: "10px",
        }}
      >
        <h3>{entry[1].title}</h3>
        <CommentCreate postId={entry[0]} comments={entry[1].comments} />
      </div>
    </li>
  ));

  return (
    <>
      <ul className="posts-container">{allPosts}</ul>
    </>
  );
};

export default PostList;
