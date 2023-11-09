const Product = require("../Models/productModel");

const getAllProductsStatic = async (req, res, next) => {
  const search = "dining";
  const products = await Product.find({
    name: { $regex: search, $options: "i" },
  });
  res.status(200).json({ products });
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
    queryObject.name = { $regex: name, $options: "i" };
  }

  
  const products = await Product.find(queryObject);
  res.status(200).json({ products, nhbits: products.length });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
