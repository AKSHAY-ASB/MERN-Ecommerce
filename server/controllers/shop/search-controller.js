const Products = require("../../models/Products");

const searchProducts = async (req, res) => {
  try {
    const { keywords } = req.params;

    if (!keywords || typeof keywords !== "string") {
      return res.status(404).json({
        success: false,
        message: "keywords is required ans it must be string format.",
      });
    }

    const reqEx = new RegExp(keywords, "i");

    const createSearchQuery = {
      $or: [
        { title: reqEx },
        { description: reqEx },
        { category: reqEx },
        { brand: reqEx },
      ],
    };

    const searchResults = await Products.find(createSearchQuery);

    res.status(200).json({
        success:true,
        data:searchResults
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error Occured",
    });
  }
};

module.exports = { searchProducts };
