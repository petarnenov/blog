import { useState } from "react";
import {
  Posts,
  savePost,
  SavePostData,
  getAllPosts,
  saveComment,
  SaveCommentData,
  SavedPostData,
} from "../api";

export const useSavePost = () => {
  const [data, setData] = useState<SavedPostData>({} as SavedPostData);
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

export const useSaveComment = () => {
  const [data, setComments] = useState([] as SaveCommentData[]);
  const apiSaveComments = async (data: SaveCommentData) => {
    const saveResults = await saveComment(data);
    setComments(saveResults);
  };
  return { data, setComments, apiSaveComments };
};
