import { useState, useEffect } from 'react'
import ContactForm from './ContactForm'
import Directory from './Directory'
import Filter from './Filter'
import Notification from './Notification'
import contactService from './services/contacts.js'
import { JSDOM } from 'jsdom'

const App = () => {
  const [contacts, setContacts] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState([])
  const [newQuery, setNewQuery] = useState('')
  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(false)
  console.log(contacts)
  useEffect(() => {
    contactService.getContacts().then((response) => {
      //console.log(response.data)
      setContacts(response.data)
    })
  }, [])

  const newContact = {
    name: newName,
    number: newNumber,
  }
  const [names, numbers] = contacts.map((contact) => {
    return [contact.name, contact.numbers]
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (names.includes(newName)) {
      const indexOfName = names.indexOf(newName)
      window.confirm(
        `${newName} is already added to phonebook. Click OK to replace the old number.`,
      )
      contactService
        .editContact(contacts[indexOfName].id, newContact)
        .then((response) => {
          setNotification(
            `${response.data.name}'s phone number has been updated!`,
          )
          setTimeout(() => {
            setNotification(null)
          }, 5000)
          contactService.getContacts().then((response) => {
            setContacts(response.data)
          })
        })

      return
    }
    contactService
      .addContact(newContact)
      .then((response) => {
        setContacts(contacts.concat(response.data))

        setNotification(
          `${response.data.name} has been added to your phonebook!`,
        )
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
      .catch((error) => {
        console.log(error.response.data)

        setNotification(
          'Both Name and Number are required. Name must be at least 3 characters',
        )
        setError((prev) => !prev)
        setTimeout(() => {
          setNotification(null)
          setError((prev) => !prev)
        }, 5000)
      })
    setNewName('')
    setNewNumber([])
  }
  const handleChange = (e) => {
    switch (e.target.id) {
      case 'name':
        setNewName(e.target.value)
        break
      case 'number':
        setNewNumber(e.target.value)
        break
      case 'filter':
        setNewQuery(e.target.value)
    }
    console.log(e)
  }

  const handleRemove = (e) => {
    if (window.confirm(`Delete ${e.target.name}?`)) {
      contactService
        .removeContact(e.target.id)
        .then((response) => {
          setNotification(
            `${e.target.name} has been removed from your phonebook!`,
          )
          setTimeout(() => {
            setNotification(null)
          }, 5000)
          contactService
            .getContacts()
            .then((response) => setContacts(response.data))
        })
        .catch((error) => {
          console.log(error)

          setNotification(
            `${e.target.name} has not been found. They may have been removed. The current phonebook will be refreshed.`,
          )
          setError((prev) => !prev)
          setTimeout(() => {
            setNotification(null)
            setError((prev) => !prev)
            contactService
              .getContacts()
              .then((response) => setContacts(response.data))
          }, 5000)
        })
    }
  }

  return (
    <div>
      <Notification notification={notification} error={error} />
      <h1>Phonebook</h1>
      <Filter newQuery={newQuery} handleChange={handleChange} />

      <h1>Add a Contact</h1>
      <ContactForm
        newName={newName}
        handleChange={handleChange}
        handleClick={handleSubmit}
      />

      <h1>Numbers</h1>

      <Directory
        newQuery={newQuery}
        contacts={contacts}
        handleRemove={handleRemove}
      />
    </div>
  )
}

export default App
