const colors = require("colors");
const { profileModel } = require("../models/profileModel");
const { errorResponse } = require("../helpers/successAndError");

exports.profileControllerGetById = async (req, res) => {
  try {
    const profile = await profileModel.findOne({ id: req.params.id });

    if (!profile) {
      return res.status(404).send("Profile not found");
    }

    res.status(200).render("profile_template", {
      profile,
    });
  } catch (error) {
    console.error(colors.red(`Error in viewing profile: ${error.message}`));
    res
      .status(500)
      .json(errorResponse(500, "Internal Server Error", error.message));
  }
};

exports.profileControllerCreateProfile = async (req, res) => {
  const newProfile = req.body;
  try {
    const result = await profileModel.create(newProfile);
    res.status(200).json({
      status: true,
      statusCode: 200,
      data: result,
    });
  } catch (error) {
    console.error(colors.red(`Error in posting profile: ${error.message}`));
    res
      .status(500)
      .json(errorResponse(500, "Internal Server Error", error.message));
  }
};
