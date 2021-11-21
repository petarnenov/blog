export const postServiceURL = "http://localhost:3021/posts";
export const queryServiceURL = "http://localhost:3023/posts";

export interface SavePostData {
  title: string;
}

export interface SavedPostData extends SavePostData {
  id: string;
}
export interface Posts {
  [key: string]: {
    id: string;
    title: string;
    comments: {
      id: string;
      content: string;
      postId: string;
    }[];
  };
}

export const savePost = async (data: SavePostData) => {
  const savedPost = (await fetch(postServiceURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json())) as SavedPostData;
  return savedPost;
};

export const getAllPosts = async () => {
  const allPosts = (await fetch(queryServiceURL).then((res) =>
    res.json()
  )) as Posts;
  return allPosts;
};
