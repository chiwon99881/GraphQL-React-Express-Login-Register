const express = require('express');
const TEMPLATE = require('../template/template');
const mysql = require('mysql');
const db = require('../database/db');
const router = express.Router();

const connection = mysql.createConnection(db)

router.get('/login', (req, res) => {
    const loginOrLogout = TEMPLATE.printAnchor(req);
    const form = `
    <form action="/page/login_process" method="post">
        <input type="text" name="name" placeholder="name" />
        <input type="text" name="password" placeholder="password"/>
        <input type="submit" value="Login" />
    </form>
    `;
    res.send(TEMPLATE.template(loginOrLogout,form));
});

router.post('/login_process', (req, res) => {
    let body = req.body;
    let name = body.name;
    let password = body.password;
    const SELECT_USER = `SELECT * FROM user WHERE name='${name}' and password='${password}'`;
    connection.query(SELECT_USER, (err, results) => {
        if (err) {
            return err;
        } else if (results[0] === undefined) {
            res.redirect('/');
        } else if (results[0] !== undefined) {
            req.session.isLogged = true;
            req.session.name = results[0].name;
            req.session.save(err => {
                if(err) {
                    return err;
                } else {
                    res.redirect('/');
                }
            });
        }
    });
});

router.get('/logout',(req,res) => {
    req.session.destroy(err => {
        if(err) {
            return err;
        } else {
            res.redirect('/');
        }
    });
});

router.get('/auth',(req,res) => {
    const loggedState = TEMPLATE.isLogged(req);
    const loginOrLogout = TEMPLATE.printAnchor(req);
    if(loggedState === false) {
        res.redirect('/');
        return false;
    } else {
        res.send(TEMPLATE.template(loginOrLogout,'<h1>USER_ONLY</h1>'))
    }
})
module.exports = router;