const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
const app = require('./app');
const port = process.env.PORT || 3000;
const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

mongoose
.connect(DB, {
    useNewUrlParser: true
})
.then(()=> console.log('DB connection is ok'))





app.listen(port, ()=>{
    console.log(`App running on port ${port}`)
});