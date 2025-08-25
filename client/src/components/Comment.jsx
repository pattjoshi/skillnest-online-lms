/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button } from "./ui/button";
import CreateCommentForm from "./CreateCommentForm";
import { useDeleteCommentMutation } from "@/features/api/commentApi";
import { useSelector } from "react-redux";
import { Trash2, MessageCircle } from "lucide-react";
import { toast } from "sonner";

const Comment = ({ comment, onReplySuccess, depth = 0, maxDepth = 4 }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [deleteComment, { isLoading: isDeleting }] = useDeleteCommentMutation();
  const user = useSelector((state) => state.auth.user);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this comment and its replies?"
    );
    if (!confirmed) return;

    try {
      await deleteComment({
        commentId: comment._id,
        lectureId: comment.lectureId,
      }).unwrap();
      toast.success("Comment deleted successfully");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete comment");
    }
  };

  return (
    <div
      className={`mb-4 transition-all duration-200 ${
        depth > 0 ? "ml-6 border-l-2 border-gray-200 pl-4" : ""
      }`}
    >
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-4 hover:shadow-md transition-all duration-200">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Avatar Placeholder */}
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-white text-sm font-bold">
              {comment.userId.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="font-semibold text-gray-900 dark:text-white">
                {comment.userId.name}
              </div>
              <span className="text-xs text-gray-500">
                {new Date(comment.createdAt).toLocaleString()}
              </span>
            </div>
          </div>

          {user?._id === comment.userId._id && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDelete}
              disabled={isDeleting}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Content */}
        <div
          className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: comment.content }}
        />

        {/* Actions */}
        {depth < maxDepth && (
          <div className="mt-3 flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="flex items-center gap-1 text-gray-600 hover:text-gray-900 dark:hover:text-white"
            >
              <MessageCircle className="h-4 w-4" />
              Reply
            </Button>
          </div>
        )}

        {/* Reply Form */}
        {showReplyForm && (
          <div className="mt-4">
            <CreateCommentForm
              lectureId={comment.lectureId}
              parentId={comment._id}
              onSuccess={() => {
                onReplySuccess();
                setShowReplyForm(false);
              }}
            />
          </div>
        )}
      </div>

      {/* Replies */}
      {comment.replies?.length > 0 && (
        <div className="mt-3 space-y-3">
          {comment.replies.map((reply) => (
            <Comment
              key={reply._id}
              comment={reply}
              onReplySuccess={onReplySuccess}
              depth={depth + 1}
              maxDepth={maxDepth}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
