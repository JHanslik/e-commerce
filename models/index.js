const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
        logging: false,
    }
);

const connectDb = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connected to db");
    } catch (e) {
        console.log(e);
    }
};

connectDb();

const Product = require("./products")(sequelize);
const Order = require("./orders")(sequelize);
const Category = require("./categories")(sequelize);

Product.belongsToMany(Category, { through: "product_category" });
Category.belongsToMany(Product, { through: "product_category" });
Order.belongsToMany(Product, { through: "order_product" });
Product.belongsToMany(Order, { through: "order_product" });

sequelize.sync({ alter: true });

const db = {
    sequelize,
    Product,
    Order,
    Category,
};

module.exports = db;
