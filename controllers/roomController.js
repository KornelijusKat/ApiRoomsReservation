const mongoose = require("mongoose");
const Room = require("./../models/roomModel");
const Reservation = require("./../models/reservationModel");
const formattedReservations = require("../apiTools/formattedReservation");
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
        const rooms = await Room.find().populate({
            path: "reservations",
            select: "checkin checkout"
        });
        res.status(200).json({
            rooms: {
                rooms
            }
        })
    }catch(error){
        res.status(500).json({
            status: 'failed',
            message: error.message
        })
    }
}
exports.getRoomById = async(req,res) => {
    try{
        const room = await Room.findById(req.params.id).select('-breakfast').populate({
            path: "reservations",
            select: "checkin checkout"
        });
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
        const checkinDate = new Date(req.params.checkin);
        const checkoutDate = new Date(req.params.checkout);
        if (isNaN(checkinDate.getTime())) {
            return res.status(400).json({ error: "Bad checkin date format or date not provided" });
        }
        if (isNaN(checkoutDate.getTime())) {
            return res.status(400).json({ error: "Bad checkout date format or date not provided" });
        }

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
                                                    { $lt: ["$$reservation.checkin", checkoutDate] },
                                                    { $gt: ["$$reservation.checkout", checkinDate] }
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
                    id: "$_id",  
                    number: "$number",
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
        const dbResponse = await Reservation.create({...req.body, room: req.params.id});
        const room = await Room.findByIdAndUpdate(req.params.id, {
            $push: { reservations: dbResponse._id }
        });
        if(!room){
            return res.status(404).json({ error: "A room with this ID does not exist" });
        }
        const formattedRes = formattedReservations({ ...dbResponse._doc, room: { _id: room.id, number: room.number } });
        res.status(201).json({
            reservations: formattedRes
        })
    }catch(err){
        res.status(500).json({
            error: err.message
        })
    }
}