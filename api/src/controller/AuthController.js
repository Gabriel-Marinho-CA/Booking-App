import {
    Op
} from "sequelize";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";

import UserModel from "../models/UserModel.js";
import ErrorHandler from "../utils/error.js";



class AuthController {
    async login(req, res, next) {
        const {
            username,
            email,
        } = req.body;

        const bodyPass = req.body.password;

        try {
            const user = await UserModel.findOne({
                where: {
                    [Op.or]: [{
                            username: {
                                [Op.iLike]: username
                            }
                        },
                        {
                            email: {
                                [Op.iLike]: email
                            }
                        }
                    ]

                }
            });

            if (!user) {
                return next(ErrorHandler.createError(404, "User not found"));
            }

            const isPasswordCorrect = await bcrypt.compare(bodyPass, user.password);

            if (!isPasswordCorrect) {
                return next(ErrorHandler.createError(400, "Wrong password or Username"));
            }

            const token = Jwt.sign({
                id: user.id,
                isAdmin: user.isAdmin
            }, process.env.JWT_SECRET);


            const {
                password,
                isAdmin,
                ...otherDetails
            } = user.dataValues;

            res.cookie("access_token", token, {
                httpOnly: true
            }).status(200).json({
                ...otherDetails
            });

        } catch (error) {
            next(error);
        }
    }
    async register(req, res, next) {
        const {
            username,
            email,
            password
        } = req.body;
        try {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);

            const newUser = await UserModel.create({
                username,
                email,
                password: hash
            });

            return res.status(200).json({
                message: "User has been created",
                user: newUser
            })

        } catch (error) {
            next(error);
        }

    }

    async updateUser(req, res, next) {
        const {
            username,
            email,
            password
        } = req.body;

        const body = req.body;

        try {
            const [, [userUpdate]] = await UserModel.update(
                body, {
                    where: {
                        email: req.params.id
                    },
                    returning: true
                }
            )

        } catch (error) {
            next(error);
        }
    }
}

export default new AuthController;