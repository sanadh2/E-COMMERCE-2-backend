const Product = require("../Models/productModel");

const getAllProductsStatic = async (req, res, next) => {
  const search = "dining";
  const products = await Product.find({}).sort("name company");
  res.status(200).json({ products });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sorted } = req.query;
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

  let sort = Product.find(queryObject);
  if (sorted) {
    const sorte = sorted.split(",").join(" ");
    sort = Product.find(queryObject).sort(sorte);
  }

  const products = await sort;
  // products = [];
  res.status(200).json({ products, nhbits: products.length });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
