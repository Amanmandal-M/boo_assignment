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

exports.commentControllerGetById = async (req, res) => {
  try {
    const commentById = await commentModel.findOne({ id: req.params.id });
    res
      .status(200)
      .json(
        successResponse(
          200,
          "Comment By Id Retrieved Successfully",
          commentById
        )
      );
  } catch (error) {
    console.error(colors.red(`Error in commentControllerGetById`));
    res
      .status(500)
      .json(errorResponse(500, "Internal Server Error", error.message));
  }
};

exports.commentControllerCreateComments = async (req, res) => {
  const { author, text } = req.body;
  try {
    const result = await commentModel.create({
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
