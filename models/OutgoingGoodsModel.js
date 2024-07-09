import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Products from "./ProductModel.js";

const { DataTypes } = Sequelize;

const OutgoingGoods = db.define('outgoingGoods', {
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
            notEmpty: true
        }
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    freezeTableName: true
});

Products.hasMany(OutgoingGoods, { foreignKey: 'productId' });
OutgoingGoods.belongsTo(Products, { foreignKey: 'productId' });

export default OutgoingGoods;
