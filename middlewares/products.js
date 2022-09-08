const { Product, Category } = require("../models/index");

const checkIfExists = async (req, res, next) => {
    const { id } = req.params;

    const product = await Product.findOne({
        where: { id },
        include: Category,
    });

    if (product) {
        req.product = product;
        next();
    } else {
        res.status(404).json("Product not found");
    }
};

const checkIfNameExists = async (req, res, next) => {
    if (req.method === "PUT" && !req.body.name) {
        next();
    } else {
        const { name } = req.body;

        const product = await Product.findOne({ where: { name } });

        if (!product) {
            next();
        } else {
            res.status(409).json(
                `Product already created with id: ${product.id}`
            );
        }
    }
};

module.exports = { checkIfExists, checkIfNameExists };
