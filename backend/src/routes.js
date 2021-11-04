const express = require('express');
const crypto = require('crypto');
const routes = express.Router();
const bcrypt = require('bcryptjs');
const connection = require('./database/connection');
const authconfig = require('./config/auth.json');
const jwt = require('jsonwebtoken');
function generateToken(params = {}) {
    const token = jwt.sign(params, authconfig.secret, {
        expiresIn: 86400,
    });
    return token;
}

routes.post('/register_ongs', async (req, res) => {
    const { name, email, whatsapp, city, uf } = req.body;
    try {
        if (await connection('ongs').where('email', email).first()) {
            return res.status(400).send({ Error: "Ong Already Exists" })
        }
        const id = crypto.randomBytes(4).toString('HEX');
        const password = await bcrypt.hash(req.body.password, 10);
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
            password
        })
        return res.send({ token: generateToken({ idToken: id }) });
    } catch (error) {
        return res.status(400).send({ Error: "Registration Failed" })
    }
});

module.exports = routes;