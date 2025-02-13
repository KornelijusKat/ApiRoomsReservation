const Reservation = require("./../models/reservationModel")

exports.reserveRoom = async(req, res) =>{
    try{
        const dbResponse = await Reservation.create(req.body);
        res.status(201).json({
            reservations: dbResponse
        })
    }catch(err){
        res.status(404).json({
            error: err.message
        })
    }
}