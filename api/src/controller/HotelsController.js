import
sequelize
from "../db/db.js";
import HotelModel from "../models/HotelModel.js";

import {
    Op
} from "sequelize";

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

            if (!updatedHotel) return res.status(500).json({
                error: "Can't find hotel id"
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
        const {
            min,
            max,
            limit,
            ...others
        } = req.query;

        try {

            const getAllHotels = await HotelModel.findAll({
                where: {
                    ...others,
                    cheapestPrice:

                    {
                        [Op.gte]: min || 1,
                        [Op.lte]: max || 200
                    }

                },
                limit: limit || 10 

            });

            return res.status(200).json(getAllHotels);

        } catch (error) {
            console.log(error)
            next(error);

            // if (failed) return next(ErrorHandler.createError(401, "You are not autenticated"));
        }
    }

    async countByCity(req, res, next) {
        const cities = req.query.cities.split(",");

        try {
            const list = await Promise.all(cities.map(cityCell => {
                return HotelModel.count({
                    where: {
                        city: {
                            [Op.iLike]: cityCell
                        }
                    }
                })
            }));
            return res.status(200).json(list);

        } catch (error) {
            console.log(error)
            next(error);

            // if (failed) return next(ErrorHandler.createError(401, "You are not autenticated"));
        }
    }
    async countByType(req, res, next) {

        try {
            const hotelsCount = await HotelModel.count({
                where: {
                    type: {
                        [Op.iLike]: "hotel"
                    }
                }
            })
            const apartmentsCount = await HotelModel.count({
                where: {
                    type: {
                        [Op.iLike]: "apartments"
                    }
                }
            })
            const resortsCount = await HotelModel.count({
                where: {
                    type: {
                        [Op.iLike]: "resorts"
                    }
                }
            })
            const cabinsCount = await HotelModel.count({
                where: {
                    type: {
                        [Op.iLike]: "cabins"
                    }
                }
            })
            const villasCount = await HotelModel.count({
                where: {
                    type: {
                        [Op.iLike]: "villas"
                    }
                }
            })

            return res.status(200).json([{
                    type: "hotel",
                    count: hotelsCount
                },
                {
                    type: "apartments",
                    count: apartmentsCount
                },
                {
                    type: "resorts",
                    count: resortsCount
                },
                {
                    type: "cabins",
                    count: cabinsCount
                },
                {
                    type: "villas",
                    count: villasCount
                },
            ]);

        } catch (error) {
            console.log(error)
            next(error);

            // if (failed) return next(ErrorHandler.createError(401, "You are not autenticated"));
        }
    }
}

export default new HotelsController;