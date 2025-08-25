import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  createComment,
  deleteComment,
  getCommentsByLecture,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.route("/create").post(isAuthenticated, createComment);
router.get("/:lectureId", isAuthenticated, getCommentsByLecture);
router.delete("/:commentId", isAuthenticated, deleteComment);

export default router;
