const db = require('../db/db')

const Exercise = {
  create: (user_email, exercise_id) => {
    const sql = `INSERT INTO plans(user_email, exercise_id)
    VALUES ($1, $2)
    RETURNING *`

    return db
      .query(sql, [user_email, exercise_id])
      .then(dbRes => dbRes.rows[0])
  },
  findByEmail: email => {
    const sql = `SELECT * FROM plans
    WHERE user_email = $1`
    return db
      .query(sql, [email])
      .then(dbRes => {
        // console.log(dbRes.rows)
        return dbRes.rows
      })
  },
  delete: exerciseId => {
    const sql = `
        DELETE FROM plans WHERE exercise_id = $1    
    `
    return db.query(sql, [exerciseId])
} 
  
}

module.exports = Exercise