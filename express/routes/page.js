const express = require('express');
const mysql = require('mysql');
const db = require('../database/db');
const router = express.Router();

const connection = mysql.createConnection(db)

router.get('/checkLogged',(req,res) => {
    const SELECT_SESSION = `SELECT * FROM sessions`;
    connection.query(SELECT_SESSION,(err,results) => {
        if(err) {
            return err; 
        }else if(results[0] !== undefined) {
            res.json({isLogged : JSON.parse(results[0].data).isLogged});
        }else if(results[0] === undefined) {
            res.json({isLogged : false})
        }
    })
})
module.exports = router;