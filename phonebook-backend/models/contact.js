require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log(url)

mongoose
  .connect(url)
  .then((result) => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB', error.message)
  })

const validator = (val) => {
  const chunks = val.split('-')
  if (chunks.length > 2) {
    return false
  } else if (chunks.length === 2) {
    if (chunks[0].length < 2 || chunks[0].length > 3) {
      return false
    } else {
      return true
    }
  } else {
    return
  }
}

const custom = [validator, 'try re-formatting {VALUE}']

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
  },
  number: {
    type: String,
    minLength: 8,
    required: true,
    validate: custom,
  },
})

contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Contact', contactSchema)
