import React, { ChangeEvent, useState } from "react";
import { SaveCommentData } from "../api";
import { useSaveComment } from "../hooks";

interface Props {
  comments: SaveCommentData[];
  postId: string;
}

const CommentCreate: React.FC<Props> = ({ comments, postId }) => {
  const [comment, setComment] = useState("");
  const { apiSaveComments } = useSaveComment();

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setComment(value);
  };

  const saveHandler = () => {
    if (!comment.trim()) return;
    const data = {
      content: comment,
      id: postId,
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
