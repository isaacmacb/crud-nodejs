const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware para analisar o corpo das requisições como JSON
app.use(bodyParser.json());

// Array simulando um banco de dados
let users = [];

// Rota para obter todos os usuários
app.get('/users', (req, res) => {
  res.json(users);
});

// Rota para obter um usuário pelo ID
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  const user = users.find((user) => user.id === userId);

  if (!user) {
    res.status(404).json({ error: 'Usuário não encontrado' });
    return;
  }

  res.json(user);
});

// Rota para criar um novo usuário
app.post('/users', (req, res) => {
  const newUser = req.body;

  // Atribui um ID único ao novo usuário (pode ser um pacote como "uuid" para gerar IDs únicos)
  newUser.id = Date.now().toString();

  users.push(newUser);
  res.status(201).json(newUser);
});

// Rota para atualizar um usuário existente
app.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body;

  let userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex === -1) {
    res.status(404).json({ error: 'Usuário não encontrado' });
    return;
  }

  // Atualiza os dados do usuário
  users[userIndex] = { ...users[userIndex], ...updatedUser };

  res.json(users[userIndex]);
});

// Rota para excluir um usuário
app.delete('/users/:id', (req, res) => {
  const userId = req.params.id;

  let userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex === -1) {
    res.status(404).json({ error: 'Usuário não encontrado' });
    return;
  }

  // Remove o usuário do array
  const deletedUser = users.splice(userIndex, 1)[0];

  res.json(deletedUser);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
