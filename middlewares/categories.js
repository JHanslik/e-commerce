const { Category } = require("../models/index");

const checkIfExists = async (req, res, next) => {
    const { id } = req.params;

    const category = await Category.findOne({
        where: { id },
    });

    if (category) {
        req.category = category;
        next();
    } else {
        res.status(404).json("Category not found");
    }
};

const checkIfNameExists = async (req, res, next) => {
    if (req.method === "PUT" && !req.body.name) {
        next();
    } else {
        const { name } = req.body;

        const category = await Category.findOne({ where: { name } });

        if (!category) {
            next();
        } else {
            res.status(409).json(
                `Category already created with id: ${category.id}`
            );
        }
    }
};

module.exports = { checkIfExists, checkIfNameExists };
