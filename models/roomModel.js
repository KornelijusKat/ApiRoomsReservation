const mongoose = require('mongoose');
const Reservation = require('./reservationModel')

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
        type:String,
        required:[true, 'A room has to have an image']
    },
    price:{
        type:String,
        required:[true, 'A room has to have a price']
    },
    wifi:{
        type:Boolean,
        default:false
    },
    parking:{
        type:Boolean,
        default:false
    },
    breakfast:{
        type:Boolean,
        default:false
    },
    reservations: [
        { type: mongoose.Schema.Types.ObjectId, 
            ref: "Reservation" }
        ]
})
const Room = mongoose.model("Room", roomSchema)
module.exports = Room;