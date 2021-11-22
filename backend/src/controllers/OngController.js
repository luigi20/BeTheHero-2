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
            console.log(error);
            return res.status(400).json({ Error: "Registration Failed" })
        }
    },

    async update(req, res) {
        const { id } = req.params;
        console.log(id);
        return;
        /*    const ong_id = req.headers.context;
            let ong = token(req.headers.authorization, ong_id);
    
            try {
                if (!ong) {
                    return res.status(404).send({ Error: "You are not authorized to access this application." });
                }
                const incident = await connection('incidents').where('id', id).select('ong_id').first();
                if (!incident) {
                    return res.status(404).send({ error: "Incident not Found" })
                }
                if (incident.ong_id !== ong_id) {
                    return res.status(401).json({ Error: "Operation not permitted" });
                }
                await connection('incidents').where('id', id).update({ 
    name: ong.name,
    email:ong.email,
    password:ong.password,
    whatsapp: ong.whatsapp,
    city: ong.city,
    uf: ong.uf, 
    update_at_ong: Date.now()
                });
                return res.status(204).send();
            } catch (error) {
                return res.status(400).send({ error: "Delete Failed" });
            }*/
    },

    async delete(req, res) {

    }
}