const mongoose = require('mongoose');
const reservationSchema = new mongoose.Schema({
    id: { 
        type: Number, 
        required: true },
    code: { 
        type: String,
        required: true },
    name: { 
        type: String, 
        required: true },
    created_at: { 
        type: Date, 
        default: Date.now },
    checkin: { 
        type: Date, 
        required: true },
    checkout: { 
        type: Date, 
        required: true },
    room: { 
        id: { type: Number, required: true }, 
        number: { type: String, required: true } 
    } 
});
const Reservation = mongoose.model("Reservation", reservationSchema)
module.exports = Reservation;