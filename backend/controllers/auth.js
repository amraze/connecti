import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
            error: error.message,
        });
    };
};

export const login = async (request, response) => {
    try {
        const {
            email,
            password,
        } = request.body;

        const user = await User.findOne({ email: email });

        if (!user) {
            return response.status(404).json({
                message: 'User does not exist.',
            });
        } else {
            const isMatched = await bcrypt.compare(password, user.password);

            if (!isMatched) {
                return response.status(404).json({
                    message: 'Invalid credentials.',
                });
            } else {
                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
                delete user.password;

                response.status(200).json({
                    token: token,
                    user: user,
                });
            }
        }
    } catch (error) {
        response.status(500).json({
            error: error.message,
        });
    }
};