/* eslint-disable react/prop-types */

import { MessageCircle } from "lucide-react";
import CreateCommentForm from "@/components/CreateCommentForm";
import Comment from "@/components/Comment";
import { useCommentTree } from "@/hooks/useCommentTree";

const CommentsSection = ({ lectureId, commentsData, loading, onRefresh }) => {
  const commentTree = useCommentTree(commentsData?.comments || []);

  return (
    <div className="mt-6">
      <div className="flex items-center gap-2 mb-4">
        <MessageCircle className="w-5 h-5" />
        <h3 className="text-xl font-bold">Comments</h3>
      </div>

      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-6">
        <CreateCommentForm lectureId={lectureId} onSuccess={onRefresh} />
      </div>

      <div className="space-y-4">
        {loading ? (
          <p>Loading comments...</p>
        ) : (
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
            {commentTree.map((comment) => (
              <Comment
                key={comment._id}
                comment={comment}
                onReplySuccess={onRefresh}
                depth={0}
                maxDepth={3}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentsSection;
