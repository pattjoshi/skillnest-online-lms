import { Comment } from "../models/comment.model.js";

export const createComment = async (req, res) => {
  try {
    const { lectureId, content, parentId = null } = req.body;

    if (!lectureId || !content) {
      return res.status(400).json({
        message: "Lecture ID and content are required",
      });
    }

    const newComment = new Comment({
      lectureId,
      userId: req.id, // ✅ use req.id from middleware
      content,
      parentId: parentId || null,
    });

    const savedComment = await newComment.save();

    return res.status(201).json({
      message: "Comment created successfully",
      comment: savedComment,
    });
  } catch (error) {
    console.error("Error creating comment:", error);
    return res.status(500).json({
      message: "Failed to create comment",
      error: error.message,
    });
  }
};

export const getCommentsByLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;

    if (!lectureId) {
      return res.status(400).json({ message: "Lecture ID is required" });
    }

    const comments = await Comment.find({ lectureId })
      .populate("userId", "name email") // You can include avatar if needed
      .sort({ createdAt: -1 }); // Optional: oldest to newest

    return res.status(200).json({
      message: "Comments fetched successfully",
      comments,
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return res.status(500).json({ message: "Failed to fetch comments" });
  }
};

// deleteComment in comment.controller.js
export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.id;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.userId.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this comment" });
    }

    const deleteReplies = async (parentId) => {
      const replies = await Comment.find({ parentId });
      for (const reply of replies) {
        await deleteReplies(reply._id);
        await Comment.findByIdAndDelete(reply._id);
      }
    };

    await deleteReplies(commentId);
    await Comment.findByIdAndDelete(commentId);

    return res.status(200).json({
      message: "Comment and replies deleted successfully",
      lectureId: comment.lectureId, // ✅ Added so frontend can invalidate cache
    });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return res.status(500).json({ message: "Failed to delete comment" });
  }
};
