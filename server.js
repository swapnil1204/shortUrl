const express = require('express');
const connectDB = require('./config/db.js');
const app = express();

//conncet DB
connectDB();

app.use(express.json({extended:false}))

//define routes 
app.use('/',require('./routes/route'));
app.use('/api/url',require('./routes/url'));

const PORT  = 4000;

app.listen(PORT ,()=>{
    console.log("listening",PORT);
})