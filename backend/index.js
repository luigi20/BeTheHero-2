const express = require('express');

const app = express();
app.use(express.json());

app.post('/users', (req, res) => {
    const user = req.body;
    console.log(user);
    return res.json({
        evento: "Semana Omnistack 11.0",
        aluno: "Diego Fernandes"
    });
});



app.listen(3333);