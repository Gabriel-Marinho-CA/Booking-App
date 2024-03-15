import
sequelize
from "../db/db.js";
import UserModel from "../models/UserModel.js";

// import ErrorHandler from "../utils/error.js";

sequelize.authenticate();

class UsersController {

    async updateUser(req, res) {
        try {
            const body = req.body;
            const [, [updatedUser]] = await UserModel.update(
                body, {
                    where: {
                        id: req.params.id
                    },
                    returning: true
                });

            return res.status(200).json(updatedUser);

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                error
            });
        }
    }
    async deleteUser(req, res) {
        try {
            const id = req.params.id;

            await UserModel.destroy({
                where: {
                    id: id
                }
            })

            return res.status(200).json({
                UserDeletedId: id
            });

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                error
            });
        }
    }

    async getUser(req, res) {
        try {
            const id = req.params.id;

            const findedUser = await UserModel.findOne({
                where: {
                    id: id
                },
                returning: true
            });

            return res.status(200).json(findedUser);
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                error
            });
        }
    }

    async getAllUser(req, res, next) {
        try {
            const getAllUsers = await UserModel.findAll();
            return res.status(200).json(getAllUsers);

        } catch (error) {
            console.log(error)
            next(error);

            // if (failed) return next(ErrorHandler.createError(401, "You are not autenticated"));
        }
    }
}

export default new UsersController;