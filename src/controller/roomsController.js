import
sequelize
from "../db/db.js";
import HotelModel from "../models/HotelModel.js";
import RoomModel from "../models/RoomModel.js";

sequelize.authenticate();

class RoomsController {
    async createRooms(req, res, next) {
        const hotelId = req.params.id;

        try {
            const savedRoom = await RoomModel.create(req.body);
            const savedRoomId = savedRoom.id.toString();
            try {
                const [, [hotelUpdated]] = await HotelModel.update({
                    rooms: sequelize.fn('array_append', sequelize.col('rooms'), savedRoomId),
                }, {
                    where: {
                        id: hotelId
                    },
                    returning: true
                });

                if (!hotelUpdated) return res.status(500).json({
                    error: "Can't find hotel id"
                });

            } catch (error) {
                return next(error);
            }

            return res.status(200).json(savedRoom);

        } catch (error) {
            next(error)
        }
    }
    async updateRooms(req, res) {
        try {
            const body = req.body;
            const [, [updatedRooms]] = await RoomModel.update(
                body, {
                    where: {
                        id: req.params.id
                    },
                    returning: true
                });

            if (!updatedRooms) return res.status(500).json({
                error: "Can't find Rooms id"
            });

            return res.status(200).json(updatedRooms);

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                error
            });
        }
    }
    
    async deleteRooms(req, res, next) {
        try {
            const id = req.params.id;
            const hotelId = req.params.hotelId;

            await RoomModel.destroy({
                where: {
                    id: id
                }
            });

            try {
                await HotelModel.update({
                    rooms: sequelize.fn('array_remove', sequelize.col('rooms'), id),
                }, {
                    where: {
                        id: hotelId
                    }
                });

            } catch (error) {
                return next(error);
            }

            return res.status(200).json({
                RoomsDeletedId: id
            });

        } catch (error) {
            next(error);
        }
    }

    async getRooms(req, res) {
        try {
            const id = req.params.id;

            const findedRooms = await RoomModel.findOne({
                where: {
                    id: id
                },
                returning: true
            });

            return res.status(200).json(findedRooms);
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                error
            });
        }
    }

    async getAllRooms(req, res, next) {
        try {
            const getAllRoomss = await RoomModel.findAll();
            return res.status(200).json(getAllRoomss);

        } catch (error) {
            console.log(error)
            next(error);

            // if (failed) return next(ErrorHandler.createError(401, "You are not autenticated"));
        }
    }
}

export default new RoomsController;