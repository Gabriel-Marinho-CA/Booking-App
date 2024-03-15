import express from 'express';
import AuthController from "../controller/AuthController.js";
const routerAuth = express.Router();


routerAuth.post('/login', AuthController.login);
routerAuth.post('/register', AuthController.register);
routerAuth.put('/:id', AuthController.updateUser);

export default routerAuth;