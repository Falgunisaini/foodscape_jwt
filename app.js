const express = require('express');
const app = express();
const db = require('./db');
const port = process.env.PORT || 7200;
const cors = require('cors');

app.use(cors())

const authController = require('./controller/authController');
app.use('/api/auth', authController);

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
})