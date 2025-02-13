const mongoose = require('mongoose');
const reservationSchema = new mongoose.Schema({
    code: { 
        type: String,
        required: true },
    name: { 
        type: String, 
        required: true },
    
    checkin: { 
        type: Date, 
        required: true },
    checkout: { 
        type: Date, 
        required: true },
    room: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Room", 
        required: true }
});
const Reservation = mongoose.model("Reservation", reservationSchema)
module.exports = Reservation;