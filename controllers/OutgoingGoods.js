import OutgoingGoods from "../models/OutgoingGoodsModel.js";
import Product from "../models/ProductModel.js";

export const createOutgoingGoods = async (req, res) => {
    const { productName, quantity } = req.body;
    try {
        const product = await Product.findOne({ where: { name: productName } });
        if (!product) {
            return res.status(404).json({ msg: "Product not found" });
        }

        if (product.quantity < quantity) {
            return res.status(400).json({ msg: "Insufficient stock" });
        }

        await OutgoingGoods.create({
            productId: product.id,
            quantity
        });

        await product.update({ quantity: product.quantity - quantity });

        res.status(201).json({ msg: "Outgoing goods recorded successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const getOutgoingGoods = async (req, res) => {
    try {
        const response = await OutgoingGoods.findAll({
            include: [{ model: Product, attributes: ['name', 'price', 'quantity', 'category'] }]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
