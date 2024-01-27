import React, { useState } from "react";

const CommentForm = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() !== "" && text.trim() !== "") {
      onSubmit({
        name,
        text,
        id: Date.now(),
        timestamp: new Date(),
        replies: [],
      });
      setName("");
      setText("");
    }
  };

  return (
    <form className="container" onSubmit={handleSubmit}>
      <span className="txt-style">Comment</span>
      <input
        className="input-box"
        placeholder="Name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>

      <textarea
        value={text}
        className="text-box"
        placeholder="Comment"
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <button className="btn" type="submit">
        Post
      </button>
    </form>
  );
};

export default CommentForm;
