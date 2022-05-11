import React from 'react'

const ContactForm = ({ newName, newNumber, handleChange, handleClick }) => {
  return (
    <form>
      <div>
        Name: <input id="name" value={newName} onChange={handleChange} />
      </div>
      <div>
        Number: <input id="number" value={newNumber} onChange={handleChange} />
      </div>

      <div>
        <button onClick={handleClick} type="submit">
          Add
        </button>
      </div>
    </form>
  )
}

export default ContactForm
