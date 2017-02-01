const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const shortid = require('shortid')
const path = require('path')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.set('port', process.env.PORT || 3000)

app.locals.polls = {}

app.post('/polls', (req, res) => {
  app.locals.polls[shortid()] = req.body
  res.json(app.locals.polls)
})

app.get('/polls', (req, res) => {
  res.json(app.locals.polls)
})

app.listen(app.get('port'), () => {
  console.log(`Express server is running on ${app.get('port')}.`)
})