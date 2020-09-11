const express = require('express');
const app = express();
const routs = require('./routes/index');
const bodyParser = require('body-parser');
const cors = require('cors');


require('dotenv').config(); // for reading env file

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// cors middleware wor cross origin requests
app.use(cors());

app.use('/', routs);


app.listen(process.env.SERVER_PORT, (err) => {
    if (err) throw err;
    console.log(`========== STARTED ON PORT ${process.env.SERVER_PORT} ==========`);
});