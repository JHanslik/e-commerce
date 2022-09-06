const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.USER,
    process.env.PASSWORD,
    {
        host: process.env.HOST,
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

Product.hasMany(Category);
Category.belongsToMany(Product, { through: "product_category" });
Order.hasMany(Product);
Product.belongsToMany(Order, { through: "order_product" });

sequelize.sync({ alter: true });

const db = {
    sequelize,
    Product,
    Order,
    Category,
};

module.exports = db;
