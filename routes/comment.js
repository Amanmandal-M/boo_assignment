const express = require("express");
const commentRouter = express.Router();

// Porfile Controller Locations
const {
  commentControllerGetAllComments,
  commentControllerGetById,
  commentControllerCreateComments,
} = require("../controllers/comment");

// Get All comments
commentRouter.get("/", commentControllerGetAllComments);

// Get comment Details by Id
commentRouter.get("/:id", commentControllerGetById);

// Create a new comment
commentRouter.post("/", commentControllerCreateComments);

module.exports = { commentRouter };
