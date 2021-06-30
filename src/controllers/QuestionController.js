const Database = require('../db/config')

module.exports = {
  index(req, res) {
    const roomId = req.params.roomId
    const questionId = req.params.questionId
    const action = req.params.action
    const password = req.body.password

    console.log(`password = ${password}`)
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