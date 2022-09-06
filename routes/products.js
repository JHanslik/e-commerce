const express = require("express");
const app = express();
const { Product } = require("../models/index");
const { checkIfExists, checkIfNameExists } = require("../middlewares/products");

app.post("/", checkIfNameExists, async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.json(product);
    } catch (e) {
        console.log(e);
        res.status(500).json("Internal server error");
    }
});

app.get("/", async (req, res) => {
    try {
        if (req.query.order === "ASC") {
            const products = await Product.findAll({
                order: [["name", "ASC"]],
            });

            res.json(products);
        } else if (req.query.order === "DESC") {
            const products = await Product.findAll({
                order: [["name", "DESC"]],
            });

            res.json(products);
        } else {
            const products = await Product.findAll({});

            res.json(products);
        }
    } catch (e) {
        console.log(e);
        res.status(500).json("Internal server error");
    }
});

app.get("/:id", checkIfExists, async (req, res) => {
    const { id } = req.params;

    try {
        const product = req.product;

        if (product) {
            res.json(product);
        } else {
            res.status(404).json("Product not found");
        }
    } catch (e) {
        console.log(e);
        res.status(500).json("Internal server error");
    }
});

app.put("/:id", checkIfExists, checkIfNameExists, async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.update(req.body, {
            where: {
                id,
            },
        });
        const response = await Product.findOne({
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
        await Product.destroy({
            where: { id },
        });

        res.status(200).json("Product deleted");
    } catch (e) {
        console.log(e);
        res.status(500).json("Internal server error");
    }
});

module.exports = app;
