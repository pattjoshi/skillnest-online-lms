// src/components/CreateCommentForm.jsx
import React, { useState } from "react";
import { useCreateCommentMutation } from "@/features/api/commentApi";
import RichTextEditor from "./RichTextEditor"; // your existing quill wrapper
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { MessageSquarePlus } from "lucide-react";

const CreateCommentForm = ({ lectureId, parentId = null, onSuccess }) => {
  const [input, setInput] = useState({ description: "" });
  const [createComment, { isLoading }] = useCreateCommentMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.description.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    try {
      await createComment({
        lectureId,
        content: input.description,
        parentId: parentId || null,
      }).unwrap();

      toast.success("Comment added!");
      setInput({ description: "" });
      if (onSuccess) onSuccess();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to add comment");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm space-y-4"
    >
      {/* Editor */}
      <div>
        <RichTextEditor input={input} setInput={setInput} />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-2">
        <Button
          type="submit"
          disabled={isLoading}
          className="flex items-center gap-2"
        >
          <MessageSquarePlus className="h-4 w-4" />
          {isLoading ? "Posting..." : "Post Comment"}
        </Button>
      </div>
    </form>
  );
};

export default CreateCommentForm;
