const express = require("express");
const commentRouter = express.Router();

// Porfile Controller Locations
const {
  commentControllerGetAllComments,
  commentControllerGetByProfileId,
  commentControllerCreateComments,
  commentControllerLikeComment,
  commentControllerUnlikeComment,
} = require("../controllers/comment");

// Get All comments
commentRouter.get("/", commentControllerGetAllComments);

// Get comment Details by Id
commentRouter.get("/:id", commentControllerGetByProfileId);

// Create a new comment
commentRouter.post("/", commentControllerCreateComments);

// Like a comment
commentRouter.post('/like/:commentId', commentControllerLikeComment);

// Unlike a comment
commentRouter.post('/unlike/:commentId', commentControllerUnlikeComment);

module.exports = { commentRouter };

