const express = require('express');
const morgan = require('morgan')
const roomRouter = require('./routes/roomRoutes')

const app = express();
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}
app.use(express.json());
app.use('/api/v1/room', roomRouter)
app.use('/api/v1/availability', roomRouter)

module.exports = app;