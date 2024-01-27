import React, { useState } from "react";

const ReplyForm = ({ onReply }) => {
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() !== "" && text.trim() !== "") {
      onReply({ name, text, id: Date.now(), timestamp: new Date() });
      setName("");
      setText("");
    }
  };

  return (
    <form className="container" onSubmit={handleSubmit}>
      <span className="txt-style">Reply</span>
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
        placeholder="Reply"
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <button className="btn" type="submit">
        Post
      </button>
    </form>
  );
};

export default ReplyForm;
