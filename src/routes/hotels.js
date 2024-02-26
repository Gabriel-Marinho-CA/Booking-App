import express from 'express';
import HotelsController from "../controller/HotelsController.js";

const hotelRouter = express.Router();

// HOTELS
hotelRouter.get("/:id",HotelsController.getHotel);
hotelRouter.get("/",HotelsController.getAllHotel);
hotelRouter.post('/', HotelsController.createHotel);
hotelRouter.put("/:id",HotelsController.updateHotel);
hotelRouter.delete("/:id",HotelsController.deleteHotel);

export default hotelRouter;