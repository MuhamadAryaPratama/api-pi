import User from "../models/UserModel.js";
import argon2 from 'argon2';

export const getUser = async (req, res) => {
    try {
        const response = await User.findAll({
            attributes: ['uuid', 'name', 'email']
        });
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}

export const getUserById = async (req, res) => {
    try {
        const response = await User.findOne({
            attributes: ['uuid', 'name', 'email'],
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}

export const createUser = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) return res.status(400).json({ msg: "Password dan Confirm Password tidak cocok" });
    const hashPassword = await argon2.hash(password);
    try {
        await User.create({
            name: name,
            email: email,
            password: hashPassword
        });
        res.status(201).json({ msg: "Register berhasil" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const updateUser = async (req, res) => {
    const user = await User.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if (!user) return res.status(404).json({ msg: "User not found" });
    const { name, email, password, confirmPassword } = req.body;
    let hashPassword;
    if (password === "" || password === null) {
        hashPassword = user.password;
    } else {
        if (password !== confirmPassword) return res.status(400).json({ msg: "Password dan Confirm Password tidak cocok" });
        hashPassword = await argon2.hash(password);
    }
    try {
        await User.update({
            name: name,
            email: email,
            password: hashPassword
        }, {
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json({ msg: "User Updated" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const deleteUser = async (req, res) => {
    const user = await User.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if (!user) return res.status(404).json({ msg: "User not found" });
    try {
        await User.destroy({
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json({ msg: "User Deleted" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}
