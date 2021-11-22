export const postServiceURL = "http://posts.com/posts/create";
export const queryServiceURL = "http://posts.com/posts";

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
      status: "pending" | "approved" | "rejected";
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
