const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.use(logger)
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


const userRouter = require('./routes/user.route')
const postRouter = require('./routes/post.route')

app.use('/api/user', userRouter)
app.use('/api/post', postRouter)

function logger(req, res, next) {
  console.log(`Requested endpoint: ${req.originalUrl}`)
  next()
}

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))
