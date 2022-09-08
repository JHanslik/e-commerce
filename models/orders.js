const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Order = sequelize.define("Order", {
        customerName: {
            type: DataTypes.STRING,
            defaultValue: "Benoit",
        },
        customerAdress: {
            type: DataTypes.STRING,
            defaultValue: "17 avenue des champs Elysées",
        },
        customerEmail: {
            type: DataTypes.STRING,
            defaultValue: "bgdu94@skyblog.bg",
        },

        totalPrice: {
            type: DataTypes.INTEGER,
        },
    });

    return Order;
};
