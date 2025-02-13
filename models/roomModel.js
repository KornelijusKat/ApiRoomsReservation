const mongoose = require('mongoose');
const reservationModel = require('./reservationModel')

const roomSchema = new mongoose.Schema({
    number:{
        type:String,
        required:[true, 'A room needs to have a number']
    },
    capacity:{
        type:String,
        required:[true, 'A room has to have a capacity']
    },
    floor:{
        type:String,
        required:[true, 'A room has to have a floor number']
    },
    roomImage:{
        type:String
    },
    wifi:{
        type:Boolean
    },
    parking:{
        type:Boolean
    },
    breakfast:{
        type:Boolean
    },
    reservations: [
        { type: mongoose.Schema.Types.ObjectId, 
            ref: "Reservation" }
        ]
})
const Room = mongoose.model("Room", roomSchema)
module.exports = Room;