import "./create-post.css";
import React, { ChangeEvent, useState } from "react";
import { useSavePost } from "../hooks";

interface Props {}

const PostCreate: React.FC<Props> = () => {
  const [title, setTitle] = useState("");
  const { apiSavePost } = useSavePost();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);
  };

  const submitHandler = () => {
    if (!title.trim()) return;
    apiSavePost({ title });
    setTitle("");
  };

  return (
    <>
      <div className="create-post">
        <h2>Create Post</h2>
        <div>
          <label>Title</label>
        </div>
        <div>
          <input type="text" value={title} onChange={onChange} />
        </div>
        <div>
          <button onClick={submitHandler}>Submit</button>
        </div>
      </div>
    </>
  );
};

export default PostCreate;
