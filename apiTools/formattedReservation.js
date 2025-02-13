const formatReservation = (reservationsRes) => {
    if (!reservationsRes || (typeof reservationsRes !== "object" && !Array.isArray(reservationsRes))) {
        return Array.isArray(reservationsRes) ? [] : null;
    }
    if (Array.isArray(reservationsRes)) {
        return reservationsRes.map((reservation) => formatReservation(reservation));
    }
    return {
        id: reservationsRes._id,
        code: reservationsRes.code,
        name: reservationsRes.name,
        createdAt: reservationsRes.createdAt,
        reservation_information: {
            id: reservationsRes._id,
            checkin: reservationsRes.checkin,
            checkout: reservationsRes.checkout,
            room: reservationsRes.room
                ? { id: reservationsRes.room._id, number: reservationsRes.room.number }
                : null
        }
    };
};
module.exports = formatReservation;