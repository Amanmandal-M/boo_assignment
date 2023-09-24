const express = require("express");
const profileRouter = express.Router();

// Porfile Controller Locations
const {
  profileControllerGetById,
  profileControllerCreateProfile,
} = require("../controllers/profile");

// Get Profile Details by Id
profileRouter.get("/:id", profileControllerGetById);

// Create a new Profile
profileRouter.post("/", profileControllerCreateProfile);

module.exports = { profileRouter };
