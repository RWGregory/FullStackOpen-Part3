require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Contact = require('./models/contact')

const app = express()

morgan.token('post_body', (request, response) => {
  return JSON.stringify(request.body)
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'Cast Error') {
    return response.status(400).sen({ error: 'malformed id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(express.static('build'))
app.use(express.json())
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :post_body',
  ),
)
app.use(cors())
app.use(errorHandler)

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
  Contact.findById(request.params.id)
    .then((contact) => {
      if (contact) {
        response.json(contact)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => {
      console.log(error)
      response.status(400).send({ error: 'malformatted id' })
    })
})

app.delete('/api/directory/:id', (request, response, next) => {
  Contact.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

app.put('/api/directory/:id', (request, response, next) => {
  const body = request.body

  const contact = {
    name: body.name,
    number: body.number,
  }

  Contact.findByIdAndUpdate(request.params.id, contact, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((updatedContact) => {
      response.json(updatedContact)
    })
    .catch((error) => next(error))
})

app.post('/api/directory', (request, response, next) => {
  const body = request.body
  console.log(request.body)

  const contact = new Contact({
    name: body.name,
    number: body.number,
  })
  contact
    .save()
    .then((savedNote) => {
      response.json(savedNote)
    })
    .catch((error) => next(error))
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
