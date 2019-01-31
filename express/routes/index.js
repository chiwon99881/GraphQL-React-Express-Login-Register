const express = require('express');
const TEMPLATE = require('../template/template');
const router = express.Router();

router.get('/',(req,res) => {
    const loginOrLogout = TEMPLATE.printAnchor(req);
    res.send(TEMPLATE.template(loginOrLogout,''));
});

module.exports = router;