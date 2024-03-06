import {
    DataTypes
} from 'sequelize';

import
sequelize
from '../db/db.js';

const RoomModel = sequelize.define('Room', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    desc: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    maxPeople: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    roomNumbers: {
        type: DataTypes.ARRAY(DataTypes.JSON({
            number: DataTypes.INTEGER,
            unavailableDates: DataTypes.ARRAY(DataTypes.DATE)
        })),
        allowNull: false,
    },
});

export default RoomModel;