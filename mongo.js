const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log(
    'Please provide password as an argument: node mongo.js <password>',
  )
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://FullStackOpen:${password}@phonebook.dvrck.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url)

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Contact = mongoose.model('Contact', contactSchema)

if (process.argv.length === 3) {
  Contact.find({}).then((result) => {
    result.forEach((contact) => {
      console.log(contact)
    })
    mongoose.connection.close()
  })
} else {
  const contact = new Contact({
    name: process.argv[3],
    number: process.argv[4],
  })

  contact.save().then((result) => {
    console.log(
      `${result.name}'s number, ${result.number}, has been added to the directory!`,
    )
    mongoose.connection.close()
  })
}
