import UserModel from "../models/UserModel.js";

class UsersController {
    async createUser(req, res, next) {
        const {
            username,
            email,
            password
        } = req.body;
        try {
            const newUser = await UserModel.create({
                username,
                email,
                password
            });

            return res.status(200).json({
                message: "User has been created",
                user: newUser
            })

        } catch (error) { 
            next(error);
        }
    }
}

export default new UsersController;