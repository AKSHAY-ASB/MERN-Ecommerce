const Features = require("../../models/Features");

const addFeaturesImage = async (req, res) => {
  try {

    const {image} = req.body;

    const featureImage = new Features({
        image,
    });

    await featureImage.save();

    res.status(200).json({
        success:true,
        data:featureImage
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error Occured     sddddddd",
    });
  }
};

const getFeaturesImage = async (req, res) => {
  try {
 
    const images = await Features.find({});

    res.status(200).json({
        success:true,
        data:images
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error Occured",
    });
  }
};


module.exports = {addFeaturesImage,getFeaturesImage};
