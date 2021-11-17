export const postServiceURL = "http://localhost:3021/posts";
export interface SavePostData {
  title: string;
}
export interface Posts {
  [key: string]: {
    title: string;
  };
}

export const savePost = async (data: SavePostData) => {
  const savedPost = (await fetch(postServiceURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json())) as SavePostData;
  return savedPost;
};

export const getAllPosts = async () => {
  const allPosts = (await fetch(postServiceURL).then((res) =>
    res.json()
  )) as Posts;
  return allPosts;
};
