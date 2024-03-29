import express from 'express';
import UsersController from '../controller/usersController.js';
import {
    verifyToken,
    verifyUser,
    verifyAdmin
} from '../utils/verifyToken.js';


const userRouter = express.Router();

// userRouter.get("/checkuser/:id", verifyUser, (req, res, next) => {
//     res.send("User atuhenticated can update own account")
// });
// userRouter.get("/checkauth", verifyToken, (req, res, next) => {
//     res.send("User is logged")
// });
// userRouter.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//     res.send("Admin user is logged and can CRUD user");
// });

userRouter.get("/:id", verifyUser, UsersController.getUser);
userRouter.get("/", verifyAdmin, UsersController.getAllUser);
userRouter.put("/:id", verifyUser, UsersController.updateUser);
userRouter.delete("/:id", verifyUser, UsersController.deleteUser);

export default userRouter;