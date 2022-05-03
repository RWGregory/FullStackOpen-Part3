require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Contact = require('./models/contact')

const app = express()

morgan.token('post_body', (request, response) => {
  return JSON.stringify(request.body)
})

app.use(express.static('build'))
app.use(express.json())
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :post_body',
  ),
)
app.use(cors())

app.set('json spaces', 2)

app.get('/', (request, response) => {
  Contact.find({}).then((contacts) => {
    response.json(contacts)
  })
})

app.get('/api/directory', (request, response) => {
  Contact.find({}).then((contacts) => {
    response.json(contacts)
  })
})

app.get('/info', (request, response) => {
  Contact.find({}).then((contacts) => {
    const date = new Date()
    response.send(
      `<p>Phonebook has info for ${contacts.length} contacts</p> <p>${date}</p>`,
    )
  })
})

app.get('/api/directory/:id', (request, response) => {
  Contact.findById(request.params.id).then((contact) => {
    response.json(contact)
  })
})

app.delete('/api/directory/:id', (request, response) => {
  Contact.findByIdAndDelete(request.params.id).then((c) => {
    response.json(c)
  })
})

app.put('/api/directory/:id', (request, response) => {
  Contact.findByIdAndUpdate(request.params.id).then((c) => {
    response.json(c)
  })
})

app.post('/api/directory', (request, response) => {
  const body = request.body
  console.log(request.body)

  const contact = new Contact({
    name: body.name,
    number: body.number,
  })
  contact.save().then((savedNote) => {
    response.json(savedNote)
  })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
