import express from 'express';
import UsersController from '../controller/usersController.js';


const userRouter = express.Router();

userRouter.post('/', UsersController.createUser);

export default userRouter; 