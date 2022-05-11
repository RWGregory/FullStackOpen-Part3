import React from 'react'

const Filter = ({ newQuery, handleChange }) => {
  return (
    <div>
      Find Contact:{' '}
      <input id="filter" value={newQuery} onChange={handleChange} />
    </div>
  )
}

export default Filter
