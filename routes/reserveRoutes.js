const express = require('express');
const reservationController = require('./../controllers/reservationController')
const router = express.Router();

router
    .route('/')
    .get(reservationController.getUserReservations)
    .post(reservationController.getUserReservations)
router
    .route('/:reservationId/cancel')
    .post(reservationController.cancelReservation)
module.exports = router;