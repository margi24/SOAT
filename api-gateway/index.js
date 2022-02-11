const express = require('express');
const userRoute = require('./routes/api-gateway')
const cors = require('cors');


const app = express();


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(express.urlencoded());
app.use(express.json());
app.use('/',userRoute)

const port = process.env.PORT || 8094;


var server = app.listen(port,"localhost", () => {
    console.log(`Server listening to port ${port}`);
});