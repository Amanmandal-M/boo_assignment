const colors = require("colors");
const { userModel } = require("../models/userModel");

exports.profileControllerGetAllProfiles = async (req, res) => {
  try {
    const profiles = await userModel.find();

    if (profiles.length === 0) {
      const Sample_Profiles = [
        {
          name: "John Doe",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          mbti: "INTJ",
          enneagram: "5w6",
          variant: "sx/sp",
          tritype: 514,
          socionics: "INTp",
          sloan: "RLUEI",
          psyche: "CTVIP",
          image: "https://example.com/profile_image.jpg",
        },
      ];
      return res.status(200).render("profile_template", {
        profile: Sample_Profiles[0],
      });
    }

    res.status(200).render("profile_template", {
      profile: profiles[0],
    });
  } catch (error) {
    console.error(colors.red(`Error in fetching profiles: ${error.message}`));
    res.status(500).json({
      status: false,
      statusCode: 500,
      message: "Error in fetching profiles",
      error: error.message,
    });
  }
};

exports.profileControllerGetById = async (req, res) => {
  try {
    const profile = await userModel.findOne({ id: Number(req.params.id) });

    if (!profile) {
      return res.status(404).send("Profile not found");
    }

    res.status(200).render("profile_template", {
      profile,
    });
  } catch (error) {
    console.error(colors.red(`Error in viewing profile: ${error.message}`));
    res.status(500).json({
      status: false,
      statusCode: 500,
      message: "Error in viewing Profile",
      error: error.message,
    });
  }
};

exports.profileControllerCreateProfile = async (req, res) => {
  try {
    const newProfile = req.body;
    const result = await userModel.create(newProfile);
    res.json(result);
  } catch (error) {
    console.error(colors.red(`Error in posting profile: ${error.message}`));
    res.status(500).json({
      status: false,
      statusCode: 500,
      message: "Error in Creating Profile",
      error: error.message,
    });
  }
};
