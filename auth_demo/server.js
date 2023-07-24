const express = require('express')
const cookieSession = require('cookie-session')
const cors = require('cors')

let app = express()

app.use(cors())
app.use(express.json())

app.use(
  cookieSession({
    name: 'session',
    keys: ['SECRET'], // should be used as secret env variable
    httpOnly: true
  })
)

const db = require('./models')
const Role = db.role

// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Db')
//   initial()
// })

db.sequelize.sync()

function initial() {
  Role.create({
    id: 1,
    name: 'user'
  })

  Role.create({
    id: 2,
    name: 'moderator'
  })

  Role.create({
    id: 3,
    name: 'admin'
  })
}

app.get('/', (req, res) => {
  req.session.views = (req.session.views || 0) + 1
  res.json({message: `views: ${req.session.views}`})
})

// routes
require('./routes/auth.routes')(app)
require('./routes/user.routes')(app)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`))

