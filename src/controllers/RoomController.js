const Database = require('../db/config')

module.exports = {
  async create(req, res) {

    const db = await Database()
    const password = req.body.password

    let roomId
    let isRoom = true

    while (isRoom) {
      
      for (let i = 0; i < 6; i++) {
        i === 0 ? roomId = Math.floor(Math.random() * 10).toString() : roomId += Math.floor(Math.random() * 10).toString()
      }

      // Quando quisermos que o banco retorne alguma informação ao invés de usar o 'run', usamos o 'all'.
      // Nessa variável vão ter todos os ids da tabela room dentro de um array.
      const selectAllRoomsExist = await db.all(`SELECT id FROM rooms`)

      isRoom = selectAllRoomsExist.some(roomIdExist => roomIdExist === roomId)

      if(!isRoom) {
        await db.run(`INSERT INTO rooms (
          id,
          pass
        ) VALUES (
          ${parseInt(roomId)},
          ${password}
        )`)
      }
    }

    await db.close()

    res.redirect(`/room/${roomId}`)
  },

  async open(req, res) {
    const db = await Database()

    const roomId = req.params.roomId

    const allQuestions = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and readed = 0`)
    const allQuestionsReaded = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and readed = 1`)

    let hasQuestion = true

    if(allQuestions.length === 0 && allQuestionsReaded.length === 0) {
      hasQuestion = false
    }

    res.render('room', {roomId: roomId, questions: allQuestions, questionsReaded: allQuestionsReaded, hasQuestion: hasQuestion})

  },

  enter(req, res) {
    const roomId = req.body.roomId

    res.redirect(`/room/${roomId}`)
  }
}