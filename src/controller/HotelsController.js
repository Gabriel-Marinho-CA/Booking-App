import
sequelize
from "../db/db.js";
import HotelModel from "../models/HotelModel.js";

// import ErrorHandler from "../utils/error.js";

sequelize.authenticate();

class HotelsController {
    async createHotel(req, res) {
        const newHotel = req.body;
        try {
            const savedHotel = await HotelModel.create(newHotel);
            return res.status(200).json(savedHotel);

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                error
            });
        }
    }
    async updateHotel(req, res) {
        try {
            const body = req.body;
            const [, [updatedHotel]] = await HotelModel.update(
                body, {
                    where: {
                        id: req.params.id
                    },
                    returning: true
                });

            return res.status(200).json(updatedHotel);

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                error
            });
        }
    }
    async deleteHotel(req, res) {
        try {
            const id = req.params.id;

            await HotelModel.destroy({
                where: {
                    id: id
                }
            })

            return res.status(200).json({
                hotelDeletedId: id
            });

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                error
            });
        }
    }

    async getHotel(req, res) {
        try {
            const id = req.params.id;

            const findedHotel = await HotelModel.findOne({
                where: {
                    id: id
                },
                returning: true
            });

            return res.status(200).json(findedHotel);
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                error
            });
        }
    }

    async getAllHotel(req, res, next) {
        try {
            const getAllHotels = await HotelModel.findAll();
            return res.status(200).json(getAllHotels);

        } catch (error) {
            console.log(error)
            next(error);

            // if (failed) return next(ErrorHandler.createError(401, "You are not autenticated"));
        }
    }
}

export default new HotelsController;