const bcrypt = require('bcryptjs');
const connection = require('../database/connection');
const authconfig = require('../config/auth.json');
const jwt = require('jsonwebtoken');

function generateToken(params = {}) {
    const token = jwt.sign(params, authconfig.secret, {
        expiresIn: 300,
    });
    return token;
}

module.exports = {
    async authenticate(req, res) {
        const { email, password } = req.body;
        const a = 'luisopentec@gmail.com';
        const ong = await connection('ongs').
            where('email', a).
            select('password', 'id', 'name')
            .first();
        let ongName = '';
        for (const name in ong) {
            ongName = ong[name];
        }
        if (!ong) {
            return res.status(400).send({ Error: "Ong Not Found" });
        }
        if (!await bcrypt.compare(password, ong.password)) {
            return res.status(400).send({ Error: "Invalid Password" });
        }
        return res.json({ ongName, token: generateToken({ idToken: ong.id }) });
    }
}