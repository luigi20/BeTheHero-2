const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const connection = require('../database/connection');
const authconfig = require('../config/auth.json');
const jwt = require('jsonwebtoken');

function generateToken(params = {}) {
    const token = jwt.sign(params, authconfig.secret, {
        expiresIn: 86400,
    });
    return token;
}

module.exports = {
    async index(req, res) {
        try {
            const ongs = await connection('ongs').select('*');
            return res.json(ongs);
        } catch (error) {
            res.status(400).send({ Error: "ONG's Were Not Found" })
        }
    },

    async create(req, res) {
        const { name, email, whatsapp, city, uf } = req.body;
        try {
            if (await connection('ongs').where('email', email).first()) {
                return res.status(400).send({ Error: "ONG Already Exists" })
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
            return res.json({ token: generateToken({ idToken: id }) });
        } catch (error) {
            return res.status(400).json({ Error: "Registration Failed" })
        }
    },

    async update(req, res) {

    },

    async delete(req, res) {

    }
}