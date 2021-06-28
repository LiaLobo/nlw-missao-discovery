// Arquivo responsável por criar as rotas do projeto

const express = require('express')
const route = express.Router()

// No segndo parâmetro tem uma função que já tem por padrão dois parâmetros: a request e a response.
// Então aqui vai ser definido o que vai ser a resposta do servidor quando for feita uma requisição.
// Nesse caso a respota será renderizar o arquivo index, que estará com o conteúdo da home nele.
route.get('/', (req, res) => res.render("index"))

// Exportando o arquivo route
module.exports = route