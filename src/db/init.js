// Arquivo responsável por iniciar o banco de dados. Vai ser executado independente do projeto por isso existe um script para rodá-lo.

const Database = require('./config')

const initDb = {
  async init() {
    const db = await Database()

    await db.exec(`CREATE TABLE rooms (
      id INTEGER PRIMARY KEY,
      pass TEXT
    )`)

    await db.exec(`CREATE TABLE questions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      question TEXT,
      readed INTEGER
    )`)

    await db.close()
  }
}

initDb.init()