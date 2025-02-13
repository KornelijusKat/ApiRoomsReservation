const express = require('express');
const roomController = require('./../controllers/roomController')
const reservationController = require('./../controllers/reservationController')
const router = express.Router();


router
    .route('/')
    .get(roomController.getAllRooms)
    .post(roomController.createRoom)
router
    .route('/:id')
    .get(roomController.getRoomById)
router
    .route('/:id/reservations')
    .post(roomController.reserveRoom)
router
    .route("/availability/checkin/:checkin/checkout/:checkout")
    .get(roomController.checkRoomsAvailabilityByDates);
module.exports = router;