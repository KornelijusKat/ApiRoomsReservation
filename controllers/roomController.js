const mongoose = require("mongoose");
const Room = require("./../models/roomModel");
const Reservation = require("./../models/reservationModel");
const { checkout } = require("../app");
exports.createRoom = async(req,res) =>{
    try{
        const newRoom = await Room.create(req.body);
        res.status(200).json({
            message:"Success",
            data:{
                newRoom
            }
        })
    }catch(error){
        res.status(400).json({
            message:"Failed",
            error: error.message
    })
}
}
exports.getAllRooms = async(req, res) => {
    try{
        const rooms = await Room.find();
        res.status(200).json({
            rooms: {
                rooms
            }
        })
    }catch(error){
        res.status(404).json({
            status: 'Failed',
            message: error.message
        })
    }
}
exports.getRoomById = async(req,res) => {
    try{
        const room = await Room.findById(req.params.id);
        if (!room) {
            return res.status(404).json({ error: "A room with this ID does not exist" });
        }
        res.status(200).json({
            rooms: {
                room
            }
        })
    }catch(err){
        res.status(500).json({
            error: err.message
        })
    }
}
exports.checkRoomsAvailabilityByDates =  async(req,res) =>{
    try{
        const allRooms = await Room.aggregate([
            {
                $lookup:{
                    from:"reservations",
                    localField: "reservations",
                    foreignField: "_id",
                    as: "reservations"
               }
            },
            {
                $addFields: {
                    availability: {
                        $not: {
                            $gt: [
                                {
                                    $size: {
                                        $filter: {
                                            input: "$reservations",
                                            as: "reservation",
                                            cond: {
                                                $and: [
                                                    { $lt: ["$$reservation.checkin", new Date(req.params.checkout)] },
                                                    { $gt: ["$$reservation.checkout", new Date(req.params.checkin)] }
                                                ]
                                            }
                                        }
                                    }
                                },
                                0
                            ]
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,  
                    id: "$floor",  
                    number: 1,
                    availability: 1
                }
            }
            
        ]);
        res.status(200).json({
            rooms: allRooms
            
        })
    }catch(err){
        res.status(500).json({
            error: err.message
        })
    }
}
exports.reserveRoom = async(req, res) =>{
    try{
        const dbResponse = await Reservation.create(req.body);

        console.log('hi')
        await Room.findByIdAndUpdate(req.params.id, {
            $push: { reservations: dbResponse._id }
        });
        res.status(201).json({
            reservations: dbResponse,
        })
    }catch(err){
        res.status(404).json({
            error: err.message
        })
    }
}