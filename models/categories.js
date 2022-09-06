const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Category = sequelize.define("Category", {
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
    });

    return Category;
};
