import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Products from "./ProductModel.js";

const { DataTypes } = Sequelize;

const IncomingGoods = db.define('incomingGoods', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
            isInt: true
        }
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
            isInt: true
        }
    }
}, {
    freezeTableName: true
});

Products.hasMany(IncomingGoods, { foreignKey: 'productId' });
IncomingGoods.belongsTo(Products, { foreignKey: 'productId' });

export default IncomingGoods;
