import bcrypt from "bcrypt";
import { Jwt } from "jsonwebtoken";
import User from "../Models/User.js"

export const register = async (request, response) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picture,
            friends,
            location,
            occupation,
        } = request.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picture,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000),
        });
        const savedUser = await newUser.save();
        response.status(201).json(savedUser);
    } catch (error) {
        response.status(500).json({
            error: error.message
        });
    };
};