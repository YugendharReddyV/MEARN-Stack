const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DATABASE_URL)
    .then(console.log('Connection is established'))
    .catch((error)=>{
        console.log('Error in connection');
        process.exit(0);
    })