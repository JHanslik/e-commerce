const { Order } = require("../models/index");

const checkIfExists = async (req, res, next) => {
    const { id } = req.params;

    const order = await Order.findOne({
        where: { id },
    });

    if (order) {
        req.order = order;
        next();
    } else {
        res.status(404).json("Order not found");
    }
};

const checkIfNameExists = async (req, res, next) => {
    if (req.method === "PUT" && !req.body.name) {
        next();
    } else {
        const { name } = req.body;

        const order = await Order.findOne({ where: { name } });

        if (!order) {
            next();
        } else {
            res.status(409).json(`Order already created with id: ${order.id}`);
        }
    }
};

module.exports = { checkIfExists, checkIfNameExists };
