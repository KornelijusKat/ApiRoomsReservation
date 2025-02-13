const express = require('express');
const morgan = require('morgan')
const roomRouter = require('./routes/roomRoutes')
const reserveRoutes = require('./routes/reserveRoutes')

const app = express();
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}
app.use(express.json());
app.use('/api/v1/rooms', roomRouter)
app.use('/api/v1/reservations', reserveRoutes)

module.exports = app;