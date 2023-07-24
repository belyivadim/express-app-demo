// const Pool = require('pg').Pool
// const pool = new Pool({
//   user: 'postgres',
//   password: 'root',
//   host: 'localhost',
//   port: 5432,
//   database: 'node_pg'
// })

//module.exports = pool

class DataAccess {
  constructor() {
    const Pool = require('pg').Pool
    this.db = new Pool({
      user: 'postgres',
      password: 'root',
      host: 'localhost',
      port: 5432,
      database: 'node_pg'
    })
  }

  // USER
  async createUser(user) {
    const sql = 'INSERT INTO person (id, username) VALUES ($1, $2) RETURNING *;'
    const newUser = await this.db.query(sql, [user.id, user.username])
    return { status: (newUser.rows.length > 0 ? 201 : 400), body: newUser.rows[0] }
  }

  async getAllUsers() {
    const sql = 'SELECT * FROM person;'
    const users = await this.db.query(sql)
    return { status: 200, body: users.rows }
  }

  async getUserById(id) {
    const sql = 'SELECT * FROM person WHERE id = $1;'
    const users = await this.db.query(sql, [id])
    return { status: (users.rows.length > 0 ? 200 : 404), body: users.rows[0] }
  }

  async updateUser(user) {
    const sql = 'UPDATE person SET username = $1 WHERE id = $2 RETURNING *;'
    const users = await this.db.query(sql, [user.username, user.id])
    return { status: (users.rows.length > 0 ? 200 : 404), body: users.rows[0] }
  }

  async deleteUserById(id) {
    const sql = 'DELETE FROM person WHERE id = $1;'
    const users = await this.db.query(sql, [id])
    return { status: (users.rowCount > 0 ? 200 : 404), body: users.rows[0] }
  }


  // POST
  async createPost(post) {
    const sql = 'INSERT INTO post (title, content, user_id) VALUES ($1, $2, $3) RETURNING *;'
    const newPost = await this.db.query(sql, [post.title, post.content, post.userId])
    return { status: (newPost.rowCount > 0 ? 201 : 400), body: newPost.rows[0] }
  }

  async getPostById(id) {
    const sql = 'SELECT * FROM post WHERE id = $1;'
    const posts = await this.db.query(sql, [id])
    return { status: (posts.rowCount > 0 ? 200 : 404), body: posts.rows[0] }
  }

  async getAllPosts() {
    const sql = 'SELECT * FROM post;'
    const posts = await this.db.query(sql)
    return { status: 200, body: posts.rows }
  }

  async getPostsByUserId(userId) {
    const sql = 'SELECT * FROM post WHERE user_id = $1'
    const posts = await this.db.query(sql, [userId])
    return { status: (posts.rowCount > 0 ? 200 : 404), body: posts.rows }
  }

  async updatePost(post) {
    const sql = 'UPDATE post SET title = $1, content = $2 WHERE id = $3 RETURNING *;'
    const users = await this.db.query(sql, [post.title, post.content, post.id])
    return { status: (users.rowCount > 0 ? 200 : 404), body: users.rows[0] }
  }

  async deletePostById(id) {
    const sql = 'DELETE FROM post WHERE id = $1;'
    const posts = await this.db.query(sql, [id])
    return { status: (posts.rowCount > 0 ? 200 : 404), body: posts.rows[0] }
  }


  // for verefication
  async isUserPostOwner(userId, postId) {
    const sql = 'SELECT id FROM post WHERE id = $1 AND user_id = $2;'
    const result = await this.db.query(sql, [postId, userId])

    if (result.rowCount > 0) {
      return true
    }

    return false
  }
}

module.exports = new DataAccess()
