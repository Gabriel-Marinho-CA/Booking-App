import
sequelize
from "../db/db.js";
import HotelModel from "../models/HotelModel.js";

sequelize.authenticate();

class HotelsController {
    async createHotel(req, res) {
        const newHotel = req.body;
        try {
            const savedHotel = await HotelModel.create(newHotel);
            return res.status(200).json(savedHotel);
            
        } catch (error) {
            console.log(error)
            return res.status(500).json( { error } );
        }
    }
}

export default new HotelsController;