const mongoose = require("mongoose");
const Reservation = require("./../models/reservationModel")
const Room = require("./../models/roomModel");
const formatReservation = require("../apiTools/formattedReservation");

exports.getAllUserReservations = async(req, res) => {
    try{
        const { code, name } = req.body;
        console.log(code);
        const reservationsRes = await Reservation.find({code, name}).populate({
            path: "room",
            select: "number"
        })
        if(reservationsRes.length < 1){
            res.status(401).json({
                error: "Unauthorized"
            })
        }
        const formattedRes = formatReservation(reservationsRes)
        res.status(200).json({ 
            formattedRes
            
        })
    }catch(err){
        res.status(500).json({
            error: err.message
        })
    }
} 
exports.cancelReservation = async(req, res) =>{
    try{
        const { code, name } = req.body;
        const reservationById = await Reservation.findById(req.params.reservationId)
        if (!reservationById) {
            return res.status(404).json({ error: "A reservation with this ID does not exist" });
        }
        const reservationByCodeAndName = await Reservation.find({code, name})
        if (reservationByCodeAndName.length < 1) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        await Room.findByIdAndUpdate(reservationById.room, {
            $pull:{reservations: reservationById._id}
        })
        await Reservation.findByIdAndDelete(req.params.reservationId);
        res.status(200).json({message: "success"})
    }catch(err){
        res.status(500).json({
            error: err.message
        })
    }
}