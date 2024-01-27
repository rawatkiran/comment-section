import React, { useState } from "react";
import "./index.css";
import ReplyForm from "../ReplyForm";

const Comment = ({
  comment,
  onDelete,
  onEdit,
  onReply,
  onEditReply,
  onReplyDelete,
}) => {
  const [isEditing, setEditing] = useState(false);
  const [isReplyEditing, setReplyEditing] = useState(false);
  const [reply, setReply] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.text);
  const [editedReplyComment, setEditedReplyComment] = useState(
    comment?.replies[0]?.text
  );
  const handleEdit = () => {
    setEditing(true);
  };

  const handleSaveEdit = () => {
    onEdit(comment.id, editedComment);
    setEditing(false);
  };

  const handleSaveReplyEdit = () => {
    onEditReply(comment.id, editedReplyComment);
    setReplyEditing(false);
  };
  const handleReply = () => {
    setEditing(false);
    setReply(true);
  };

  return (
    <>
      <div className="container">
        <div className="commentor">{comment.name}</div>
        {isEditing ? (
          <>
            <textarea
              style={{ padding: 20, marginLeft: 20 }}
              value={editedComment}
              onChange={(e) => setEditedComment(e.target.value)}
            />
            <button
              style={{ margin: "10px 0px 0px 20px" }}
              onClick={handleSaveEdit}
            >
              Save
            </button>
          </>
        ) : (
          <>
            <div style={{ padding: 20 }}>{comment.text}</div>
            <div
              style={{
                display: !reply && "flex",
                padding: "0px 0px 0px 20px",
              }}
            >
              <button onClick={handleEdit}>Edit</button>
              <button onClick={() => onDelete(comment.id)}>Delete</button>
              <button onClick={() => handleReply(comment.id)}>Reply</button>
            </div>
          </>
        )}
      </div>
      <>
        {reply && (
          <div>
            <ReplyForm onReply={(reply) => onReply(comment.id, reply)} />
          </div>
        )}
        {comment?.replies && comment?.replies.length > 0 && (
          <div style={{ marginLeft: "20px" }}>
            {comment?.replies?.map((reply, id) => (
              <div className="container" key={reply.id}>
                <div className="commentor">{reply.name}</div>
                {isReplyEditing ? (
                  <>
                    <textarea
                      style={{ padding: 20, marginLeft: 20 }}
                      value={editedReplyComment}
                      onChange={(e) => setEditedReplyComment(e.target.value)}
                    />
                    <button
                      style={{ margin: "10px 0px 0px 20px" }}
                      onClick={handleSaveReplyEdit}
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <div style={{ padding: 20 }}>
                      {comment?.replies[id].text}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        padding: "0px 0px 0px 20px",
                      }}
                    >
                      <button onClick={() => setReplyEditing(true)}>
                        Edit
                      </button>
                      <button onClick={() => onReplyDelete(reply.id)}>
                        Delete
                      </button>
                    </div>
                  </>
                )}
                {/* <button onClick={() => onDelete(reply.id)}>Delete</button> */}
              </div>
            ))}
          </div>
        )}
      </>
    </>
  );
};
export default Comment;
