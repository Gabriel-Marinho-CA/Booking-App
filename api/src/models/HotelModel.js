import {
    DataTypes
} from 'sequelize';

import
sequelize
from '../db/db.js';

const HotelModel = sequelize.define('Hotel', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull:false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    distance: {
        type: DataTypes.STRING,
        allowNull: false
    },
    photos: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
    },
    desc: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: true,
        min: 0,
        max: 5
    },
    rooms: DataTypes.ARRAY(DataTypes.STRING),
    cheapestPrice: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    featured: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
});

export default HotelModel;
