const colors = require("colors");
const { commentModel } = require("../models/commentModel");
const {
  successResponse,
  errorResponse,
} = require("../helpers/successAndError");

exports.commentControllerGetAllComments = async (req, res) => {
  try {
    const comments = await commentModel.find();
    res
      .status(200)
      .json(successResponse(200, "Comments Retrieved Successfully", comments));
  } catch (error) {
    console.error(colors.red(`Error in commentControllerGetAllComments`));
    res
      .status(500)
      .json(errorResponse(500, "Internal Server Error", error.message));
  }
};

exports.commentControllerGetByProfileId = async (req, res) => {
  const { profileId } = req.params;
  try {
    const comments = await commentModel
      .find({ profileId })
      .populate("profileId")
      .exec();

    res
      .status(200)
      .json(
        successResponse(200, "Comment By Id Retrieved Successfully", comments)
      );
  } catch (error) {
    console.error(colors.red(`Error in commentControllerGetById`));
    res
      .status(500)
      .json(errorResponse(500, "Internal Server Error", error.message));
  }
};

exports.commentControllerCreateComments = async (req, res) => {
  const { profileId, author, text } = req.body;
  try {
    const result = await commentModel.create({
      profileId,
      author,
      text,
    });
    res
      .status(200)
      .json(successResponse(200, "Comment Created Successfully", result));
  } catch (error) {
    console.error(colors.red(`Error in commentControllerCreateComments`));
    res
      .status(500)
      .json(errorResponse(500, "Internal Server Error", error.message));
  }
};

exports.commentControllerLikeComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const updatedComment = await commentModel.findByIdAndUpdate(
      commentId,
      { $inc: { likes: 1 } },
      { new: true }
    );

    if (!updatedComment) {
      return res.status(404).json(errorResponse(404, "Comment not found"));
    }

    res
      .status(200)
      .json(successResponse(200, "Comment liked successfully", updatedComment));
  } catch (error) {
    console.error(colors.red(`Error in commentControllerLikeComment`));
    res
      .status(500)
      .json(errorResponse(500, "Internal Server Error", error.message));
  }
};

exports.commentControllerUnlikeComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const updatedComment = await commentModel.findByIdAndUpdate(
      commentId,
      { $inc: { likes: -1 } },
      { new: true }
    );

    if (!updatedComment) {
      return res.status(404).json(errorResponse(404, "Comment not found"));
    }

    res
      .status(200)
      .json(
        successResponse(200, "Comment unliked successfully", updatedComment)
      );
  } catch (error) {
    console.error(colors.red(`Error in commentControllerUnlikeComment`));
    res
      .status(500)
      .json(errorResponse(500, "Internal Server Error", error.message));
  }
};
