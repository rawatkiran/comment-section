import React from "react";
import Comment from "../Comment/index";

const CommentList = ({
  comments,
  onDelete,
  onEdit,
  onReply,
  onEditReply,
  onReplyDelete,
}) => {
  return (
    <div>
      {comments?.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          onDelete={onDelete}
          onEdit={onEdit}
          onReply={onReply}
          onEditReply={onEditReply}
          onReplyDelete={onReplyDelete}
        />
      ))}
    </div>
  );
};

export default CommentList;
