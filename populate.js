require("dotenv").config();

const connectDB = require("./DB/Connect");
const product = require("./Models/productModel");
const jsonProducts = require("./products.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    await product.deleteMany();

    await product.create(jsonProducts);

    console.log("success");
    
  } catch (error) {
    console.log(error);
  }
};

start();
