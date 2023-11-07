const getAllProductsStatic = async (req, res, next) => {
  res.status(200).json({ msg: "success" });
};

const getAllProducts = async (req, res) => {
  res.static(200).json({ msg: "Products" });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic
}