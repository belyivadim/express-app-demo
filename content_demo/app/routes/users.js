const express = require("express")
const router = express.Router()

router.get('/', (req, res) => {
  if (req.query.name) {
    console.log(users.find(u => u.name === req.query.name))
  }
  res.send("User List")
})

router.get('/new', (req, res) => {
  res.render('users/new', { placeholder: 'Enter your name' })
})

router.post('/', (req, res) => {
  const isValid = true 
  if (isValid) {
    users.push({ name: req.body.firstName })
    res.redirect(`/users/${users.length - 1}`)
  } else {
    console.log('User Creation Error')
    res.render("users/new", { 
      value: req.body.firstName,
      placeholder: 'Enter your name'
    })
  }
})

// dynamic 

const id_param = 'id'

router
  .route(`/:${id_param}`)
  .get((req, res) => {
    const id = req.params.id
    res.send(`Get User with id ${id}`)
  })
  .put((req, res) => {
    const id = req.params.id
    res.send(`Update User with id ${id}`)
  })
  .delete((req, res) => {
    const id = req.params.id
    res.send(`Delete User with id ${id}`)
  })

const users =[{name: 'Kyle'}, {name: 'Sally'}]
router.param(id_param, (req, res, next, id) => {
  req.user = users[id]
  next()
})

module.exports = router
