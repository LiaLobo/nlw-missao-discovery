// Arquivo responsável por iniciar o servidor para o projeto conseguir rodar.

const express = require('express')
// Importando o arquivo de rotas que foi criado.
const route = require('./route')
// Importando o módulo 'path'.
const path = require('path')

const server = express()

// Setando para o node entender que o aplicativo vai ter como mecanismo de visualização de telas o ejs.
server.set('view engine', 'ejs')

// Comando dizendo para usar o conteúdo estático que está dentro da pasta public.
server.use(express.static('public'))

// Setando o caminnho onde vai ser econtrada a pasta com as views (telas).
// O primeiro parâmetro é o nome da pasta criada no projeto. O segundo parâmetro é uma construção do caminho, ou seja,
// o path pega todo o caminho de diretório até a pasta principal do projeto (até o rocketQ), o __dirname é uma variável global que pega a pasta atual
// onde ela se encontra. Nesse caso é o src/, mas se ela tivesse sido colocada no package.json, seria a pasta rocketQ. O último parâmetro é o nome da pasta
// das views, e o join junta todas essas informações.
server.set('views', path.join(__dirname, 'views'))

// Middleware. Vai permitir a decodificação da rota para poder pegar os parâmetros através dela.
server.use(express.urlencoded({extended: true}))

// Usando o arquivo de rotas no node. Agora ele consegue reconhecer as rotas do projeto.
server.use(route)

// Esse é o método que vai inicializar o projeto e tem como primeiro parâmetro a porta para o projeto rodar. No caso, port 3000.
// O segundo parâmetro é uma função, caso seja preciso/quiser que rode algum comando no terminal.
server.listen(3000, () => console.log('RODANDO'))