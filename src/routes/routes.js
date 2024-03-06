import express from 'express';

import hotelRouter from './hotels.js';
import userRouter from "./users.js";
import routerAuth from './auth.js';
import roomRouter from './rooms.js';


const router = express.Router();

router.use("/hotels", hotelRouter);
router.use("/rooms", roomRouter);
router.use("/users",userRouter);
router.use("/auth", routerAuth);

export default router;