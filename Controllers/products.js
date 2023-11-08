const Product = require("../Models/productModel");

const getAllProductsStatic = async (req, res, next) => {
  // throw new Error("Async error");
  res.status(200).json({ msg: "success" });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = name;
  }
  console.log(queryObject);
  const products = await Product.find(queryObject);
  res.status(200).json({ products, nhbits: products.length });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
