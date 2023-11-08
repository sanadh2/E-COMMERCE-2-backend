const Product = require("../Models/productModel");

const getAllProductsStatic = async (req, res, next) => {
  // throw new Error("Async error");
  res.status(200).json({ msg: "success" });
};

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(200).json({ products });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
