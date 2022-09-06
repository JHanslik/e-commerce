const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Product = sequelize.define("Product", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.TEXT,
        },
        price: {
            type: DataTypes.INTEGER,
        },
        inStock: {
            type: DataTypes.BOOLEAN,
        },
    });

    return Product;
};
