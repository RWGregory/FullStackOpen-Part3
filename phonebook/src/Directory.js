import React from 'react'

const Directory = ({ newQuery, contacts, handleRemove }) => {
  /* const getRegex = (query) => {
    return new RegExp(query, 'i')
  }

  const filterContacts = (query, contacts) => {
    return contacts.filter((contact) => {
      contact.name.match(query)
    })
  } */

  const renderContacts = (contacts) => {
    return contacts.map((contact) => (
      <div key={contact.id} className="contact">
        <div className="contact-name">{contact.name}</div>
        <div className="contact-number">{contact.number}</div>
        <button
          id={contact.id}
          name={contact.name}
          onClick={handleRemove}
          className="btn-delete"
        >
          Remove
        </button>
      </div>
    ))
  }

  console.log(renderContacts(contacts))

  return (
    <div className="directory">
      {newQuery ? <div>query</div> : renderContacts(contacts)}
    </div>
  )
}

export default Directory
