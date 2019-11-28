const express = require('express');

const app = express();

app.use(express.json());

const users = ['Marcos', 'Diego', 'Carlos'];

//MidleWare local
function checkUser(req, res, next) {
    if(!req.body.user){
        return res.status(401).json({erro: 'user not found'});
    }
    return next();
};

//MidleWare global

// Listando todos os usuários
app.get('/users', (req, res) => {
    return res.json(users);
});

//Exibe um usuário
app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    var usuario = users[id];
    return res.json({message: `Você pesquisou por ${usuario}`});
})

//Cria um usuário
app.post('/users', checkUser, (req, res) => {
    const { user } = req.body;
    users.push(user);

    return res.json(users);
});

//Editando
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { newName } = req.body;

    users[id] = newName;

    return res.json(users);
});

//Exclusão
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    users.splice(id, 1);

    return res.json(users);
});

app.listen(3004);