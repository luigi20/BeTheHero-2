const connection = require('../database/connection');

module.exports = {

    async index(req, res) {

        const incidents = await connection('incidents').select('*');
        return res.json(incidents);
    },

    async create(req, res) {
        const { title, description, value } = req.body;
        const ong_id = req.headers.context;
        try {
            const [id] = await connection('incidents').insert({
                title,
                description,
                value,
                ong_id
            })
            return res.json({ id });
        } catch (error) {
            res.status(400).send({ error: "Registration Failed" })
        }
    },

    async update(req, res) {

    },

    async delete(req, res) {
        const { id } = req.params;
        const ong_id = req.headers.context;
        try {
            const incident = await connection('incidents').where('id', id).select('ong_id').first();
            if (!incident) {
                return res.status(404).send({ error: "Incident not Found" })
            }
            if (incident.ong_id !== ong_id) {
                return res.status(401).json({ Error: "Operation not permitted" });
            }
            await connection('incidents').where('id', id).delete();
            return res.status(204).send();
        } catch (error) {
            console.log(error);
            return res.status(400).send({ error: "Delete Failed" });
        }
    }
}