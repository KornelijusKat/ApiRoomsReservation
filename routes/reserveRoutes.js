const express = require('express');
const reservationController = require('./../controllers/reservationController')
const router = express.Router();

router
    .route('/')
    .get(reservationController.getAllUserReservations)
    .post(reservationController.getAllUserReservations)
router
    .route('/:reservationId/cancel')
    .post(reservationController.cancelReservation)
module.exports = router;