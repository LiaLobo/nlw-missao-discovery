// Arquivo responsável por criar as rotas do projeto

const express = require('express')
const QuestionController = require('./controllers/QuestionController')
const RoomController = require('./controllers/RoomController')

const route = express.Router()

// No segndo parâmetro tem uma função que já tem por padrão dois parâmetros: a request e a response.
// Então aqui vai ser definido o que vai ser a resposta do servidor quando for feita uma requisição.
// Nesse caso a respota será renderizar o arquivo index, que estará com o conteúdo da home nele.
route.get('/', (req, res) => res.render('index', {page: 'enter-room'}))

// É possível passar uma variável que nesse caso irá renderizar a parte que do conteúdo que for de acordo com a url.
route.get('/create-pass', (req, res) => res.render('index', {page: 'create-pass'}))
route.get('/room/:roomId', RoomController.open)
route.post('/enterroom', RoomController.enter)

route.post('/create-room', RoomController.create)

route.post('/question/:roomId/:questionId/:action', QuestionController.index)
route.post('/question/create/:roomId', QuestionController.create)


// Exportando o arquivo route
module.exports = route