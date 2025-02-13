const mongoose = require('mongoose');

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
    },
    wifi:{
        type:Boolean
    },
    parking:{
        type:Boolean
    },
    reservations:{
        type:Array,
        
    }

})
const Room = mongoose.model("Room", roomSchema)
module.exports = Room;