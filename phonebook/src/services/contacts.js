import axios from 'axios'
const baseUrl = '/api/directory'

const getContacts = () => {
  return axios.get(`${baseUrl}`)
}

const addContact = (newContact) => {
  return axios.post(`${baseUrl}`, newContact)
}

const editContact = (id, newContact) => {
  return axios.put(`${baseUrl}/${id}`, newContact)
}

const removeContact = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

export default {
  getContacts,
  addContact,
  editContact,
  removeContact,
}
