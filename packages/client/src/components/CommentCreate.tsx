import React, { ChangeEvent, useEffect, useState } from "react";
import { useGetAllCommentsByID, useSaveComment } from "../hooks";

interface Props {
  postId: string;
}

const CommentCreate: React.FC<Props> = ({ postId }) => {
  const [comment, setComment] = useState("");
  const { data, apiSaveComments } = useSaveComment();
  const { comments, apiGetAllCommentsByPostId } = useGetAllCommentsByID();

  useEffect(() => {
    apiGetAllCommentsByPostId({ id: postId });
    console.log("call useEffect");
  }, [data]);

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setComment(value);
  };

  const saveHandler = () => {
    if (!comment.trim()) return;
    const data = {
      id: postId,
      content: comment,
    };
    apiSaveComments(data);
    setComment("");
  };

  const existingComments = comments
    .reverse()
    .map((comment) => <li key={comment.id}>{comment.content}</li>);

  return (
    <div className="comment-create">
      <ul>{existingComments}</ul>
      <div>
        <label>New Comment</label>
      </div>
      <div>
        <textarea
          onChange={onChange}
          value={comment}
          style={{ width: "190px", height: "150px" }}
        />
      </div>
      <button onClick={saveHandler}>Save Comment</button>
    </div>
  );
};

export default CommentCreate;
