const colors = require("colors");
const { profileModel } = require("../models/profileModel");

exports.staticPageController = async (req, res) => {
  try {
    const profiles = await profileModel.find();

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
