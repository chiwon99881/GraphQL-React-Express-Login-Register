const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const db = require('./database/db');
const MySQLStore = require('express-mysql-session')(session);
const pageRouter = require('./routes/page');
const indexRouter = require('./routes/index');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));


const sessionStore = new MySQLStore(db);
app.use(session({
    key:'session_cookie_name',
    secret:'keyboard cat',
    resave:false,
    saveUninitialized:false,
    store:sessionStore
}));

app.use('/',indexRouter);
app.use('/page',pageRouter);

app.listen(5000,() => console.log("Express Server on Port 5000"));