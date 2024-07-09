import IncomingGoods from "../models/IncomingGoodsModel.js";
import Product from "../models/ProductModel.js";

export const createIncomingGoods = async (req, res) => {
    const { productName, quantity } = req.body;
    try {
        const product = await Product.findOne({ where: { name: productName } });
        if (!product) {
            return res.status(404).json({ msg: "Product not found" });
        }

        await IncomingGoods.create({
            productId: product.id,
            quantity
        });

        const newQuantity = product.quantity + Number(quantity);

        await product.update({ quantity: newQuantity });

        res.status(201).json({ msg: "Incoming goods recorded successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const getIncomingGoods = async (req, res) => {
    try {
        const response = await IncomingGoods.findAll({
            include: [{ model: Product, attributes: ['name', 'price', 'quantity', 'category'] }]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
