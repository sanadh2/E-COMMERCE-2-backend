const Product = require("../Models/productModel");

const getAllProductsStatic = async (req, res, next) => {
  const products = await Product.find({ price: { $gt: 30 } }).sort("price");
  res.status(200).json({ products, nhbits: products.length });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, select, numericFilters } = req.query;
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

  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|<=|>=|=)\b/g;
    const filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    console.log(filters);
    const options = ["price", "rating"];
    const filtered = filters.split(",").forEach((element, index) => {
      const [field, operator, value] = element.split("-");
      console.log(index, field, operator, value);
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
      console.log(queryObject);
    });
  }

  let sorted_selected_limited = Product.find(queryObject);
  if (sort) {
    const changedSort = sort.split(",").join(" ");
    sorted_selected_limited = sorted_selected_limited.sort(changedSort);
  }

  if (select) {
    const selectedArray = select.split(",").join(" ");
    sorted_selected_limited = sorted_selected_limited.select(selectedArray);
  }

  const page = Number(req.query.page) || 2;
  const limit = Number(req.query.limit) || 1;
  const skip = (page - 1) * limit;

  sorted_selected_limited = sorted_selected_limited.skip(skip);

  const products = await sorted_selected_limited;
  res.status(200).json({ products, nhbits: products.length });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
