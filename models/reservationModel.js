const mongoose = require('mongoose');
const Room = require('./roomModel'); 
const codeRandomizer = require('../apiTools/codeRandomizer');
const reservationSchema = new mongoose.Schema({
    code: { 
        type: String,
        required: true,
        unique: true,
        default: codeRandomizer},
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
    createdAt:{
        type:Date,
        default:Date.now
    },
    room: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Room"
        }
});
const Reservation = mongoose.model("Reservation", reservationSchema)
module.exports = Reservation;