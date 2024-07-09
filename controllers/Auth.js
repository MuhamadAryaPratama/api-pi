import User from "../models/UserModel.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

export const Login = async (req, res) => {
    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    });
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
    const match = await argon2.verify(user.password, req.body.password);
    if (!match) return res.status(400).json({ msg: "Wrong Password" });

    const uuid = user.uuid;
    const name = user.name;
    const email = user.email;
    const token = jwt.sign({ userId: user.id, uuid, name, email }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({ token });
}

export const Me = async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) return res.status(401).json({ msg: "Token not found" });

        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) return res.status(403).json({ msg: "Invalid Token" });

            const user = await User.findOne({
                attributes: ['uuid', 'name', 'email'],
                where: {
                    uuid: decoded.uuid
                }
            });
            if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
            res.status(200).json(user);
        });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const logOut = (req, res) => {
    // For JWT, we don't need a logout endpoint. Just let the client delete the token.
    res.status(200).json({ msg: "Anda telah logout" });
}

export const Register = async (req, res) => {
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
