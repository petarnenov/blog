import React, { useEffect } from "react";
import { useGetAllPosts } from "../hooks";

interface Props {}

const PostList: React.FC<Props> = ({}) => {
  const { posts, apiGetAllPosts } = useGetAllPosts();
  useEffect(() => {
    apiGetAllPosts();
  }, []);

  const allPosts = Object.entries(posts).map((entry) => (
    <li key={entry[0]}>{entry[1].title}</li>
  ));

  return (
    <>
      <ul>{allPosts}</ul>
    </>
  );
};

export default PostList;
