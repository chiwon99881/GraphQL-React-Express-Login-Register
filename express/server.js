const express = require('express')
const pageRouter = require('./routes/page');

const app = express();

app.use('/page',pageRouter);

app.listen(5000,() => console.log("Express Server on Port 5000"));