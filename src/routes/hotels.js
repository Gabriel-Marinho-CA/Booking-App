import express from 'express';
import HotelsController from "../controller/HotelsController.js";
import {
    verifyAdmin
} from '../utils/verifyToken.js';

const hotelRouter = express.Router();

// HOTELS
hotelRouter.get("/:id", HotelsController.getHotel);
hotelRouter.get("/", HotelsController.getAllHotel);
hotelRouter.post('/', verifyAdmin, HotelsController.createHotel);
hotelRouter.put("/:id", verifyAdmin, HotelsController.updateHotel);
hotelRouter.delete("/:id", verifyAdmin, HotelsController.deleteHotel);

export default hotelRouter;