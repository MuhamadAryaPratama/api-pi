import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";

const { DataTypes } = Sequelize;

const Products = db.define('product', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
            isInt: true
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
            notEmpty: true,
            isInt: true
        }
    },
    userId: {
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

Users.hasMany(Products);
Products.belongsTo(Users, { foreignKey: 'userId' });

export default Products;