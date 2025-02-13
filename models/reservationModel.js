const mongoose = require('mongoose');
const Room = require('./roomModel'); 
const reservationSchema = new mongoose.Schema({
    code: { 
        type: String,
        required: true },
    name: { 
        type: String, 
        required: true },
    address:{
        type: String, 
        required: true },
    city:{
        type: String, 
        required: true },
    zip:{
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
        ref: "Room"
        }
});
const Reservation = mongoose.model("Reservation", reservationSchema)
module.exports = Reservation;