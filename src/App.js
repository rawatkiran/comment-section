import React, { useState, useEffect } from "react";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";

const App = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Load comments from localStorage on mount
    const storedComments = JSON.parse(localStorage.getItem("comments")) || [];
    setComments(storedComments);
  }, []);

  useEffect(() => {
    // Save comments to localStorage whenever comments change
    if (comments) localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  const handleAddComment = (newComment) => {
    setComments([...comments, { ...newComment, timestamp: new Date() }]);
  };

  const handleDeleteComment = (commentId) => {
    setComments(comments.filter((comment) => comment.id !== commentId));
  };

  const handleDeleteReply = (replyId) => {
    setComments(
      comments[0]?.replies?.filter((reply, id) => reply?.id !== replyId)
    );
  };
  const handleEditComment = (commentId, newText) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId ? { ...comment, text: newText } : comment
      )
    );
  };

  const handleAddReply = (commentId, reply) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId
          ? { ...comment, replies: [...comment.replies, reply] }
          : comment
      )
    );
  };

  const handleEditReply = (commentId, newReply) => {
    setComments((prevComments) =>
      prevComments.map((comment, id) =>
        comment.id === commentId
          ? {
              ...comment,
              replies: [
                {
                  name: comment.replies[id].name,
                  text: newReply,
                  id: Date.now(),
                  timestamp: new Date(),
                },
              ],
            }
          : comment
      )
    );
  };

  return (
    <div>
      <CommentForm onSubmit={handleAddComment} />
      <CommentList
        comments={comments}
        onDelete={handleDeleteComment}
        onReplyDelete={handleDeleteReply}
        onEdit={handleEditComment}
        onReply={handleAddReply}
        onEditReply={handleEditReply}
      />
    </div>
  );
};

export default App;

//{ ...comment, replies: [...comment?.replies, reply] }
