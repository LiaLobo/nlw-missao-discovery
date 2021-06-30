const sqlite3 = require('sqlite3')
const { open } = require('sqlite')

// Com o método open está sendo aberto um novo banco de dados.
// Para as configurações do db precisamos do nome do arquivo onde ficará as informações e o driver que
// é quem iá gerenciar essas informações passadas.
module.exports = () => open({
  filename: './src/db/rocketq.sqlite',
  driver: sqlite3.Database,
})
