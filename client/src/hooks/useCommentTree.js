// src/hooks/useCommentTree.js
import { useMemo } from "react";

export const useCommentTree = (comments = []) => {
  return useMemo(() => {
    const commentMap = {};
    const rootComments = [];

    comments.forEach((comment) => {
      commentMap[comment._id] = { ...comment, replies: [] };
    });

    comments.forEach((comment) => {
      if (comment.parentId) {
        commentMap[comment.parentId]?.replies.push(commentMap[comment._id]);
      } else {
        rootComments.push(commentMap[comment._id]);
      }
    });

    return rootComments;
  }, [comments]);
};
