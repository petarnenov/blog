export const commentServiceURL = "http://localhost:3022/posts";

export interface SaveCommentData {
  id: string;
  content: string;
}

export interface GetAllCommentsByPostId {
  id: string;
}

export const saveComment = async (data: SaveCommentData) => {
  const savedComment = (await fetch(
    `${commentServiceURL}/${data.id}/comments`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  ).then((res) => res.json())) as SaveCommentData[];
  return savedComment;
};
