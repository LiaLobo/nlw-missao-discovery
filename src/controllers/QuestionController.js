const Database = require('../db/config')

module.exports = {
  async index(req, res) {
    const db = await Database()

    const roomId = req.params.roomId
    const questionId = req.params.questionId
    const action = req.params.action
    const password = req.body.password

    // db.get vai retornar somente um valor do banco de dados, diferentemente do db.all.
    const verifyRoom = await db.get(`SELECT * FROM rooms WHERE id = ${roomId}`)

    if(verifyRoom.pass === password) {
      if(action === 'delete') {

        await db.run(`DELETE FROM questions WHERE id = ${questionId}`)

      } else if(action === 'check') {

        await db.run(`UPDATE questions SET readed = 1 WHERE id = ${questionId}`)
      }

      res.redirect(`/room/${roomId}`)
    } else {

      res.render('incorrect-pass', {roomId: roomId})
    }
    
    
  },

  async create(req, res) {
    const db = await Database()

    const question = req.body.question
    const roomId = req.params.roomId

    await db.run(`INSERT INTO questions (
      question,
      room,
      readed
    ) VALUES (
      "${question}",
      ${roomId},
      0
    )`)

    res.redirect(`/room/${roomId}`)
  }
}