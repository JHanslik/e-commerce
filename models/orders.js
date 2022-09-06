const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Order = sequelize.define("Order", {
        customerName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        customerAdress: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        customerEmail: {
            type: DataTypes.STRING,
        },

        totalPrice: {
            type: DataTypes.INTEGER,
        },
    });

    return Order;
};
