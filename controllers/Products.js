import Product from "../models/ProductModel.js";
import User from "../models/UserModel.js";
import { Op } from "sequelize";

export const getProducts = async (req, res) => {
    try {
        const response = await Product.findAll({
            attributes: ['uuid', 'name', 'price', 'quantity'],
            where: {
                userId: req.userId
            },
            include: [{
                model: User,
                attributes: ['name', 'email']
            }]
        });
        res.status(200).json(response);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}


export const getProductById = async (req, res) => {
    try {
        const product = await Product.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!product) return res.status(404).json({ msg: "Data tidak ditemukan" });
        const response = await Product.findOne({
            attributes: ['uuid', 'name', 'price', 'quantity'],
            where: {
                [Op.and]: [{ id: product.id }, { userId: req.userId }]
            },
            include: [{
                model: User,
                attributes: ['name', 'email']
            }]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const createProduct = async (req, res) => {
    const { name, price, quantity } = req.body;
    try {
        await Product.create({
            name: name,
            price: price,
            quantity: quantity,
            userId: req.userId
        });
        res.status(201).json({ msg: "Product Created Successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!product) return res.status(404).json({ msg: "Data tidak ditemukan" });
        const { name, price, quantity } = req.body;
        if (req.userId !== product.userId) return res.status(403).json({ msg: "Akses terlarang" });
        await Product.update({ name, price, quantity }, {
            where: {
                [Op.and]: [{ id: product.id }, { userId: req.userId }]
            }
        });
        res.status(200).json({ msg: "Product updated successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!product) return res.status(404).json({ msg: "Data tidak ditemukan" });
        if (req.userId !== product.userId) return res.status(403).json({ msg: "Akses terlarang" });
        await Product.destroy({
            where: {
                [Op.and]: [{ id: product.id }, { userId: req.userId }]
            }
        });
        res.status(200).json({ msg: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}