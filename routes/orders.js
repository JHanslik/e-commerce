const express = require("express");
const app = express();
const { Order } = require("../models/index");
const { checkIfExists, checkIfNameExists } = require("../middlewares/orders");

app.post("/", checkIfNameExists, async (req, res) => {
    try {
        const order = await Order.create(req.body);
        res.json(order);
    } catch (e) {
        console.log(e);
        res.status(500).json("Internal server error");
    }
});

app.get("/", async (req, res) => {
    try {
        if (req.query.order === "ASC") {
            const orders = await Order.findAll({
                order: [["name", "ASC"]],
            });

            res.json(orders);
        } else if (req.query.order === "DESC") {
            const orders = await Order.findAll({
                order: [["name", "DESC"]],
            });

            res.json(orders);
        } else {
            const orders = await Order.findAll({});

            res.json(orders);
        }
    } catch (e) {
        console.log(e);
        res.status(500).json("Internal server error");
    }
});

app.get("/:id", checkIfExists, async (req, res) => {
    const { id } = req.params;

    try {
        const order = req.order;

        if (order) {
            res.json(order);
        } else {
            res.status(404).json("Order not found");
        }
    } catch (e) {
        console.log(e);
        res.status(500).json("Internal server error");
    }
});

app.put("/:id", checkIfExists, checkIfNameExists, async (req, res) => {
    const { id } = req.params;

    try {
        const order = await Order.update(req.body, {
            where: {
                id,
            },
        });
        const response = await Order.findOne({
            where: {
                id,
            },
        });

        res.json(response);
    } catch (e) {
        console.log(e);
        res.status(500).json("Internal server error");
    }
});

app.delete("/:id", checkIfExists, async (req, res) => {
    const { id } = req.params;

    try {
        await Order.destroy({
            where: { id },
        });

        res.status(200).json("Order canceled");
    } catch (e) {
        console.log(e);
        res.status(500).json("Internal server error");
    }
});

module.exports = app;
