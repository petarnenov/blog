import { useState } from "react";
import { Posts, savePost, SavePostData, getAllPosts } from "../api/posts";

export const useSavePost = () => {
  const [data, setData] = useState<SavePostData>({} as SavePostData);
  const apiSavePost = async (post: SavePostData) => {
    const saveResult = await savePost(post);
    setData(saveResult);
  };
  return { data, apiSavePost };
};

export const useGetAllPosts = () => {
  const [posts, setPosts] = useState({} as Posts);
  const apiGetAllPosts = async () => {
    const getResult = await getAllPosts();
    setPosts(getResult);
  };
  return { posts, apiGetAllPosts };
};
