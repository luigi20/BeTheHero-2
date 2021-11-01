const express = require('express');
const crypto = require('crypto');
const routes = express.Router();
const bcrypt = require('bcryptjs');
const connection = require('./database/connection');

routes.post('/ongs', async (req, res) => {
    const { name, email, whatsapp, city, uf, password } = req.body;
    const id = crypto.randomBytes(4).toString('HEX');
    const hash = await bcrypt.hash(password, 10);
    this.password = hash;
    await connection('ongs').insert({
        id,
        name,
        email,
        whatsapp,
        city,
        uf,
        password
    })
    return res.send();
});

module.exports = routes;