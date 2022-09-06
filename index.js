require("dotenv").config();
require("./models/index");
const express = require("express");
const cors = require("cors");
const app = express();

const productsRoutes = require("./routes/products");
const ordersRoutes = require("./routes/orders");
const categoriesRoutes = require("./routes/categories");

const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/products", productsRoutes);
app.use("/orders", ordersRoutes);
app.use("/categories", categoriesRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
