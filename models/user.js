const db = require('../db/db')


const User = {
  create: (userName, email, passwordDigest) => {
      const sql = `
      INSERT INTO users(user_name, email, password_digest)
      VALUES ($1, $2, $3)
      RETURNING *
      `
      return db
      .query(sql, [userName, email, passwordDigest])
      .then(dbRes => dbRes.rows[0].email)
  },



  findByEmail: email => {
    const sql = `
    SELECT * FROM users
    WHERE email = $1
    `
    return db
    .query(sql, [email])
    .then(dbRes => dbRes.rows[0])
  },

  findById: id => {
    const sql = `
    SELECT * FROM users
    WHERE id = $1
    `
    return db
    .query(sql, [id])
    .then(dbRes => {
      return {name: dbRes.rows[0].name, email: dbRes.rows[0].email}
    })
  }
}

module.exports = User