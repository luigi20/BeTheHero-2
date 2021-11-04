const connection = require('../database/connection');
//const express = require('express');
//const routes = express.Router();
//const authMiddleware = require('../middlewares/auth');
//routes.use(authMiddleware);

module.exports = {

    async index(req, res,) {

        res.send();
    },

    async create(req, res) {
        const { title, description, value } = req.body;
        try {
            await connection('incidents').insert({
                title,
                description,
                value
            })
        } catch (error) {
            console.log(error);
            res.status(400).send({ error: "Registration Failed" })
        }
    }
}