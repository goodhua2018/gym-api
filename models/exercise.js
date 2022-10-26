const db = require('../db/db')

const Exercise = {
  create: (user_email, exercise_id) => {
    const sql = `INSERT INTO plans(user_email, exercise_id)
    VALUES ($1, $2)
    RETURNING *`

    return db
      .query(sql, [user_email, exercise_id])
      .then(dbRes => dbRes.rows[0])
  }
  
}

module.exports = Exercise