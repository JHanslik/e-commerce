const express = require("express");
const app = express();
const { Category } = require("../models/index");
const {
    checkIfExists,
    checkIfNameExists,
} = require("../middlewares/categories");

app.post("/", checkIfNameExists, async (req, res) => {
    try {
        const category = await Category.create(req.body);
        res.json(category);
    } catch (e) {
        console.log(e);
        res.status(500).json("Internal server error");
    }
});

app.get("/", async (req, res) => {
    try {
        if (req.query.order === "ASC") {
            const categories = await Category.findAll({
                order: [["name", "ASC"]],
            });

            res.json(categories);
        } else if (req.query.order === "DESC") {
            const categories = await Category.findAll({
                order: [["name", "DESC"]],
            });

            res.json(categories);
        } else {
            const categories = await Category.findAll({});

            res.json(categories);
        }
    } catch (e) {
        console.log(e);
        res.status(500).json("Internal server error");
    }
});

app.get("/:id", checkIfExists, async (req, res) => {
    const { id } = req.params;

    try {
        const category = req.category;

        if (category) {
            res.json(category);
        } else {
            res.status(404).json("Category not found");
        }
    } catch (e) {
        console.log(e);
        res.status(500).json("Internal server error");
    }
});

app.put("/:id", checkIfExists, checkIfNameExists, async (req, res) => {
    const { id } = req.params;

    try {
        const category = await Category.update(req.body, {
            where: {
                id,
            },
        });
        const response = await Category.findOne({
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
        await Category.destroy({
            where: { id },
        });

        res.status(200).json("Category canceled");
    } catch (e) {
        console.log(e);
        res.status(500).json("Internal server error");
    }
});

module.exports = app;
