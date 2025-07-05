const Products = require("../../models/Products");

const getFilteredProducts = async (req, res) => {
  try {
    const { category = [], brand = [], sortBy = "priceLowToHigh" } = req.query;

    let filters = {};

    if (category.length) {
      filters.category = { $in: category.split(",") };
    }

    if (brand.length) {
      filters.brand = { $in: brand.split(",") };
    }

    let sort = {};

    switch (sortBy) {
      case "priceLowToHigh":
        sort.price = 1;
        break;

      case "priceHighToLow":
        sort.price = -1;
        break;

      case "titleAZ":
        sort.title = 1;
        break;

      case "titleZA":
        sort.title = -1;
        break;

      default:
        sort.price = 1;
        break;
    }

    const products = await Products.find(filters).sort(sort);

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.log(error);
    res.status(501).json({
      success: false,
      message: "Some error Occured.",
    });
  }
};

const getProductDetails = async (req, res) => {
  try {
    const {id} = req.params;
    const product = await Products.findById(id);

    if(!product) return res.status(404).status.json({
        success:false,
        message:"Product not found"
    })

    res.status(200).json({
        success:true,
        data:product
    })

  } catch (error) {
    console.log(error);
    res.status(501).json({
      success: false,
      message: "Some error Occured.",
    });
  }
};

module.exports = { getFilteredProducts,getProductDetails };
